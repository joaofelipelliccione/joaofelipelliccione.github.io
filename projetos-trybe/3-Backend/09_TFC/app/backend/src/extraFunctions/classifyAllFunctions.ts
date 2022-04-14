import { IMatch } from '../interfaces/matchesInterfaces';
import { IClassification } from '../interfaces/leaderBoardInterfaces';

const tied = (matchData: IMatch, currClassif: IClassification[]) => currClassif.forEach((club) => {
  const prevData = club;

  if (club.name === matchData.teamHome.teamName) {
    prevData.totalPoints += 1;
    prevData.totalGames += 1;
    prevData.totalDraws += 1;
    prevData.goalsFavor += matchData.homeTeamGoals;
    prevData.goalsOwn += matchData.awayTeamGoals;
    prevData.goalsBalance += matchData.homeTeamGoals - matchData.awayTeamGoals;
    prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
  } if (club.name === matchData.teamAway.teamName) {
    prevData.totalPoints += 1;
    prevData.totalGames += 1;
    prevData.totalDraws += 1;
    prevData.goalsFavor += matchData.awayTeamGoals;
    prevData.goalsOwn += matchData.homeTeamGoals;
    prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
    prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
  }
});

const homeWon = (matchData: IMatch, currClassif: IClassification[]) => currClassif
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
    } if (club.name === matchData.teamAway.teamName) {
      prevData.totalGames += 1;
      prevData.totalLosses += 1;
      prevData.goalsFavor += matchData.awayTeamGoals;
      prevData.goalsOwn += matchData.homeTeamGoals;
      prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

const awayWon = (matchData: IMatch, currClassif: IClassification[]) => currClassif
  .forEach((club) => {
    const prevData = club;

    if (club.name === matchData.teamHome.teamName) {
      prevData.totalGames += 1;
      prevData.totalLosses += 1;
      prevData.goalsFavor += matchData.homeTeamGoals;
      prevData.goalsOwn += matchData.awayTeamGoals;
      prevData.goalsBalance += matchData.homeTeamGoals - matchData.awayTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    } if (club.name === matchData.teamAway.teamName) {
      prevData.totalPoints += 3;
      prevData.totalGames += 1;
      prevData.totalVictories += 1;
      prevData.goalsFavor += matchData.awayTeamGoals;
      prevData.goalsOwn += matchData.homeTeamGoals;
      prevData.goalsBalance += matchData.awayTeamGoals - matchData.homeTeamGoals;
      prevData.efficiency = +((prevData.totalPoints / (prevData.totalGames * 3)) * 100).toFixed(2);
    }
  });

export {
  tied,
  homeWon,
  awayWon,
};
