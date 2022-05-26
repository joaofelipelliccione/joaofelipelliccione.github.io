import {
  newCarBodyMock,
  newCarFromMongoMock,
  allCarsFromMongoMock,
  updatedCarFromMongoMock,
  updatedCarBodyMock, } from '../mocks/carMocks'
import { expect } from 'chai';
import * as sinon from 'sinon';
import CarService from '../../../services/CarService';

describe('Car Service Tests:', () => {
  let carService = new CarService();

  describe('1) Rota POST /cars:', () => {
    describe('1.1) CREATE new car,', () => {
      describe('1.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carService.model, 'create').resolves(newCarFromMongoMock);
        });

        after(() => {
          sinon.restore();
        });

        it('1.1.1.1) retorna um objeto com as informações do carro cadastrado.', async () => {
          const newCar = await carService.create(newCarBodyMock);
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
          sinon.stub(carService.model, 'read').resolves(allCarsFromMongoMock as any[]);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna um array com objetos referentes à cada carro cadastrado no banco.', async () => {
          const allCars = await carService.read();
          expect(allCars).to.be.an('array');
          expect(allCars).to.deep.equal(allCarsFromMongoMock);
        });
      });
    });
  });

  describe('3) Rota GET /cars/id:', () => {
    describe('3.1) READ one car,', () => {

      describe('3.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carService.model, 'readOne').resolves(allCarsFromMongoMock[1]);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna um objeto com as informações do carro referente ao respectivo ID.', async () => {
          const car = await carService.readOne('628f5d557fd6e08fc9765e5c');
          expect(car).to.be.an('object');
          expect(car).to.deep.equal(allCarsFromMongoMock[1]);
        });
      });
    });
  });

  describe('4) Rota PUT /cars/id:', () => {
    describe('4.1) UPDATE car,', () => {
      describe('4.1.1) em caso de sucesso,', () => {
        before(async () => {
          sinon.stub(carService.model, 'update').resolves(updatedCarFromMongoMock);
        });

        after(() => {
          sinon.restore();
        });

        it('retorna um objeto com as informações do carro recém atualizado.', async () => {
          const updatedCar = await carService.update('628f68924da4df2926b55e05', updatedCarBodyMock);
          expect(updatedCar).to.be.an('object');
          expect(updatedCar).to.deep.equal(updatedCarFromMongoMock);
        });
      });
    });
  });
});