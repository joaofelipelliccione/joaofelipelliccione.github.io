import { ZodError } from 'zod';
import MongoModel from '../models/MongoModel';

/* Interface utilizada quando defini-se verificações a partir do Zod. */
export interface ServiceError {
  error: ZodError;
}

/*
- Caso seja necessário validar regras de negócio em algum dos métodos (create, read, readOne...),
elas devem ser estruturadas nas classes filhas da classe abstrata MongoService, sobrescrevendo os métodos. 
*/
abstract class MongoService<T> {
  constructor(protected model: MongoModel<T>) { }

  public async create(obj: T): Promise<T | ServiceError> {
    const car = await this.model.create(obj);
    return car;
  }

  public async read(): Promise<T[]> {
    const cars = await this.model.read();
    return cars;
  }

  public async readOne(id: string): Promise<T | null> {
    const car = await this.model.readOne(id);
    return car;
  }

  public async update(id: string, obj: T): Promise<T | null | ServiceError> {
    const car = await this.model.update(id, obj);
    return car;
  }

  public async delete(id: string): Promise<T | null> {
    const car = await this.model.delete(id);
    return car;
  }
}

export default MongoService;