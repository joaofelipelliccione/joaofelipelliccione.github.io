const { StatusCodes } = require('http-status-codes');
const BlogPostService = require('../services/BlogPostService');
const CategoryService = require('../services/CategoryService');

const create = async (req, res, _next) => {
  let haveInexistentCategory = false;
  const { title, content, categoryIds } = req.body;
  const { id } = req.userInfo; // Relação com middleware verifyToken.

  await Promise.all(categoryIds.map(async (categoryId) => {
    const category = await CategoryService.findByPk(categoryId);
    if (category.error) {
      haveInexistentCategory = true;
    }
    return haveInexistentCategory;
  }));

  if (haveInexistentCategory) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"categoryIds" not found' });
  }

  const newPost = await BlogPostService.create({ title, content, categoryIds }, id);
  return res.status(StatusCodes.CREATED).json(newPost);
};

const findAll = async (_req, res, _next) => {
  const blogPosts = await BlogPostService.findAll();
  res.status(StatusCodes.OK).json(blogPosts);
};

const findByPk = async (req, res, _next) => {
  const { id } = req.params;
  const blogPost = await BlogPostService.findByPk(id);

  if (blogPost.error) {
    return res.status(blogPost.error.code).json({ message: blogPost.error.message });
  }

  res.status(StatusCodes.OK).json(blogPost);
};

const update = async (req, res, _next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userInfoObj = req.userInfo;

  const blogPost = await BlogPostService.findByPk(id);
  if (!blogPost.error && blogPost.user.id !== userInfoObj.id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }

  const updatedPost = await BlogPostService.update({ title, content }, id);
  return res.status(StatusCodes.OK).json(updatedPost);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  const userInfoObj = req.userInfo;

  const blogPost = await BlogPostService.findByPk(id);
  if (blogPost.error) {
    return res.status(blogPost.error.code).json({ message: blogPost.error.message });
  }

  if (!blogPost.error && blogPost.user.id !== userInfoObj.id) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user' });
  }

  await BlogPostService.remove(id);
  return res.status(StatusCodes.NO_CONTENT).json();
};

const findAllByQueryString = async (req, res, _next) => {
  const { q } = req.query;
  const blogPosts = await BlogPostService.findAllByQueryString(q);
  return res.status(StatusCodes.OK).json(blogPosts);
};

module.exports = {
  create,
  findAll,
  findByPk,
  update,
  remove,
  findAllByQueryString,
};