// Desafio 10
function techList(techNameArray, name) {
  let sortedArray = techNameArray.sort();
  let techObject = {};
  let answerArray = [];

  if (techNameArray.length === 0) {
    return 'Vazio!';
  }

  for (let technology of sortedArray) {
    techObject.name = name;
    techObject.tech = technology;
    answerArray.push(techObject);
    techObject = {};
  }

  return answerArray;
}

// Desafio 11
function generatePhoneNumber(elevenNumbersArray) {
  let counter = 0;

  if (elevenNumbersArray.length !== 11) {
    return 'Array com tamanho incorreto.';
  }

  for (let value of elevenNumbersArray) {
    if (value < 0 || value > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }

  for (let value of elevenNumbersArray) {
    for (let index = 0; index < elevenNumbersArray.length; index += 1) {
      if (value === elevenNumbersArray[index]) {
        counter += 1;
      }
    }
    if (counter >= 3) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
    counter = 0;
  }

  let dig1 = elevenNumbersArray[0];
  let dig2 = elevenNumbersArray[1];
  let dig3 = elevenNumbersArray[2];
  let dig4 = elevenNumbersArray[3];
  let dig5 = elevenNumbersArray[4];
  let dig6 = elevenNumbersArray[5];
  let dig7 = elevenNumbersArray[6];
  let dig8 = elevenNumbersArray[7];
  let dig9 = elevenNumbersArray[8];
  let dig10 = elevenNumbersArray[9];
  let dig11 = elevenNumbersArray[10];

  return `(${dig1}${dig2}) ${dig3}${dig4}${dig5}${dig6}${dig7}-${dig8}${dig9}${dig10}${dig11}`;
}

// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  if (lineA < lineB + lineC && lineB < lineA + lineC && lineC < lineA + lineB ) {
    if (lineA > Math.abs(lineB - lineC) && lineB > Math.abs(lineA - lineC) && lineC > Math.abs(lineA - lineB)) {
      return true;
    }
    return false;
  }
  return false;
}

// Desafio 13
function hydrate(oqueEQuantoBebeu) {
  let magicExpression = /\d+/g;
  let numbersFromStringArray = oqueEQuantoBebeu.match(magicExpression);
  let waterSuggestion = 0;

  for (let value of numbersFromStringArray) {
    waterSuggestion += Number(value);
  }

  if (waterSuggestion > 1) {
    return `${waterSuggestion} copos de água`;
  }
  return `${waterSuggestion} copo de água`;
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
