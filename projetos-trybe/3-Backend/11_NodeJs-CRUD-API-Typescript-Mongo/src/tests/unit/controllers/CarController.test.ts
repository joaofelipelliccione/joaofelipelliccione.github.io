import {
  newCarBodyMock,
  newCarFromMongoMock,
  allCarsFromMongoMock,
  updatedCarFromMongoMock,
  updatedCarBodyMock,
  carFromMongoMock, } from '../mocks/carMocks'
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import server from '../../../server';
import CarModel from '../../../models/CarModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car Controller Tests:', () => {
  const app = server.getApp();

  let carModel = new CarModel();

  describe('1) Rota POST /cars:', () => {
    describe('1.1) CREATE new car,', () => {
      describe('1.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carModel.model, 'create').resolves(newCarFromMongoMock);
        });

        after(() => {
          sinon.restore();
        });

        it('1.1.1.1) retorna um objeto com as informações do carro cadastrado.', async () => {
          const response = await chai
            .request(app)
            .post('/cars')
            .send(newCarBodyMock);
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(newCarFromMongoMock);
        });
      });
    });
  });

  describe('2) Rota GET /cars:', () => {
    describe('2.1) READ all cars,', () => {
      describe('2.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carModel.model, 'find').resolves(allCarsFromMongoMock as any[]);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna um array com objetos referentes à cada carro cadastrado no banco.', async () => {
          const response = await chai.request(app).get('/cars');
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('array');
          expect(response.body).to.deep.equal(allCarsFromMongoMock);
        });
      });
    });
  });

  describe('3) Rota PUT /cars/id:', () => {
    describe('3.1) UPDATE car,', () => {
      describe('3.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carModel.model, 'findByIdAndUpdate')
          .resolves(updatedCarFromMongoMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna um objeto com as informações do carro recém atualizado.', async () => {
          const response = await chai.request(app)
          .put('/cars/628f68924da4df2926b55e05')
          .send(updatedCarBodyMock);
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          expect(response.body).to.deep.equal(updatedCarFromMongoMock);
        });
      });
    });
  });

  describe('4) Rota DELETE /cars/id:', () => {
    describe('3.1) DELETE car,', () => {
      describe('4.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carModel.model, 'findOneAndDelete').resolves(carFromMongoMock as any);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna o status-code 204, sem body.', async () => {
          const response = await chai.request(app)
          .delete('/cars/628f68924da4df2926b55e05');
          expect(response).to.have.status(204);
          expect(response.body).to.deep.equal({});
        });
      });
    });
  });
});