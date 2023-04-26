const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const Handlebars = require('handlebars/runtime');
const methodOverride = require('method-override')




mongoose.connect('mongodb+srv://nazsamandarova:Mongodb.2023@cluster0.3ru3g1o.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));


app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static('public'));

app.use('/', routes);
app.use('/css', express.static(__dirname + '/public/css', { type: 'text/css' }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: 'desc' }).limit(10).exec();
  res.render('index', { posts });
});

//use method-override middleware to edit posts

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


