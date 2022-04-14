import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../enum/StatusCodes';
import LeaderBoardService from '../services/LeaderBoardService';

const classifyAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const currentClassification = await LeaderBoardService.classifyAll();
    await LeaderBoardService.classifyThoseFromHome();
    await LeaderBoardService.classifyThoseFromAway();

    return res.status(StatusCodes.OK).json(currentClassification);
  } catch (e) {
    next(e);
  }
};

const classifyThoseFromHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const currentClassification = await LeaderBoardService.classifyThoseFromHome();
    await LeaderBoardService.classifyAll();
    await LeaderBoardService.classifyThoseFromAway();

    return res.status(StatusCodes.OK).json(currentClassification);
  } catch (e) {
    next(e);
  }
};

const classifyThoseFromAway = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const currentClassification = await LeaderBoardService.classifyThoseFromAway();
    await LeaderBoardService.classifyAll();
    await LeaderBoardService.classifyThoseFromHome();

    return res.status(StatusCodes.OK).json(currentClassification);
  } catch (e) {
    next(e);
  }
};

export default {
  classifyAll,
  classifyThoseFromHome,
  classifyThoseFromAway,
};
