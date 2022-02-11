const { writeFile } = require('fs').promises;
const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const removeTalker = async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerFile();
  const talkerIndex = talkers.findIndex((talkerObj) => talkerObj.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(204).json({ message: 'ID não encontrado.' });
  }

  talkers.splice(talkerIndex, 1);
  await writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(204).json({ message: 'Talker deletado com sucesso' });
};

module.exports = removeTalker;