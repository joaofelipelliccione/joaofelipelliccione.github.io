## Requisitos de Projeto


  - [1. Crie testes para uma função assíncrona](#1-crie-testes-para-uma-função-assíncrona)
  - [2. Crie um mock no teste mockFunctions](#2-crie-um-mock-no-teste-mockfunctions)
  - [3. Crie um mock para o retorno da API](#3-crie-um-mock-para-o-retorno-da-api)
  - [4. Crie funções no teste setupTeardown](#4-crie-funções-no-teste-setupteardown)


### 1. Crie testes para uma função assíncrona

Complete os testes do arquivo `test/asyncJest.spec.js` para que funcionem com código assíncrono.

### 2. Crie um `mock` no teste mockFunctions

Crie mock functions no arquivo `test/mockFunctions.spec.js` para que os testes mockados "sobrescrevam" o código definido na pasta `src`. A ideia é que as funções criadas a partir do Jest tenham prioridade na sua execução.

### 3. Crie um `mock` para o retorno da API

Crie uma API mock no arquivo `test/mockApi.spec.js` para que os testes do Jest utilizem retornos de API fixos e independentes de requisições.

### 4. Crie funções no teste setupTeardown

Intercale funções entre os testes definidos no arquivo `test/setupTeardown.spec.js`.

