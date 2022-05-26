import { Router } from 'express';
import CarController from '../controllers/CarController';

const carController = new CarController(); // Instancia um novo objeto a partir da classe controller, possibilitando a utilização de seus respectivos métodos.
const carsRoutes = Router();

carsRoutes.post('/', carController.create);
carsRoutes.get('/', carController.read);
carsRoutes.get('/:id', carController.readOne);
carsRoutes.put('/:id', carController.update);
carsRoutes.delete('/:id', carController.delete);

export default carsRoutes;