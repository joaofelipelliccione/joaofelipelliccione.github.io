import { Model as M, Document } from 'mongoose';
import { Model as IModel } from '../interfaces/ModelInterface';

/*
- É importante pontuar que os métodos declarados na classe abstrata "pai" poderão ser sobrescritos no escopo das classes "filhas".
- Ao criar o MongoModel, não há mais necessidades de criar métodos CRUD para cada coleção, tendo em vista que todos os models serão oriundos desse.
*/
abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: M<T & Document>) { } // O "protected", permite a alteração de um método dentro de uma classe filha da classe abstrata MongoModel.

  create = async (obj: T): Promise<T> => this.model.create({ ...obj });

  read = async (): Promise<T[]> => this.model.find();

  readOne = async (id: string): Promise<T | null> =>
    this.model.findOne({ _id: id });

  update = async (id: string, obj: T): Promise<T | null> =>
    this.model.findByIdAndUpdate({ _id: id }, { ...obj }, { new: false });
  
  delete = async (id: string): Promise<T | null> =>
    this.model.findOneAndDelete({ _id: id });
}

export default MongoModel;