import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRoutes = Router();

teamsRoutes.get(
  '/',
  TeamsController.findAll,
);

teamsRoutes.get(
  '/:id',
  TeamsController.findByPk,
);

export default teamsRoutes;
