import {
  newCarBodyMock,
  newCarFromMongoMock,
  allCarsFromMongoMock, } from '../mocks/carMocks'
import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';

describe('Car Model Tests:', () => {
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
          const newCar = await carModel.create(newCarBodyMock);
          expect(newCar).to.be.an('object');
          expect(newCar).to.deep.equal(newCarFromMongoMock);
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
          const cars = await carModel.read();
          expect(cars).to.be.an('array');
          expect(cars).to.deep.equal(allCarsFromMongoMock);
        });
      });
    });
  });
});