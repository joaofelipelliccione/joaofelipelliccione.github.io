## Projeto MongoDB Commerce

Neste projeto, foi utilizado o banco de dados `commerce`, que contém dados do cardápio do **McDonald's**, como ingredientes, valores nutricionais e dados fictícios de vendas. 

### Objetivos do Projeto

  * Buscar documentos no banco
  
  * Usar filtros na busca
  
  * Deletar documentos conforme filtro
  
  * Contar documentos compreendidos nos filtros pedidos
  
  * Inserir documentos no banco

  * Utilizar o método `updateOne()` e `updateMany()`

  * Utilizar os operadores `$set`, `$mul`, `$inc`, `$min`, `$max` e `$currentDate`

  * Renomear campos e remover campos

  * Incorporar dados aos documentos através de arrays

  * Utilizar os operadores `$pop`, `$pull` e `$push`
  
  * Utilizar o operador `$addToSet`

  * Utilizar os operadores `$each`, `$slice` e `$sort`

  * Utilizar o operador `$all` para filtrar documentos

  * Utilizar o operador `$elemMatch` para filtrar documentos

  * Utilizar o operador `$size` para filtrar documentos pelo tamanho de arrays

  * Utilizar o operador `$expr` para criar expressões de agregação

  * Utilizar expressões regulares e o operador `$regex` para buscar documentos

  * Utilizar o operador `$mod`


### Requisitos do Projeto


