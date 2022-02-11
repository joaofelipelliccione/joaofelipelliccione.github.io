const express = require('express');
const rescue = require('express-rescue');
const listAllTalkers = require('../middlewares/listAllTalkers');
const listTalkerByName = require('../middlewares/listTalkerByName');
const listTalkerById = require('../middlewares/listTalkerById');
const registerNewTalker = require('../middlewares/registerNewTalker');
const editTalkerInfo = require('../middlewares/editTalkerInfo');
const removeTalker = require('../middlewares/removeTalker');

const validateTokenMw = require('../middlewares/validators/validateTokenMw');
const validateNameMw = require('../middlewares/validators/validateNameMw');
const validateAgeMw = require('../middlewares/validators/validateAgeMw');
const validateTalkMw = require('../middlewares/validators/validateTalkMw');
const validateTalkObjMw = require('../middlewares/validators/validateTalkObjMw');

const talkerRouter = express.Router();

talkerRouter.get('/', rescue(listAllTalkers));

talkerRouter.get('/search',
  validateTokenMw,
  rescue(listTalkerByName));

talkerRouter.get('/:id', rescue(listTalkerById));

talkerRouter.post('/',
  validateTokenMw,
  validateNameMw,
  validateAgeMw,
  validateTalkMw,
  validateTalkObjMw,
  rescue(registerNewTalker));

  talkerRouter.put('/:id',
  validateTokenMw,
  validateNameMw,
  validateAgeMw,
  validateTalkMw,
  validateTalkObjMw,
  rescue(editTalkerInfo));

talkerRouter.delete('/:id',
validateTokenMw,
rescue(removeTalker));

module.exports = talkerRouter;