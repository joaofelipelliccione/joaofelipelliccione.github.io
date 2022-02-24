const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');

describe('1m) Lista produtos cadastrados', () => {

  describe('1.1) Quando são listados com sucesso', () => {
    before(async () => {
      const execute = [[
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        },
        {
          id: 2,
          name: "Traje de encolhimento",
          quantity: 20
        },
      ]];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    it('1.1.1) um array é retornado', async () => {
      const response = await ProductModel.findAll();
      expect(response).to.be.an('array');
    });

    it('1.1.2) tal array possui objetos com as chaves "id", "name" e "quantity"', async () => {
      const response = await ProductModel.findAll();
      expect(response[0]).to.include.all.keys('id', 'name', 'quantity');
      expect(response[1]).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('2m) Lista produto cadastrado, que bate com determinado id', () => {
  const payloadProduct = 1;

  before(async () => {
    const execute = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }
    ];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('2.1) Quando produto é cadastrado e bate com o id', () => {
    it('2.1.1) um objeto é retornado', async () => {
      const response = await ProductModel.findById(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('2.1.2) tal objeto possui "id", "name" e "quantity" do produto captado', async () => {
      const response = await ProductModel.findById(payloadProduct);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('3m) Cadastra novo produto no BD', () => {
  const payloadProduct = { name: "Novo Produto", quantity: 23 }

  before(async () => {
    const execute = [{ id: 1, name: "Novo Produto", quantity: 23 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('3.1) quando é inserido com sucesso', () => {
    it('3.1.1) retorna um objeto', async () => {
      const response = await ProductModel.create(payloadProduct);
      expect(response).to.be.a('object');
    });

    it('3.1.2) tal objeto possui "id", "name" e "quantity" do novo produto inserido', async () => {
      const response = await ProductModel.create(payloadProduct);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('4m) Atualiza produto do BD', () => {
  describe('4.1) quando é atualizado com sucesso', () => {
    const productId = 1;
    const payloadProduct = { name: "Iphone X", quantity: 23 }

    before(async () => {
      const execute = [{ id: 1, name: "Iphone X", quantity: 23 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('4.1.1) retorna um objeto', async () => {
      const response = await ProductModel.update(productId, payloadProduct);
      expect(response).to.be.a('object');
    });

    it('4.1.2) tal objeto possui "id", "name" e "quantity" do produto recém-atualizado', async () => {
      const response = await ProductModel.update(productId, payloadProduct);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('5m) Remove produto do BD', () => {
  describe('5.1) quando é removido com sucesso', () => {
    const productId = 1;

    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('5.1.1) retorna undefined', async () => {
      const response = await ProductModel.remove(productId);
      expect(response).to.be.equal(undefined);
    });
  });
});