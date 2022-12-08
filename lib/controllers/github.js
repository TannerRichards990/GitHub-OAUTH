const { Router } = require('express');
const { GithubUser } = require ('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');
const authenticate = require('../middleware/authenticate');
const jwt = require('jsonwebtoken');
const router = Router();

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = router
  .get('/login', (req, res,) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`);
  })

  .get('/callback', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await exchangeCodeForToken(code);
      console.log(token);
      const { email, login, avatar_url } = await getGithubProfile(token);
      let user = await GithubUser.findUser(login);
      if (!user) {
        user = await GithubUser.insert({ login, email, avatar_url });
      }
      const payload = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      res.cookie(process.env.COOKIE_NAME, payload, {
        httpOnly: true,
        maxAge: ONE_DAY_IN_MS,
      })
        .redirect ('/api/v1/github/dashboard');
    } catch (err) {
      // res.redirect('/api/v1/github/error');
      next(err);
    }
  })

  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })

  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite: process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .status(204)
      .send()
      .redirect('/api/v1/github/login');
  });
    


