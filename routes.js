const express = require('express');
const router = express.Router();
const Post = require('./models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find().sort('-createdAt');
  res.render('home', { posts });
});

router.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', { post });
});

router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/new', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.redirect('/');
});

module.exports = router;
