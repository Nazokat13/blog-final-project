const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up method-override middleware
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Post model
const Post = mongoose.model('Post', {
  title: String,
  content: String,
});

// Define routes for handling requests
app.get('/', async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('new');
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.redirect('/');
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('show', { post });
});

app.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

app.put('/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect(`/posts/${post.id}`);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Set up the view engine
app.set('view engine', 'ejs');

// Serve static assets from the public folder
app.use(express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
