import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../enum/StatusCodes';
import MatchesService from '../services/MatchesService';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.query.inProgress !== undefined) {
      const allMatches = await MatchesService.findAllByQuery(String(req.query.inProgress));
      return res.status(StatusCodes.OK).json(allMatches);
    }

    const allMatches = await MatchesService.findAll();
    return res.status(StatusCodes.OK).json(allMatches);
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  try {
    const newMatch = await MatchesService
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    if (newMatch === 'teamsAreEqual') {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (newMatch === 'teamNotFound') {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no team with such id!' });
    }

    return res.status(StatusCodes.OK).json(newMatch);
  } catch (e) {
    next(e);
  }
};

const updateInProgressStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await MatchesService.updateInProgressStatus(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Thats all folks!' });
  } catch (e) {
    next(e);
  }
};

const updateInProgressMatchScore = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  try {
    await MatchesService.updateInProgressMatchScore(Number(id), { homeTeamGoals, awayTeamGoals });
    return res
      .status(StatusCodes.OK)
      .json({ scoreboard: {
        matchId: Number(id),
        homeTeam: homeTeamGoals,
        awayTeam: awayTeamGoals },
      });
  } catch (e) {
    next(e);
  }
};

export default {
  findAll,
  create,
  updateInProgressStatus,
  updateInProgressMatchScore,
};
