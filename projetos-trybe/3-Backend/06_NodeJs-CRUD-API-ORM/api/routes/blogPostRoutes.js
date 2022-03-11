const express = require('express');
const rescue = require('express-rescue');
const BlogPostController = require('../controllers/BlogPostController');

const blogPostRoutes = express.Router();
const verifyToken = require('../auth/verifyToken');
const {
  titleGapValidator,
  contentGapValidator,
  categoryIdsGapValidator,
  categoryIdsFilledGapValidator,
} = require('../middlewares/validators');

blogPostRoutes.post('/',
verifyToken,
titleGapValidator,
contentGapValidator,
categoryIdsGapValidator,
rescue(BlogPostController.create));

blogPostRoutes.get('/',
verifyToken,
rescue(BlogPostController.findAll));

blogPostRoutes.get('/search',
verifyToken,
rescue(BlogPostController.findAllByQueryString));

blogPostRoutes.get('/:id',
verifyToken,
rescue(BlogPostController.findByPk));

blogPostRoutes.put('/:id',
verifyToken,
titleGapValidator,
contentGapValidator,
categoryIdsFilledGapValidator,
rescue(BlogPostController.update));

blogPostRoutes.delete('/:id',
verifyToken,
rescue(BlogPostController.remove));

module.exports = blogPostRoutes;