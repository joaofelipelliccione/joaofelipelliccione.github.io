const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const listTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerFile();
  const talker = talkers.filter((obj) => obj.id === Number(id));

  if (talker.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).send(...talker);
};

module.exports = listTalkerById;