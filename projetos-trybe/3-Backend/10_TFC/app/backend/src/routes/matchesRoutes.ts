import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import verifyToken from '../auth/verifyToken';

const matchesRoutes = Router();

matchesRoutes.get(
  '/',
  MatchesController.findAll,
);

matchesRoutes.post(
  '/',
  verifyToken,
  MatchesController.create,
);

matchesRoutes.patch(
  '/:id',
  MatchesController.updateInProgressMatchScore,
);

matchesRoutes.patch(
  '/:id/finish',
  MatchesController.updateInProgressStatus,
);

export default matchesRoutes;
