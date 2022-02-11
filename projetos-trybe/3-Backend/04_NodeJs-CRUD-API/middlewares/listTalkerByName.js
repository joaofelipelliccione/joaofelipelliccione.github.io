const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const listTalkerByName = async (req, res) => {
  const talkers = await readTalkerFile();
  const { searchTerm } = req.query;

  const resultArray = talkers.filter(({ name }) => name.includes(searchTerm));

  if (!searchTerm || searchTerm === '') {
    return res.status(200).json(talkers);
  }
  res.status(200).json(resultArray);
};

module.exports = listTalkerByName;
