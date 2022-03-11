const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../../models');

const create = async ({ title, content, categoryIds }, userId) => {
  const newPost = await BlogPost.create({ title, content, categoryIds, userId });

  return {
    id: newPost.id,
    userId,
    title,
    content,
  };
};

const findAll = async () => {
  const blogPosts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });
  return blogPosts;
};

const findByPk = async (postId) => {
  const blogPost = await BlogPost.findByPk(postId, {
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ],
  });

  if (blogPost === null) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'Post does not exist',
      },
    };
  }

  return blogPost;
};

const update = async ({ title, content }, postId) => {
  await BlogPost.update(
    { title, content },
    { where: { id: postId } },  
  );

  const updatedPost = await BlogPost.findByPk(postId, {
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return updatedPost;
};

const remove = async (postId) => {
  await BlogPost.destroy({ where: { id: postId } });
};

const findAllByQueryString = async (searchedTerm) => { // REF: https://sequelize.org/master/manual/model-querying-basics.html#applying-where-clauses [Precisa importar Op].
  const blogPosts = await BlogPost.findAll({
    // where: {
    //   title: { [Op.substring]: searchedTerm }, // LIKE '%searchedTerm%' --> Confere se a chave "title" apresenta o conteúdo pesquisado.
    // },
    where: {
      [Op.or]: [
        { title: { [Op.substring]: searchedTerm } }, // LIKE '%searchedTerm%' --> Confere se a chave "title" apresenta o conteúdo pesquisado OR...
        { content: { [Op.substring]: searchedTerm } }, // ...se a chave "content" apresenta o conteúdo pesquisado.
      ],
    },
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return blogPosts;
};

module.exports = {
  create,
  findAll,
  findByPk,
  update,
  remove,
  findAllByQueryString,
};