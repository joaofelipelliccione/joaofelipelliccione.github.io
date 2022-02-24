const sinon = require('sinon');
const { expect } = require('chai');

const ProductModel = require('../../../models/ProductModel');
const ProductService = require('../../../services/ProductService');

describe('1s) Lista produtos cadastrados', () => {

  describe('1.1) Quando são listados com sucesso', () => {
    before(async () => {
      const execute = [
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
      ];
  
      sinon.stub(ProductModel, 'findAll').resolves(execute);
    });
  
    after(async () => {
      ProductModel.findAll.restore();
    });

    it('1.1.1) um array é retornado', async () => {
      const response = await ProductService.findAll();
      expect(response).to.be.an('array');
    });

    it('1.1.2) tal array possui, pelo menos, um objeto. Esse último, deve apresentar as chaves "id", "name" e "quantity"', async () => {
      const response = await ProductService.findAll();
      expect(response[0]).to.deep.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('2s) Lista produto cadastrado, que bate com determinado id', () => {
  const payloadProduct = 1;

  describe('2.1) Quando produto é cadastrado e bate com o id', () => {
    before(async () => {
      const execute = [
        {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10
        }
      ];
  
      sinon.stub(ProductModel, 'findById').resolves(execute);
    });
  
    after(async () => {
      ProductModel.findById.restore();
    });

    it('2.1.1) um objeto é retornado', async () => {
      const response = await ProductService.findById(payloadProduct);
      expect(response).to.be.an('object');
    });

    it('2.1.2) tal objeto possui "id", "name" e "quantity" do produto captado', async () => {
      const response = await ProductService.findById(payloadProduct);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('3s) Cadastra novo produto no BD', () => {
  const payloadProduct = { name: "Novo Produto", quantity: 23 }

  describe('3.1) quando é inserido com sucesso', () => {
    before(async () => {
      const execute = { id: 1, name: "Novo Produto", quantity: 23 };
      sinon.stub(ProductModel, 'findByName').resolves([]);
      sinon.stub(ProductModel, 'create').resolves(execute);
    });

    after(async () => {
      ProductModel.findByName.restore();
      ProductModel.create.restore();
    });

    it('3.1.1) retorna um objeto com "id", "name" e "quantity"', async () => {
      const response = await ProductService.create(payloadProduct);
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('4s) Atualiza produto do BD', () => {
  const productId = 1;
  const payloadProduct = { name: "Iphone X", quantity: 23 }

  describe('4.1) quando é atualizado com sucesso', () => {
    before(async () => {
      const executeBeforeUpdate = { id: 1, name: "Produto a ser atualizado", quantity: 23 };
      const executeAfterUpdate = { id: 1, name: "Iphone X", quantity: 23 };
      sinon.stub(ProductModel, 'findById').resolves(executeBeforeUpdate);
      sinon.stub(ProductModel, 'update').resolves(executeAfterUpdate);
    });
  
    after(async () => {
      ProductModel.findById.restore();
      ProductModel.update.restore();
    });

    it('4.1.1) retorna um objeto', async () => {
      const response = await ProductService.update(productId, payloadProduct);
      expect(response).to.be.a('object');
    });

    it('4.1.2) tal objeto possui "id", "name" e "quantity" do produto recém-atualizado', async () => {
      const response = await ProductService.update(productId, payloadProduct);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });
  });
});

describe('5s) Remove produto do BD', () => {
  const productId = 1;

  describe('5.1) quando é removido com sucesso', () => {
    const firstExecute = ['Preenchimento'];
    const secondExecute = { code: 204 };
    before(async () => {
      sinon.stub(ProductModel, 'findById').resolves(firstExecute);
      sinon.stub(ProductModel, 'remove').resolves(secondExecute);
    });

    after(async () => {
      ProductModel.findById.restore();
      ProductModel.remove.restore();
    });

    it('5.1.1) retorna um objeto com "code"', async () => {
      const response = await ProductService.remove(productId);
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('code');
    });
  });
});