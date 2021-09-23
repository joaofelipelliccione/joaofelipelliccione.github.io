// Desafio 1
function compareTrue(bool1, bool2) {
  if (bool1 === true && bool2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  let triangleArea = (base * height) / 2;
  return triangleArea;
}

// Desafio 3
function splitSentence(sentence) {
  let sentenceArray = sentence.split(' ');
  return sentenceArray;
}

// Desafio 4
function concatName(stringArray) {
  let firstItem;
  let lastItem;

  for (let index = 0; index < stringArray.length; index += 1) {
    if (index === 0) {
      firstItem = stringArray[index];
    } else if (index === stringArray.length - 1) {
      lastItem = stringArray[index];
    }
  }
  return `${lastItem}, ${firstItem}`;
}

// Desafio 5
function footballPoints(wins, ties) {
  let winPoints = 3;
  let tiePoints = 1;
  let totalPoints = 0;

  if (wins === 0 && ties === 0) {
    totalPoints = 0;
  } else {
    totalPoints = wins * winPoints + ties * tiePoints;
  }
  return totalPoints;
}

// Desafio 6 [-2, -2, -1]
function highestCount(numbersArray) {
  let highestValue = -Infinity;
  let counter = 0;

  for (let value of numbersArray) {
    if (value > highestValue) {
      highestValue = value;
    }
  }

  for (let value of numbersArray) {
    if (value === highestValue) {
      counter += 1;
    }
  }
  return counter;
}

// Desafio 7
function catAndMouse(mousePosition, cat1Position, cat2Position) {
  let distCat1ToMouse = Math.abs(mousePosition - cat1Position);
  let distCat2ToMouse = Math.abs(mousePosition - cat2Position);

  if (distCat1ToMouse < distCat2ToMouse) {
    return 'cat1';
  } if (distCat1ToMouse > distCat2ToMouse) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzz(numbersArray) {
  let answerArray = [];

  for (let value of numbersArray) {
    if (value % 3 === 0 && value % 5 === 0) {
      answerArray.push('fizzBuzz');
    } else if (value % 3 === 0) {
      answerArray.push('fizz');
    } else if (value % 5 === 0) {
      answerArray.push('buzz');
    } else {
      answerArray.push('bug!');
    }
  }
  return answerArray;
}

// Desafio 9.1
function encode(wordOrSentence) {
  let baseArray = [];

  for (let letter of wordOrSentence) {
    if (letter === 'a') {
      baseArray.push('1');
    } else if (letter === 'e') {
      baseArray.push('2');
    } else if (letter === 'i') {
      baseArray.push('3');
    } else if (letter === 'o') {
      baseArray.push('4');
    } else if (letter === 'u') {
      baseArray.push('5');
    } else {
      baseArray.push(letter);
    }
  }
  return baseArray.join('');
}

// Desafio 9.2
function decode(wordOrSentence) {
  let baseArray = [];

  for (let letter of wordOrSentence) {
    if (letter === '1') {
      baseArray.push('a');
    } else if (letter === '2') {
      baseArray.push('e');
    } else if (letter === '3') {
      baseArray.push('i');
    } else if (letter === '4') {
      baseArray.push('o');
    } else if (letter === '5') {
      baseArray.push('u');
    } else {
      baseArray.push(letter);
    }
  }
  return baseArray.join('');
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
