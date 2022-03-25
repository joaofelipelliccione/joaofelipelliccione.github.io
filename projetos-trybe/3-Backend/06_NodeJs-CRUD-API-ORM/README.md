## Projeto Blogs API

Neste projeto foi arquiteturada e desenvolvida uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, desenvolveram-se alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados.

Primeiro, criou-se uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, criou-se também uma tabela de Categorias para os Posts e por fim a tabela de Posts foi o foco, guardando todas as informações dos posts realizados na plataforma. 
A aplicação foi desenvolvida em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.


---

### Objetivos do Projeto

 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`

---

### Requisitos do Projeto

#### Obrigatórios

- [1 - Sua aplicação deve ter o endpoint POST `/user`](#1---sua-aplicação-deve-ter-o-endpoint-post-user)
- [2 - Sua aplicação deve ter o endpoint POST `/login`](#2---sua-aplicação-deve-ter-o-endpoint-post-login)
- [3 - Sua aplicação deve ter o endpoint GET `/user`](#3---sua-aplicação-deve-ter-o-endpoint-get-user)
- [4 - Sua aplicação deve ter o endpoint GET `/user/:id`](#4---sua-aplicação-deve-ter-o-endpoint-get-userid)
- [5 - Sua aplicação deve ter o endpoint POST `/categories`](#5---sua-aplicação-deve-ter-o-endpoint-post-categories)
- [6 - Sua aplicação deve ter o endpoint GET `/categories`](#6---sua-aplicação-deve-ter-o-endpoint-get-categories)
- [7 - Sua aplicação deve ter o endpoint POST `/post`](#7---sua-aplicação-deve-ter-o-endpoint-post-post)
- [8 - Sua aplicação deve ter o endpoint GET `/post`](#8---sua-aplicação-deve-ter-o-endpoint-get-post)
- [9 - Sua aplicação deve ter o endpoint GET `post/:id`](#9---sua-aplicação-deve-ter-o-endpoint-get-postid)
- [10 - Sua aplicação deve ter o endpoint PUT `/post/:id`](#10---sua-aplicação-deve-ter-o-endpoint-put-postid)

#### Bônus

- [11 - Sua aplicação deve ter o endpoint DELETE `post/:id`](#11---sua-aplicação-deve-ter-o-endpoint-delete-postid)
- [12 - Sua aplicação deve ter o endpoint DELETE `/user/me`](#12---sua-aplicação-deve-ter-o-endpoint-delete-userme)
- [13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`](#13---sua-aplicação-deve-ter-o-endpoint-get-postsearchqsearchterm)




#### 1 - Sua aplicação deve ter o endpoint POST `/user`

Os seguintes pontos serão avaliados:

- O endpoint deve ser capaz de adicionar um novo user a sua tabela no banco de dados;

- O corpo da requisição deverá ter o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo `displayName` deverá ser uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

- Caso exista uma pessoa com o mesmo email na base, deve-se retornar o seguinte erro:

  ```json
  {
    "message": "User already registered"
  }
  ```

- Caso contrário, retornar a mesma resposta do endpoint de `/login`, um token `JWT`:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível cadastrar um usuário com sucesso]**


**[Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres]**


**[Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`]**


**[Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`]**


**[Será validado que o campo `email` é obrigatório]**


**[Será validado que não é possível cadastrar usuário com o campo `password` diferente de 6 caracteres]**



**[Será validado que o campo `password` é obrigatório]**



**[Validar que não é possível cadastrar um usuário com email já existente]**


#### 2 - Sua aplicação deve ter o endpoint POST `/login`

Os seguintes pontos serão avaliados:

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

- Caso esteja tudo certo com o login, a resposta deve ser um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível fazer login com sucesso]**


**[Será validado que não é possível fazer login sem o campo `email`]**



**[Será validado que não é possível fazer login sem o campo `password`]**



**[Será validado que não é possível fazer login com o campo `email` em branco]**



**[Será validado que não é possível fazer login com o campo `password` em branco]**



**[Será validado que não é possível fazer login com um usuário que não existe]**



#### 3 - Sua aplicação deve ter o endpoint GET `/user`

Os seguintes pontos serão avaliados:

- Deve listar todos os **Users** e retorná-los na seguinte estrutura:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível listar todos os usuários]**


**[Será validado que não é possível listar usuários sem o token na requisição]**



**[Será validado que não é possível listar usuários com o token inválido]**


#### 4 - Sua aplicação deve ter o endpoint GET `/user/:id`

Os seguintes pontos serão avaliados:

- Retorna os detalhes do usuário baseado no `id` da rota. Os dados devem ter o seguinte formato:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível listar um usuário específico com sucesso]**



**[Será validado que não é possível listar um usuário inexistente]**



**[Será validado que não é possível listar um determinado usuário sem o token na requisição]**



**[Será validado que não é possível listar um determinado usuário com o token inválido]**


#### 5 - Sua aplicação deve ter o endpoint POST `/categories`

