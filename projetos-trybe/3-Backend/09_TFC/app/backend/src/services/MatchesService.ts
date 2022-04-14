import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import TeamsService from './TeamsService';
import { IMatch, ICreateMatch, ICreatedMatch, IUpdateScore } from '../interfaces/matchesInterfaces';

const findAll = async (): Promise<IMatch[]> => {
  const allMatches = await MatchesModel.findAll({
    include: [
      {
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ],
  });

  return allMatches as IMatch[];
};

const findAllByQuery = async (stillInProgress: string): Promise<IMatch[]> => { // Lazy Loading
  const allMatchesInProgress = await MatchesModel.findAll({
    where: { inProgress: stillInProgress === 'true' ? 1 : 0 },
    include: [
      { model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      },
    ] });
  return allMatchesInProgress as IMatch[];
};

const create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }
: ICreateMatch): Promise<ICreatedMatch | string> => {
  if (homeTeam === awayTeam) {
    return 'teamsAreEqual';
  }

  if (await TeamsService.findByPk(homeTeam) === null
  || await TeamsService.findByPk(awayTeam) === null) {
    return 'teamNotFound';
  }

  const newMatch = await MatchesModel
    .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

  return {
    id: Number(newMatch.id),
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  };
};

const updateInProgressStatus = async (matchId: number) => {
  await MatchesModel.update(
    { inProgress: 0 },
    { where: { id: matchId } },
  );
};

const updateInProgressMatchScore = async (matchId: number, { homeTeamGoals, awayTeamGoals }
: IUpdateScore) => {
  await MatchesModel.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id: matchId } },
  );
};

export default {
  findAll,
  findAllByQuery,
  create,
  updateInProgressStatus,
  updateInProgressMatchScore,
};
