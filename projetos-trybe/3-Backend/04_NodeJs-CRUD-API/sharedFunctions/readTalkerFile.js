const { readFile } = require('fs').promises;

const readTalkerFile = async () => {
  try {
    const fetchData = await readFile('./talker.json', 'utf-8'); // Captando JSON contido no arquivo talker.json.
    const data = JSON.parse(fetchData); // Transformando o JSON em array.
    return data;
  } catch (e) {
    console.log(`Leitura não realizada - ERRO: ${e.message}`);
  }
};

module.exports = readTalkerFile;