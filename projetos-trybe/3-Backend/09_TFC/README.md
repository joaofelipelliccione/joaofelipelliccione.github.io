# Projeto Trybe Futebol Clube! ⚽️

# Contexto

Nesse projeto construiu-se, utilizando **Node.js + Typescript** e **Sequelize**, um back-end dockerizado para uma página desenvolvida pela Trybe.

---

# Habilidades

 - Dockerização integral do app, realizada a partir da estruturação de Dockerfiles para o front/back e de um docker-compose para orquestração dos containers;
 - Modelagem de dados oriundos de um banco **MySQL**, através do ORM **Sequelize**;
 - Construção de uma **CRUD API REST**, totalmente em **TS**, com endpoints para consumação dos models criados;
 - Desenvolvimento de testes para alguns dos endpoints.

---
## O que foi desenvolvido

Uma aplicação responsável pela serie A do campeonato __TFC - Trybe Futebol Clube__. 

---
## Instalando Dependências:

  ```
  npm install
  ```
---

## ⚠️ **Inicie o `docker-compose`** ⚠️

- Utilize os scripts de apoio `npm run compose:up` / `npm run compose:down`, estruturados dentro do diretório `/app`, para facilitar a execução do *compose*.

---
## Executando aplicação

- Font-end - [Tabela](http://localhost:3000/)
- Back-end - [Partidas](http://localhost:3001/matches), [Times](http://localhost:3001/teams) e [Tabela](http://localhost:3001/leaderboard)
- Para adicionar ou finalizar partidas, assim como para alterar placares, deve-se realizar o login com os seguintes dados.
- *email* = admin@admin.com 
- *password* = secret_admin

---
## Executando Testes

* Para rodar os testes implementados por mim:

  `cd app/backend && npm test`

* Para vizualizar a cobertura de testes:

  `cd app/backend && npm run test:coverage`
  
