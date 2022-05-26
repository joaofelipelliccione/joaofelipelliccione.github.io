import carSchema, { Car as ICar } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';
import MongoService, { ServiceError } from './MongoService';

class CarService extends MongoService<ICar> {
  constructor(public model = new CarModel()) {
    super(model);
  }

  create = async (obj: ICar): Promise<ICar | ServiceError> => {
    const parsed = carSchema.safeParse(obj); // É nesse ponto que as validações definidas com ajuda do Zod, no carSchema, são realizadas.
    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.create(obj);
  };

  update = async (
    id: string,
    obj: ICar,
  ): Promise<ICar | null | ServiceError> => {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      return { error: parsed.error };
    }

    return this.model.update(id, obj);
  };
}

export default CarService;

/* OBS:
  - Dentre todos os métodos implementados na classe abstrata MongoService,
  os únicos que precisaram ser reimplementados foram o create() e o update().
  - Isso ocorre pois tais métodos validam regras de negócios
  que não se aplicam aos outros métodos, tendo em vista que esses últimos
  não utilizam informações oriundas do body da requisição.
*/