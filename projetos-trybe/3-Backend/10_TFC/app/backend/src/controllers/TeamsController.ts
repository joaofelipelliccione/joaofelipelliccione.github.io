import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../enum/StatusCodes';
import TeamsService from '../services/TeamsService';

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allTeams = await TeamsService.findAll();
    return res.status(StatusCodes.OK).json(allTeams);
  } catch (e) {
    next(e);
  }
};

const findByPk = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const team = await TeamsService.findByPk(Number(id));

    if (team === null) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'team does not exist' });
    }

    return res.status(StatusCodes.OK).json(team);
  } catch (e) {
    next(e);
  }
};

export default {
  findAll,
  findByPk,
};
