const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const listAllTalkers = async (_req, res) => {
  const talkers = await readTalkerFile();
  res.status(200).json(talkers);
};

module.exports = listAllTalkers;