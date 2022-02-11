const { writeFile } = require('fs').promises;
const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const editTalkerInfo = async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await readTalkerFile();
  const talkerIndex = talkers.findIndex((talkerObj) => talkerObj.id === Number(id));

  if (talkerIndex === -1) {
    return res.status(200).json({ message: 'ID não encontrado.' });
  }

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

  await writeFile('./talker.json', JSON.stringify(talkers));
  res.status(200).json(talkers[talkerIndex]);
};

module.exports = editTalkerInfo;