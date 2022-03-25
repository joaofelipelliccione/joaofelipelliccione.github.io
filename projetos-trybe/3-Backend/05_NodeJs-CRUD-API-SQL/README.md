## Projeto Store Manger 

Neste projeto foi desenvolvida uma API utilizando a arquitetura MSC! A API construída trata-se de um sistema de gerenciamento de vendas, onde é possível criar, visualizar, deletar e atualizar produtos e vendas.
Foram desenvolvidas todas as camadas da API (Models, Services caso necessário, e Controllers).
Por meio dessa aplicação, é possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`).
Utilizou-se o banco MySQL para a gestão de dados. Além disso, a API é RESTful.


### Objetivos do Projeto

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.


### Requisitos do Projeto

#### Obrigatórios

- [1 - Crie um endpoint para o cadastro de produtos](#1---crie-um-endpoint-para-o-cadastro-de-produtos)
- [2 - Crie um endpoint para listar os produtos](#2---crie-um-endpoint-para-listar-os-produtos)
- [3 - Crie um endpoint para atualizar um produto](#3---crie-um-endpoint-para-atualizar-um-produto)
- [4 - Crie um endpoint para deletar um produto](#4---crie-um-endpoint-para-deletar-um-produto)
- [5 - Crie um endpoint para cadastrar vendas](#5---crie-um-endpoint-para-cadastrar-vendas)
- [6 - Crie um endpoint para listar as vendas](#6---crie-um-endpoint-para-listar-as-vendas)
- [7 - Crie um endpoint para atualizar uma venda](#7---crie-um-endpoint-para-atualizar-uma-venda)
- [8 - Escreva testes para cobrir 35% das camadas da sua aplicação](#8---escreva-testes-para-cobrir-35-das-camadas-da-sua-aplicação)
- [9 - Escreva testes para cobrir 40% das camadas da sua aplicação](#9---escreva-testes-para-cobrir-40-das-camadas-da-sua-aplicação)


#### Bônus
- [10 - Crie um endpoint para deletar uma venda](#10---crie-um-endpoint-para-deletar-uma-venda)
- [11 - Atualize a quantidade de produtos](#11---atualize-a-quantidade-de-produtos)
- [12 - Valide a quantidade de produtos](#12---valide-a-quantidade-de-produtos)
- [13 - Escreva testes para cobrir 50% das camadas da sua aplicação](#13---escreva-testes-para-cobrir-50-das-camadas-da-sua-aplicação)
- [14 - Escreva testes para cobrir 60% das camadas da sua aplicação](#14---escreva-testes-para-cobrir-60-das-camadas-da-sua-aplicação)


---


#### 1 - Crie um endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos na tabela `products` do Banco de Dados;

- O endpoint deve receber a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```



#### 2 - Crie um endpoint para listar os produtos

- O endpoint deve ser acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;



#### 3 - Crie um endpoint para atualizar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL deve ser atualizado;

- O corpo da requisição deve receber a seguinte estrutura:

```json
{
  "name": "new_product_name",
  "quantity": "new_product_quantity"
}
```



#### 4 - Crie um endpoint para deletar um produto

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;




#### 5 - Crie um endpoint para cadastrar vendas

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas devem ser salvas na tabela `sales` e `sales_products` do Banco de dados;

- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;

- O endpoint deve receber a seguinte estrutura:

```json
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```


#### 6 - Crie um endpoint para listar as vendas

- O endpoint deve ser acessível através do caminho (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas devem ser retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;



#### 7 - Crie um endpoint para atualizar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL deve ser atualizada;

- O corpo da requisição deve receber a seguinte estrutura:

```json
[
  {
    "product_id": "id_change",
    "quantity": "new_quantity"
  }
]
```



#### 8 - Escreva testes para cobrir 35% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;



#### 9 - Escreva testes para cobrir 40% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;




#### 10 - Crie um endpoint para deletar uma venda

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL deve ser deletado;


#### 11 - Atualize a quantidade de produtos

- Ao realizar uma venda, atualizá-la ou deletá-la, você deve também atualizar a quantidade do produto em questão presente na tabela responsável pelos produtos;

  - **Exemplo 1**: suponha que haja um produto chamado *Bola de Futebol* e a sua propriedade `quantity` tenha o valor *10*. Caso seja feita uma venda com *8* unidades desse produto, a quantidade do produto deve ser atualizada para *2* , pois 10 - 8 = 2;
  - **Exemplo 2**: Suponha que esta venda tenha sido deletada, logo estas *8* unidades devem voltar ao `quantity` e seu valor voltará a *10*, pois 2 + 8 = 10;


#### 12 - Valide a quantidade de produtos

- Um produto nunca deve ter a quantidade em estoque menor que 0;

- Quando uma venda for realizada, garanta que a quantidade sendo vendida está disponível no estoque



#### 13 - Escreva testes para cobrir 50% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;



#### 14 - Escreva testes para cobrir 60% das camadas da sua aplicação

- Seus arquivos de teste devem ficar no diretório `test/unit`, **como citado [aqui](#para-escrever-seus-própios-arquivos-de-teste)**;

- Seus testes da `model` devem fazer mock do banco de dados obrigatóriamente;

- Opcionalmente você pode parar o serviço do `MYSQL` em sua máquina. Para rodar seus teste utilize `npm run test:mocha`;

---

