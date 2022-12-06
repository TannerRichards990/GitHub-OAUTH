const { Router } = require('express');
const GithubUser = require ('../models/gitUser');
const { exchangeCodeForToken, getGithubProfile } = require('../services/githubService');
const authenicate = require('../middleware/authenticate');
const jwt = require('jsonwebtoken');
const router = Router();

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = router
  .get('/login', (req, res,) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user
    &redirect_uri=${process.env.GH_REDIRECT_URI}`);
    
  });

