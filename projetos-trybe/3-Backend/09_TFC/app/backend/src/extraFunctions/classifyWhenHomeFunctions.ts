import { IMatch } from '../interfaces/matchesInterfaces';
import { IClassification } from '../interfaces/leaderBoardInterfaces';

const tiedAtHome = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamHome.teamName) {
      prevData.totalPoints += 1;
      prevData.totalGames += 1;
      prevData.totalDraws += 1;
      prevData.goalsFavor += matchData.homeTeamGoals;
      prevData.goalsOwn += matchData.awayTeamGoals;
      prevData.goalsBalance += matchData.homeTeamGoals - matchData.awayTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

const wonAtHome = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamHome.teamName) {
      prevData.totalPoints += 3;
      prevData.totalGames += 1;
      prevData.totalVictories += 1;
      prevData.goalsFavor += matchData.homeTeamGoals;
      prevData.goalsOwn += matchData.awayTeamGoals;
      prevData.goalsBalance += matchData.homeTeamGoals - matchData.awayTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

const lostAtHome = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamHome.teamName) {
      prevData.totalGames += 1;
      prevData.totalLosses += 1;
      prevData.goalsFavor += matchData.homeTeamGoals;
      prevData.goalsOwn += matchData.awayTeamGoals;
      prevData.goalsBalance += matchData.homeTeamGoals - matchData.awayTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

export {
  tiedAtHome,
  wonAtHome,
  lostAtHome,
};
