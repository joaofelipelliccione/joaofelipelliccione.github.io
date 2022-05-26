import { Request, Response } from 'express';
import CarService from '../services/CarService';

const INTERNAL_SERVER_ERROR = 'Internal Server Error';
const ID_24 = 'Id must have 24 hexadecimal characters';
const OBJ_NF = 'Object not found';

class CarController {
  /* Instanciado o objeto carService a partir da classe CarService,
  de forma que seja possível utilizar seus respectivos métodos públicos (Ex: create(), readOne()...). */
  constructor(private carService = new CarService()) {}

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { body } = req;

    try {
      const newCar = await this.carService.create(body);

      if ('error' in newCar) { // Erro oriundo do Zod.
        return res.status(400).json({});
      }
      return res.status(201).json(newCar);
    } catch (e) {
      return res.status(500)
        .json({ error: INTERNAL_SERVER_ERROR });
    }
  };

  public read = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allCars = await this.carService.read();
      return res.status(200).json(allCars);
    } catch (e) {
      return res.status(500)
        .json({ error: INTERNAL_SERVER_ERROR });
    }
  };

  public readOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: ID_24 });
    }
  
    try {
      const car = await this.carService.readOne(id);

      if (car === null) {
        return res.status(404).json({ error: OBJ_NF });
      }
      return res.status(200).json(car);
    } catch (e) {
      return res.status(500)
        .json({ error: INTERNAL_SERVER_ERROR });
    }
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const { params: { id }, body } = req;

    if (Object.keys(body).length === 0) return res.status(400).json({});
    if (id.length < 24) {
      return res.status(400).json({ error: ID_24 });
    }
  
    try {
      const formerCar = await this.carService.update(id, body);

      return formerCar ? res.status(200).json({ id, ...body })
        : res.status(404).json({ error: OBJ_NF });
    } catch (err) {
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (id.length < 24) {
      return res.status(400).json({ error: ID_24 });
    }
  
    try {
      const deletedCar = await this.carService.delete(id);

      return deletedCar
        ? res.status(204).json({})
        : res.status(404).json({ error: OBJ_NF });
    } catch (error) {
      return res.status(500)
        .json({ error: INTERNAL_SERVER_ERROR });
    }
  };
}

export default CarController;