Os seguintes pontos serão avaliados:

- Esse endpoint deve receber uma _Categoria_ no corpo da requisição e criá-la no banco. O corpo da requisição deve ter a seguinte estrutura:

 ```json
  {
    "name": "Inovação"
  }
  ```

- Caso a Categoria não contenha o `name` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível cadastrar uma categoria com sucesso]**


**[Será validado que não é possível cadastrar uma categoria sem o campo name]**



**[Será validado que não é possível cadastrar uma determinada categoria com o token inválido]**



**[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**


#### 6 - Sua aplicação deve ter o endpoint GET `/categories`

Os seguintes pontos serão avaliados:

- Esse endpoint deve listar todas as Categorias e retorná-las na seguinte estrutura:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

Além disso, as seguintes verificações serão feitas:
[Será validado que é possível listar todas as categoria com sucesso]



**[Será validado que não é possível listar as categorias com o token inválido]**



**[Será validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**




#### 7 - Sua aplicação deve ter o endpoint POST `/post`

Os seguintes pontos serão avaliados:

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e criá-lo no banco. O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- Caso o post não contenha o `title`, `content` ou `categoryIds` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorne um código de `status 401`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível cadastrar um blogpost com sucesso]**



**[Será validado que não é possível cadastrar um blogpost sem o campo `title`]**


**[Será validado que não é possível cadastrar um blogpost sem o campo `content`]**


**[Será validado que não é possível cadastrar um blogpost sem o campo `categoryIds`]**


**[Será validado que não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**



**[Será validado que não é possível cadastrar um blogpost sem o token]**



**[Será validado que não é possível cadastrar um blogpost com o token inválido]**


#### 8 - Sua aplicação deve ter o endpoint GET `/post`

Os seguintes pontos serão avaliados:

- Esse endpoint deve listar todos os _BlogPosts_ e retorná-los na seguinte estrutura:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível listar blogpost com sucesso]**


**[Será validado que não é possível listar blogpost sem token]**


**[Será validado que não é possível listar blogpost com token inválido]**


#### 9 - Sua aplicação deve ter o endpoint GET `post/:id`

Os seguintes pontos serão avaliados:

- Retorna um **BlogPost** com o `id` especificado. O retorno deve ter os seguinte formato:

```json
  {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível listar um blogpost com sucesso]**


**[Será validado que não é possível listar um blogpost sem token]**


**[Será validado que não é possível listar um blogpost com token inválido]**


**[Será validado que não é possível listar um blogpost inexistente]**





#### 10 - Sua aplicação deve ter o endpoint PUT `/post/:id`

Os seguintes pontos serão avaliados:

- O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.

- A(s) categoria(s) do post **não** podem ser editadas, somente o `title` e `content`.

- O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de `status 400`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível editar um blogpost com sucesso]**


**[Será validado que não é possível editar as categorias de um blogpost]**



**[Será validado que não é possível editar um blogpost com outro usuário]**



**[Será validado que não possível editar um blogpost sem token]**


**[Será validado que não possível editar um blogpost com token inválido]**



**[Será validado que não possível editar um blogpost sem o campo `title`]**



**[Será validado que não possível editar um blogpost sem o campo `content`]**


#### 11 - Sua aplicação deve ter o endpoint DELETE `post/:id`

Os seguintes pontos serão avaliados:

- Deleta o post com o `id` especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, deve-se retornar um código de `status 401`.

- Caso o post referido não exista, deve-se retornar um código de `status 404`.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível deletar um blogpost com sucesso]**


**[Será validado que não é possível deletar um blogpost com outro usuário]**


**[Será validado que não é possível deletar um blogpost inexistente]**


**[Será validado que não é possível deletar um blogpost sem o token]**


**[Será validado que não é possível deletar um blogpost com o token inválido]**



#### 12 - Sua aplicação deve ter o endpoint DELETE `/user/me`

Os seguintes pontos serão avaliados:

- Utilizando o token de autenticação nos headers, o usuário correspondente deve ser apagado.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível excluir meu usuário com sucesso]**



**[Será validado que não é possível excluir meu usuário com token inválido]**



**[Será validado que não é possível excluir meu usuário sem o token]**



#### 13 - Sua aplicação deve ter o endpoint GET `post/search?q=:searchTerm`

Os seguintes pontos serão avaliados:

- Retorna uma array de **BlogPosts** que contenham em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. O retorno deve ter o seguinte formato:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
```

- Caso nenhum **BlogPost** satisfaça a busca, retorne um array vazio.

Além disso, as seguintes verificações serão feitas:

**[Será validado que é possível buscar um blogpost pelo `title`]**



**[Será validado que é possível buscar um blogpost pelo `content`]**



**[Será validado que é possível buscar todos os blogpost quando passa a busca vazia']**



**[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]**



**[Será validado que não é possível buscar um blogpost sem o token]**


**[Será validado que não é possível buscar um blogpost com o token inválido]**


--- 

