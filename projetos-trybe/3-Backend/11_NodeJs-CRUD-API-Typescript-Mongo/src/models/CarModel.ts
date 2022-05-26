import { Document, Schema, model as createModel } from 'mongoose';
import { Car as ICar } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

/*
- A interface abaixo deve ser criada pois, todo schema, deve apresentar um tipo que respeite
não só o tipo do model a ser criado, como também do Document oriundo do mongoose.
*/
interface CarDocument extends ICar, Document {}

/* Estrutura de cada documento contido na coleção Cars, do banco CarShop. */
const carSchema = new Schema<CarDocument>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
  },
  { versionKey: false }, // Tira a chave "__v" de cada documento.
);

class CarModel extends MongoModel<ICar> { // Instanciando a classe CarModel, a partir da classe abstrata MongoModel.
  constructor(public model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;