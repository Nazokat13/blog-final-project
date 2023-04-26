const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const Post = require('./models/post')


const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose middleware
mongoose
  .connect('mongodb+srv://nazsamandarova:Mongodb.2023@cluster0.3ru3g1o.mongodb.net/blog')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Handlebars middleware
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

app.get('/posts/new', (req, res) => {
  res.render('new');
});


// a new route for handling form submission 

app.post('/posts', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await post.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('error');
  }
});

//to delete a post

app.delete('/posts/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404).send('Post not found');
  } else {
    res.redirect('/');
  }
});

//to edit a post 

app.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('edit', { post })
})

app.put('/posts/:id', async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body)
  res.redirect(`/posts/${req.params.id}`)
})

  