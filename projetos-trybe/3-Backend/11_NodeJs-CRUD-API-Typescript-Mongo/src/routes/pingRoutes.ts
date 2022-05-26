import { Router, Request, Response } from 'express';

const pingRoutes = Router();

pingRoutes.get('/', async (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Pong!',
  });
});

export default pingRoutes;