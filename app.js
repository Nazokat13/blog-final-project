const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes');


mongoose.connect('mongodb+srv://nazsamandarova:fuxxos-xYdcen-0qitjy@cluster0.3ru3g1o.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.engine('hbs', Handlebars({ defaultLayout: 'main', extname: '.hbs' }));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