- [Requisitos obrigatórios do projeto](#requisitos-do-projeto)
    - [1 - Retorne a quantidade de documentos inseridos na coleção `produtos`.](#1---retorne-a-quantidade-de-documentos-inseridos-na-coleção-produtos)
    - [2 - Ordene a coleção `produtos` pela quantidade de lanches vendidos em ordem crescente e mostre apenas o nome e quantidade de lanches vendidos.](#2---ordene-a-coleção-produtos-pela-quantidade-de-lanches-vendidos-em-ordem-crescente-e-mostre-apenas-o-nome-e-quantidade-de-lanches-vendidos)
    - [3 - Retorne o lanche mais vendido e mostre apenas o nome e quantidade de lanches vendidos.](#3---retorne-o-lanche-mais-vendido-e-mostre-apenas-o-nome-e-quantidade-de-lanches-vendidos)
    - [4 - Retorne os lanches que tiveram vendas maiores que `50` e menores que `100`. Mostre apenas o nome e quantidade de lanches vendidos. Ordene por quantidade de lanches vendidos em ordem crescente.](#4---retorne-os-lanches-que-tiveram-vendas-maiores-que-50-e-menores-que-100-mostre-apenas-o-nome-e-quantidade-de-lanches-vendidos-ordene-por-quantidade-de-lanches-vendidos-em-ordem-crescente)
    - [5 - Retorne o `nome`, as `curtidas` e `vendidos` dos lanches que tiveram quantidade de `curtidas` igual a `36` ou tenham a quantidade de vendas igual a `85`.](#5---retorne-o-nome-as-curtidas-e-vendidos-dos-lanches-que-tiveram-quantidade-de-curtidas-igual-a-36-ou-tenham-a-quantidade-de-vendas-igual-a-85)
    - [6 - Retorne o `nome` e `curtidas` dos lanches que tiveram curtidas maiores que `10` e menores que `100`.](#6---retorne-o-nome-e-curtidas-dos-lanches-que-tiveram-curtidas-maiores-que-10-e-menores-que-100)
    - [7 - Retorne o `nome` e `vendidos` dos lanches que tenham sido `vendidos` uma quantidade diferente de `50` e que o campo `tag` não exista.](#7---retorne-o-nome-e-vendidos-dos-lanches-que-tenham-sido-vendidos-uma-quantidade-diferente-de-50-e-que-o-campo-tag-não-exista)
    - [8 - Delete os lanches que tenham menos de `50` `curtidas` e retorne o `nome` dos lanches que restaram no banco.](#8---delete-os-lanches-que-tenham-menos-de-50-curtidas-e-retorne-o-nome-dos-lanches-que-restaram-no-banco)
    - [9 - Retorne o `nome` de todos os lanches que possuam `calorias` abaixo de `500`.](#9---retorne-o-nome-de-todos-os-lanches-que-possuam-calorias-abaixo-de-500)
    - [10 - Retorne o `nome` de todos os lanches que tenham o percentual de `proteínas` maior ou igual a `30` e menor ou igual a `40`.](#10---retorne-o-nome-de-todos-os-lanches-que-tenham-o-percentual-de-proteínas-maior-ou-igual-a-30-e-menor-ou-igual-a-40)
    - [11 - Retorne o `nome` do produto, a quantidade de `curtidas` e quantos itens foram `vendidos` dos produtos que não sejam iguais a `Big Mac` e `McChicken`.](#11---retorne-o-nome-do-produto-a-quantidade-de-curtidas-e-quantos-itens-foram-vendidos-dos-produtos-que-não-sejam-iguais-a-big-mac-e-mcchicken)
    - [12 - Adicione `ketchup` aos `ingredientes` para todos os sanduíches menos o `McChicken`, garantindo que não haja duplicidade nos `ingredientes`.](#12---adicione-ketchup-aos-ingredientes-para-todos-os-sanduíches-menos-o-mcchicken-garantindo-que-não-haja-duplicidade-nos-ingredientes)
    - [13 - Inclua o campo `criadoPor` em todos os documentos, colocando `Ronald McDonald` no valor desse campo.](#13---inclua-o-campo-criadopor-em-todos-os-documentos-colocando-ronald-mcdonald-no-valor-desse-campo)
    - [14 - Crie uma query que retorne todos os lanches que possuem *picles* em seus ingredientes e mostre apenas os `3` primeiros itens contidos no array `valoresNutricionais`.](#14---crie-uma-query-que-retorne-todos-os-lanches-que-possuem-picles-em-seus-ingredientes-e-mostre-apenas-os-3-primeiros-itens-contidos-no-array-valoresnutricionais)
    - [15 - Adicione o campo `avaliacao` em todos os documentos da coleção e efetue alterações nesse campo.](#15---adicione-o-campo-avaliacao-em-todos-os-documentos-da-coleção-e-efetue-alterações-nesse-campo)
    - [16 - Atribua a data corrente ao campo `ultimaModificacao` no sanduíche `Big Mac`.](#16---atribua-a-data-corrente-ao-campo-ultimamodificacao-no-sanduíche-big-mac)
    - [17 - Retorne a quantidade total de produtos em uma nova coleção chamada `resumoProdutos`.](#17---retorne-a-quantidade-total-de-produtos-em-uma-nova-coleção-chamada-resumoprodutos)
    - [18 - Inclua `bacon` no final da lista de `ingredientes` dos sanduíches `Big Mac` e `Quarteirão com Queijo`.](#18---inclua-bacon-no-final-da-lista-de-ingredientes-dos-sanduíches-big-mac-e-quarteirão-com-queijo)
    - [19 - Remova o item `cebola` de todos os sanduíches.](#19---remova-o-item-cebola-de-todos-os-sanduíches)
    - [20 - Remova o **primeiro** `ingrediente` do sanduíche `Quarteirão com Queijo`.](#20---remova-o-primeiro-ingrediente-do-sanduíche-quarteirão-com-queijo)
    - [21 - Remova o **último** `ingrediente` do sanduíche `Cheddar McMelt`.](#21---remova-o-último-ingrediente-do-sanduíche-cheddar-mcmelt)
    - [22 - Adicione a quantidade de vendas dos sanduíches por dia da semana.](#22---adicione-a-quantidade-de-vendas-dos-sanduíches-por-dia-da-semana)
    - [23 - Insira os elementos `combo` e `tasty` no _array_ `tags` de todos os sanduíches e aproveite para deixar os elementos em ordem alfabética ascendente.](#23---insira-os-elementos-combo-e-tasty-no-array-tags-de-todos-os-sanduíches-e-aproveite-para-deixar-os-elementos-em-ordem-alfabética-ascendente)
    - [24 - Ordene em todos os documentos os elementos do _array_ `valoresNutricionais` pelo campo `percentual` de forma descendente.](#24---ordene-em-todos-os-documentos-os-elementos-do-array-valoresnutricionais-pelo-campo-percentual-de-forma-descendente)
    - [25 - Adicione o elemento `muito sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior ou igual a `40`.](#25---adicione-o-elemento-muito-sódio-ao-final-do-array-tags-nos-produtos-em-que-o-percentual-de-sódio-seja-maior-ou-igual-a-40)
    - [26 - Adicione o elemento `contém sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior do que `20` e menor do que `40`.](#26---adicione-o-elemento-contém-sódio-ao-final-do-array-tags-nos-produtos-em-que-o-percentual-de-sódio-seja-maior-do-que-20-e-menor-do-que-40)
    - [27 - Conte quantos produtos contêm `Mc` no nome, sem considerar letras maiúsculas ou minúsculas.](#27---conte-quantos-produtos-contêm-mc-no-nome-sem-considerar-letras-maiúsculas-ou-minúsculas)
    - [28 - Conte quantos produtos têm `4` ingredientes.](#28---conte-quantos-produtos-têm-4-ingredientes)
    - [29 - Renomeie o campo `descricao` para `descricaoSite` em todos os documentos.](#29---renomeie-o-campo-descricao-para-descricaosite-em-todos-os-documentos)
    - [30 - Remova o campo `curtidas` do item `Big Mac`.](#30---remova-o-campo-curtidas-do-item-big-mac)
    - [31 - Retorne o `nome` dos sanduíches em que o número de `curtidas` é maior que o número de sanduíches `vendidos`.](#31---retorne-o-nome-dos-sanduíches-em-que-o-número-de-curtidas-é-maior-que-o-número-de-sanduíches-vendidos)
    - [32 - Retorne o `nome` e a quantidade de vendas (`vendidos`) dos sanduíches em que o número de vendas é múltiplo de `5`.](#32---retorne-o-nome-e-a-quantidade-de-vendas-vendidos-dos-sanduíches-em-que-o-número-de-vendas-é-múltiplo-de-5)


---


# Requisitos obrigatórios do projeto


### 1 - Retorne a quantidade de documentos inseridos na coleção `produtos`.

- Para isso, escreva a query no arquivo `desafio1.js`

### 2 - Ordene a coleção `produtos` pela quantidade de lanches vendidos em ordem crescente e mostre apenas o nome e quantidade de lanches vendidos.

- Para isso, escreva a query no arquivo `desafio2.js`

### 3 - Retorne o lanche mais vendido e mostre apenas o nome e quantidade de lanches vendidos.

- Para isso, escreva a query no arquivo `desafio3.js`

### 4 - Retorne os lanches que tiveram vendas maiores que `50` e menores que `100`. Mostre apenas o nome e quantidade de lanches vendidos. Ordene por quantidade de lanches vendidos em ordem crescente.

- Para isso, escreva a query no arquivo `desafio4.js`

### 5 - Retorne o `nome`, as `curtidas` e `vendidos` dos lanches que tiveram quantidade de `curtidas` igual a `36` ou tenham a quantidade de vendas igual a `85`.

- Para isso, escreva a query no arquivo `desafio5.js`

### 6 - Retorne o `nome` e `curtidas` dos lanches que tiveram curtidas maiores que `10` e menores que `100`.

- Para isso, escreva a query no arquivo `desafio6.js`

### 7 - Retorne o `nome` e `vendidos` dos lanches que tenham sido `vendidos` uma quantidade diferente de `50` e que o campo `tags` não exista.

- Para isso, escreva a query no arquivo `desafio7.js`

### 8 - Delete os lanches que tenham menos de `50` `curtidas` e retorne o `nome` dos lanches que restaram no banco.

- Para isso, escreva a query no arquivo `desafio8.js`

### 9 - Retorne o `nome` de todos os lanches que possuam `calorias` abaixo de `500`.

- Para isso, escreva a query no arquivo `desafio9.js`.

### 10 - Retorne o `nome` de todos os lanches que tenham o percentual de `proteínas` maior ou igual a `30` e menor ou igual a `40`.

- Para isso, escreva a query no arquivo `desafio10.js`

### 11 - Retorne o `nome` do produto, a quantidade de `curtidas` e quantos itens foram `vendidos` dos produtos que não sejam iguais a `Big Mac` e `McChicken`.

- Para isso, escreva a query no arquivo `desafio11.js`

### 12 - Adicione `ketchup` aos `ingredientes` para todos os sanduíches menos o `McChicken`, garantindo que não haja duplicidade nos `ingredientes`.

Para isso, escreva no arquivo `desafio12.js` duas queries, **nesta ordem**:

1. Crie uma query que adicione `ketchup` aos `ingredientes` para todos os sanduíches menos o `McChicken`, garantindo que não haja duplicidade nos `ingredientes`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

### 13 - Inclua o campo `criadoPor` em todos os documentos, colocando `Ronald McDonald` no valor desse campo.

Para isso, escreva no arquivo `desafio13.js` duas queries, **nesta ordem**:

1. Crie uma query que adicione o campo `criadoPor` em todos os documentos, colocando `"Ronald McDonald"` no valor desse campo.

2. Crie uma query que retorne o `nome` e `criadoPor` de todos os produtos.

### 14 - Crie uma query que retorne todos os lanches que possuem *picles* em seus ingredientes e mostre apenas os `3` primeiros itens contidos no array `valoresNutricionais`.

1. Sua query deve retornar apenas os campos `nome`, `ingredientes` e `valoresNutricionais`.


### 15 - Adicione o campo `avaliacao` em todos os documentos da coleção e efetue alterações nesse campo.

Para isso, escreva no arquivo `desafio15.js` quatro queries, **nesta ordem**:

1. Crie uma query que inclua o campo `avaliacao` do tipo `NumberInt` e com o valor `0` em todos os documentos da coleção.

2. Crie uma query que incremente o valor do campo `avaliacao` em `5` em todos os sanduíches de carne do tipo `bovino`. Dica: utilize como filtro o campo `tags`.

3. Crie uma query que incremente o valor do campo `avaliacao` em `3` em todos os sanduíches de `ave`.

4. Crie uma query que retorne o `nome` e `avaliacao` de todos os sanduíches.

### 16 - Adicione o campo `ultimaModificacao` com a data corrente somente no sanduíche `Big Mac`.

Para isso, escreva no arquivo `desafio16.js` duas queries, **nesta ordem**:

1. Crie uma query que inclua o campo `ultimaModificacao` somente ao sanduíche `Big Mac`.

2. Crie uma query que atribua a data corrente ao campo `ultimaModificacao` no sanduíche `Big Mac`. Para a data corrente faça uso do tipo `Date`.

3. Crie uma query que retorne o `nome` de todos os documentos em que o campo `ultimaModificacao` existe.

### 17 - Retorne a quantidade total de produtos em uma nova coleção chamada `resumoProdutos`.

- Para isso, escreva no arquivo `desafio17.js` duas queries, **nesta ordem**:

1. Crie uma query que insira na coleção "resumoProdutos" um documento com os campos: "franquia":"McDonalds" e "totalProdutos". O valor de `totalProdutos` deve ser a quantidade de produtos registrados na coleção `produtos`.

2. Em uma segunda query, retorne a "franquia" e o totalProdutos do primeiro documento presente na coleção resumoProdutos em que a "franquia" seja McDonalds.

### 18 - Inclua `bacon` no final da lista de `ingredientes` dos sanduíches `Big Mac` e `Quarteirão com Queijo`.

Para isso, escreva no arquivo `desafio18.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a inclusão de `bacon` no final da lista de `ingredientes` dos sanduíches `Big Mac` e `Quarteirão com Queijo`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

### 19 - Remova o item `cebola` de todos os sanduíches.

Para isso, escreva no arquivo `desafio19.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do item `cebola` em todos os sanduíches.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

### 20 - Remova o **primeiro** `ingrediente` do sanduíche `Quarteirão com Queijo`.

Para isso, escreva no arquivo `desafio20.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do **primeiro** `ingrediente` no sanduíche `Quarteirão com Queijo`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

### 21 - Remova o **último** `ingrediente` do sanduíche `Cheddar McMelt`.

Para isso, escreva no arquivo `desafio21.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do **último** `ingrediente` no sanduíche `Cheddar McMelt`.

2. Crie uma query que retorne o `nome` e `ingredientes` de todos os documentos.

### 22 - Adicione a quantidade de vendas dos sanduíches por dia da semana.

Para isso, escreva no arquivo `desafio22.js` quatro queries, **nesta ordem**:

1. Crie uma query que inclua um campo `vendasPorDia` em todos os sanduíches. O valor deste campo deverá ser um _array_ com sete posições. Cada uma delas representará um dia da semana, e cada posição iniciará em `0`. O _array_ deve se parecer como abaixo:
   ```json
   "vendasPorDia": [0, 0, 0, 0, 0, 0, 0]
   ```

- O primeiro item desse _array_ representa as vendas no **domingo**, o segundo item representa as vendas na **segunda-feira**, e assim até chegar ao último item, que representa as vendas no **sábado**.

2. Crie uma query que incremente as vendas de `Big Mac` às **quartas-feiras** em `60`.

3. Crie uma query que incremente as vendas de todos os sanduíches de carne do tipo `bovino` aos **sábados** em `120`.

4. Crie uma query que retorne o `nome` e `vendasPorDia` de todos os documentos.

### 23 - Insira os elementos `combo` e `tasty` no _array_ `tags` de todos os sanduíches e aproveite para deixar os elementos em ordem alfabética ascendente.

Para isso, escreva no arquivo `desafio23.js` duas queries, **nesta ordem**:

1. Crie uma query que faça tanto a inserção dos elementos `combo` e `tasty` no _array_ `tags` de todos os sanduíches quanto a ordenação dos elementos de `tags` em ordem alfabética ascendente.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

### 24 - Ordene em todos os documentos os elementos do _array_ `valoresNutricionais` pelo campo `percentual` de forma descendente.

Para isso, escreva no arquivo `desafio24.js` duas queries, **nesta ordem**:

1. Crie uma query que faça em todos os documentos a ordenação dos elementos do _array_ `valoresNutricionais` pelo campo `percentual` de forma descendente. Dica: mesmo sem adicionar nenhum novo elemento, para essa operação é necessário utilizar também o modificador `$each`.

2. Crie uma query que retorne o `nome` e `valoresNutricionais` de todos os documentos.

### 25 - Adicione o elemento `muito sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior ou igual a `40`.

Para isso, escreva no arquivo `desafio25.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a adição do elemento `muito sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior ou igual a `40`.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

### 26 - Adicione o elemento `contém sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior do que `20` e menor do que `40`.

Para isso, escreva no arquivo `desafio26.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a adição do elemento `contém sódio` ao final do _array_ `tags` nos produtos em que o `percentual` de `sódio` seja maior do que `20` e menor do que `40`.

2. Crie uma query que retorne o `nome` e `tags` de todos os documentos.

### 27 - Conte quantos produtos contêm `Mc` no nome, sem considerar letras maiúsculas ou minúsculas.

- Para isso, escreva a query no arquivo `desafio27.js`

### 28 - Conte quantos produtos têm `4` ingredientes.

- Para isso, escreva a query no arquivo `desafio28.js`

### 29 - Renomeie o campo `descricao` para `descricaoSite` em todos os documentos.

Para isso, escreva no arquivo `desafio29.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a renomeação do campo `descricao` para `descricaoSite` em todos os documentos.

2. Crie uma query que retorne o `nome`, `descricao` e `descricaoSite` de todos os documentos.

### 30 - Remova o campo `curtidas` do item `Big Mac`.

Para isso, escreva no arquivo `desafio30.js` duas queries, **nesta ordem**:

1. Crie uma query que faça a remoção do campo `curtidas` do item `Big Mac`.

2. Crie uma query que retorne o `nome` e `curtidas` de todos os documentos.

### 31 - Retorne o `nome` dos sanduíches em que o número de `curtidas` é maior que o número de sanduíches `vendidos`.

- Para isso, escreva a query no arquivo `desafio31.js`

### 32 - Retorne o `nome` e a quantidade de vendas (`vendidos`) dos sanduíches em que o número de vendas é múltiplo de `5`.

- Para isso, escreva a query no arquivo `desafio32.js`

---

