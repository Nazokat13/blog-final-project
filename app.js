const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const path = require('path');

const PORT = 3000;
const app = express();


// Set up body-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up method-override middleware
app.use(methodOverride('_method'));

// Handlebars Config

app.engine('hbs', engine({
	extname: '.hbs',
	partialsDir: 'views/partials',
	runtimeOptions: {
		allowProtoMethodsByDefault: true,
		allowProtoPropertiesByDefault: true
	}
}));
app.set('view engine', 'hbs');




// Define the Post model
const Post = mongoose.model('Post', {
	title: String,
	content: String,
});

// ROUTES
// Get New Post Form
app.get('/posts/new', (req, res) => {
	res.render('new', { docTitle: 'New Blog Post' });
});

// Get Posts
app.get('/', async (req, res) => {
	const posts = await Post.find();
	res.render('index', { posts });
});

// Get Post By Id
app.get('/posts/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.render('show', { post });
});



// Add New Post
app.post('/posts', async (req, res) => {
	const { title, content } = req.body;
	const post = new Post({ title, content });
	await post.save();
	res.redirect('/');
});

// Get Update Post Form
app.get('/posts/:id/edit', async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.render('edit', { post });
});

// Update Post By Id
app.post('/posts/:id/edit', async (req, res) => {
	const { title, content } = req.body;
	const post = await Post.findByIdAndUpdate(req.params.id, { title, content });
	res.redirect("/");
});


// Delete Post By Id
app.post('/delete', async (req, res) => {
	let id = req.body.id;
	await Post.findByIdAndDelete(id);
	res.redirect('/');
});

// Catch Exceptions 
app.all('*', (req, res) => {
	res.render('404', { docTitle: '404 | Page Not Found' });
});

// Start the server
app.listen(PORT || 3000, () => {
	// Connect to MongoDB
	mongoose.connect('mongodb+srv://nazsamandarova:Mongodb.2023@cluster0.3ru3g1o.mongodb.net/blog', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Server is listening on port 3000');
});
