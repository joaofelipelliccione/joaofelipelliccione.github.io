import { IMatch } from '../interfaces/matchesInterfaces';
import { IClassification } from '../interfaces/leaderBoardInterfaces';

const tiedAway = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamAway.teamName) {
      prevData.totalPoints += 1;
      prevData.totalGames += 1;
      prevData.totalDraws += 1;
      prevData.goalsFavor += matchData.awayTeamGoals;
      prevData.goalsOwn += matchData.homeTeamGoals;
      prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

const wonAway = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamAway.teamName) {
      prevData.totalPoints += 3;
      prevData.totalGames += 1;
      prevData.totalVictories += 1;
      prevData.goalsFavor += matchData.awayTeamGoals;
      prevData.goalsOwn += matchData.homeTeamGoals;
      prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

const lostAway = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamAway.teamName) {
      prevData.totalGames += 1;
      prevData.totalLosses += 1;
      prevData.goalsFavor += matchData.awayTeamGoals;
      prevData.goalsOwn += matchData.homeTeamGoals;
      prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

export {
  tiedAway,
  wonAway,
  lostAway,
};
