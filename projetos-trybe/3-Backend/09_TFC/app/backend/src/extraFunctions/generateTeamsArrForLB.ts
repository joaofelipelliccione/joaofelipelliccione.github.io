import TeamsModel from '../database/models/TeamsModel';
import { IClassification } from '../interfaces/leaderBoardInterfaces';

export default (allTeams: TeamsModel[]) => {
  const classificationArr: IClassification[] = [];

  allTeams.forEach((club) => classificationArr.push({
    name: club.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 100,
  }));

  return classificationArr;
};
