## Requisitos do projeto
  - [1. Implemente a função getSpeciesByIds](#1-implemente-a-função-getSpeciesByIds)
  - [2. Implemente a função getAnimalsOlderThan](#2-implemente-a-função-getAnimalsOlderThan)
  - [3. Implemente a função getEmployeeByName](#3-implemente-a-função-getEmployeeByName)
  - [4. Implemente a função createEmployee](#4-implemente-a-função-createEmployee)
  - [5. Implemente a função isManager](#5-implemente-a-função-isManager)
  - [6. Implemente a função addEmployee](#6-implemente-a-função-addEmployee)
  - [7. Implemente a função countAnimals](#7-implemente-a-função-countAnimals)
  - [8. Implemente a função calculateEntry](#8-implemente-a-função-calculateEntry)
  - [9. Implemente a função getAnimalMap](#9-implemente-a-função-getAnimalMap)
  - [10. Implemente a função getSchedule](#10-implemente-a-função-getSchedule)
  - [11. Implemente a função getOldestFromFirstSpecies](#11-implemente-a-função-getOldestFromFirstSpecies)
  - [12. Implemente a função increasePrices](#12-implemente-a-função-increasePrices)
  - [13. Implemente a função getEmployeeCoverage](#13-implemente-a-função-getEmployeeCoverage)

## Requisitos do projeto


### 1. IMPLEMENTE A FUNÇÃO getSpeciesByIds

  Esta função é responsável pela busca das espécies de animais por id. Ela retorna um array contendo as espécies referentes aos ids passados como parâmetro, podendo receber um ou mais ids.

### 2. IMPLEMENTE A FUNÇÃO getAnimalsOlderThan

  Esta função, a partir do nome de uma espécie e uma idade mínima, verifica se todos os animais daquela espécie possuem a idade mínima especificada

### 3. IMPLEMENTE A FUNÇÃO getEmployeeByName

   Esta função é responsável pela busca das pessoas colaboradoras através do primeiro ou do último nome delas

  
### 4. IMPLEMENTE A FUNÇÃO createEmployee

  A função, a partir de informações recebidas nos parâmetros, é capaz de criar um objeto equivalente ao de uma pessoa colaboradora, retornando-o

 
### 5. IMPLEMENTE A FUNÇÃO isManager

  Verifica se uma pessoa colaboradora, a partir de seu id, ocupa cargo de gerência.

 
### 6. IMPLEMENTE A FUNÇÃO addEmployee

  A função irá adicionar uma nova pessoa colaboradora ao array `employees`, presente no arquivo `data.js`.

  
### 7. IMPLEMENTE A FUNÇÃO countAnimals

  Esta função é responsável por contabilizar a quantidade de animais.

  
### 8. IMPLEMENTE A FUNÇÃO calculateEntry

  A partir da quantidade de visitantes e a faixa etária de cada um, esta função é responsável por retornar o preço total a ser cobrado

  
### 9. IMPLEMENTE A FUNÇÃO getAnimalMap

  A função é responsável pelo mapeamento geográfico das espécies e seus animais, podendo ainda filtrá-los por ordem alfabética e gênero, por exemplo


### 10. IMPLEMENTE A FUNÇÃO getSchedule

  A função é responsável por disponibilizar as informações de horário para uma consulta, que pode querer ter acesso a todo o cronograma da semana ou apenas o cronograma de um dia específico

 
### 11. IMPLEMENTE A FUNÇÃO getOldestFromFirstSpecies

  A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro

 
### 12. IMPLEMENTE A FUNÇÃO increasePrices

  A função é responsável por aumentar o preço das visitas, com base no valor de aumento recebido no parâmetro, em porcentagem

  
### 13. IMPLEMENTE A FUNÇÃO getEmployeeCoverage

  A função é responsável por consultar as espécies pela qual a pessoa colaborada, recebida no parâmetro através de seu `id`, `firstName` ou `lastName`, é responsável

