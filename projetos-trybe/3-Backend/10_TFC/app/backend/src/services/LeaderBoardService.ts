import MatchesService from './MatchesService';
import { IMatch } from '../interfaces/matchesInterfaces';
import TeamsService from './TeamsService';

import generateTeamsArrForLB from '../extraFunctions/generateTeamsArrForLB';
import sortClassificationArr from '../extraFunctions/sortClassificationArr';

import classifyAllFunctions = require('../extraFunctions/classifyAllFunctions');
import classifyWhenHomeFunctions = require('../extraFunctions/classifyWhenHomeFunctions');
import classifyWhenAwayFunctions = require('../extraFunctions/classifyWhenAwayFunctions');

const classifyAll = async () => {
  const allTeams = await TeamsService.findAll();
  const allFinishedMatches = await MatchesService.findAllByQuery('false');
  const classificationArr = generateTeamsArrForLB(allTeams);

  allFinishedMatches.forEach((match: IMatch) => {
    const matchResult = match.homeTeamGoals - match.awayTeamGoals;

    if (matchResult === 0) return classifyAllFunctions.tied(match, classificationArr);
    if (matchResult > 0) return classifyAllFunctions.homeWon(match, classificationArr);

    return classifyAllFunctions.awayWon(match, classificationArr);
  });

  return sortClassificationArr(classificationArr);
};

const classifyThoseFromHome = async () => { // Olhando pela perspectiva do time da casa...
  const allTeams = await TeamsService.findAll();
  const allFinishedMatches = await MatchesService.findAllByQuery('false');
  const classificationArr = generateTeamsArrForLB(allTeams);

  allFinishedMatches.forEach((match: IMatch) => {
    const matchResult = match.homeTeamGoals - match.awayTeamGoals;

    if (matchResult === 0) return classifyWhenHomeFunctions.tiedAtHome(match, classificationArr); // ...empatando em casa.
    if (matchResult > 0) return classifyWhenHomeFunctions.wonAtHome(match, classificationArr); // ...ganhando em casa.

    return classifyWhenHomeFunctions.lostAtHome(match, classificationArr); // ...perdendo em casa.
  });

  return sortClassificationArr(classificationArr);
};

const classifyThoseFromAway = async () => { // Olhando pela perspectiva de um time jogando fora e...
  const allTeams = await TeamsService.findAll();
  const allFinishedMatches = await MatchesService.findAllByQuery('false');
  const classificationArr = generateTeamsArrForLB(allTeams);

  allFinishedMatches.forEach((match: IMatch) => {
    const matchResult = match.homeTeamGoals - match.awayTeamGoals;

    if (matchResult === 0) return classifyWhenAwayFunctions.tiedAway(match, classificationArr); // ...empatando fora de casa.
    if (matchResult > 0) return classifyWhenAwayFunctions.lostAway(match, classificationArr); // ...perdendo fora de casa.

    return classifyWhenAwayFunctions.wonAway(match, classificationArr); // ...ganhando fora de casa.
  });

  return sortClassificationArr(classificationArr);
};

export default {
  classifyAll,
  classifyThoseFromHome,
  classifyThoseFromAway,
};
