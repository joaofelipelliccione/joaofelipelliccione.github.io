const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const blogPostRoutes = require('./routes/blogPostRoutes');

const errorMw = require('./middlewares/errorMw');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/post', blogPostRoutes);
app.use(errorMw);

module.exports = app;