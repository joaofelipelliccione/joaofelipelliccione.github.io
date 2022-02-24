const sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../services/ProductService');
const ProductController = require('../../../controllers/ProductController');

describe('1c) Lista produtos cadastrados', () => {

  describe('1.1) Quando são listados com sucesso', () => {
    const req = {};
    const res = {};
  
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
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
  
      sinon.stub(ProductService, 'findAll').resolves(execute);
    });
  
    after(() => {
      ProductService.findAll.restore();
    });

    it('1.1.1) status 200 é retornado', async () => {
      await ProductController.findAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('2c) Lista produto cadastrado, que bate com determinado id', () => {
  const reqParamId = 1;

  describe('2.1) Quando produto é cadastrado e bate com o id', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = reqParamId;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = [{ id: 1, name: "Martelo de Thor", quantity: 10 }];
      sinon.stub(ProductService, 'findById').resolves(execute);
    });

    after(() => {
      ProductService.findById.restore();
    });

    it('2.1.1) Status 200 é retornado', async () => {
      await ProductController.findById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('3c) Cadastra novo produto no BD', () => {
  const payloadProduct = { name: "Novo Produto", quantity: 23 }

  describe('3.1) quando é inserido com sucesso', () => {
    const req = {};
    const res = {};

    before( () => {
      req.body = payloadProduct;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = { id: 1, name: "Novo Produto", quantity: 23 };
      sinon.stub(ProductService, 'create').resolves(execute);
    });

    after(() => {
      ProductService.create.restore();
    });

    it('3.1.1) Status 201 é retornado', async () => {
      await ProductController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('4c) Atualiza produto do BD', () => {
  const payloadProduct = { name: "Iphone X", quantity: 23 }
  const reqParamId = 1;

  describe('4.1) quando é atualizado com sucesso', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = reqParamId;
      req.body = payloadProduct;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      const execute = { id: 1, name: "Iphone X", quantity: 23 };
      sinon.stub(ProductService, 'update').resolves(execute);
    });

    after(() => {
      ProductService.update.restore();
    });

    it('4.1.1) Status 200 é retornado', async () => {
      await ProductController.update(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('5c) Remove produto do BD', () => {
  describe('5.1) Quando o produto é deletado com sucesso', () => {
    const req = {};
    const res = {};

    before(() => {
      req.params = 1;

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      const execute = { code: 204 }
      sinon.stub(ProductService, 'remove').resolves(execute);
    });

    after(() => {
      ProductService.remove.restore();
    });
    
    it('5.1.1) Status 204 é retornado', async () => {
      await ProductController.remove(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
});
