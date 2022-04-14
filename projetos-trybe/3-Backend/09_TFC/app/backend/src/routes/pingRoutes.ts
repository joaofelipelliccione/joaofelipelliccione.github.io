import { Router, NextFunction, Request, Response } from 'express';
import StatusCodes from '../enum/StatusCodes';

const pingRoutes = Router();

pingRoutes.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  res.status(StatusCodes.OK).json({
    message: 'Pong!',
  });
});

export default pingRoutes;
