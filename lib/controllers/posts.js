const { Router } = require('express');
const Post = require('../models/Posts');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      return res.json(posts);
    } catch (err) {
      next(err);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = { ...req.body, userId: req.user.id };
      const fakePost = await Post.insert(data);
      return res.json(fakePost);
    } catch (err) {
      next(err);

    }
  });
  
  
