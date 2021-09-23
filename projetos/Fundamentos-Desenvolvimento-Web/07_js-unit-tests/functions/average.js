/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

const average = (numbersArray) => {
  let counter = 0;
  let sum = 0;
  let resultAverage;

  if (numbersArray.length === 0 || numbersArray.some((element) => typeof element === 'string')) { // ref: 8º Bloco - Dia 2 - HOF's utilizadas com Arrays.
    resultAverage = undefined;
  } else {
    for (let number of numbersArray) {
      sum += number;
      counter += 1;
    }
    resultAverage = Math.round(sum / counter);
  }
  return resultAverage;
};

module.exports = average;
