const { writeFile } = require('fs').promises;
const readTalkerFile = require('../sharedFunctions/readTalkerFile');

const registerNewTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  
  const talkers = await readTalkerFile();
  const id = talkers[talkers.length - 1].id + 1;

  const updatedArray = [...talkers, { id, name, age, talk }];
  const updatedJSON = JSON.stringify(updatedArray);
  await writeFile('./talker.json', updatedJSON);
  res.status(201).json({ id, name, age, talk });
};

module.exports = registerNewTalker;