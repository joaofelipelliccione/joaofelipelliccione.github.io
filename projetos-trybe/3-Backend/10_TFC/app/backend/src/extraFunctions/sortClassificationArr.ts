import { IClassification } from '../interfaces/leaderBoardInterfaces';

export default (classificationArr: IClassification[]) =>
  classificationArr.sort((TeamA, TeamB) => { // Compare Function: return < 0 --> [a, b] || return > 0 --> [b, a] || href: https://www.w3schools.com/js/js_array_sort.asp
    if (TeamA.totalPoints < TeamB.totalPoints) return 1; // return 1 --> return > 0 --> TeamB vai para uma posição acima de TeamA.
    if (TeamA.totalPoints > TeamB.totalPoints) return -1; // return -1 --> return < 0 --> TeamA vai para uma posição acima de TeamB.
    if (TeamA.totalVictories < TeamB.totalVictories) return 1;
    if (TeamA.totalVictories > TeamB.totalVictories) return -1;
    if (TeamA.goalsBalance < TeamB.goalsBalance) return 1;
    if (TeamA.goalsBalance > TeamB.goalsBalance) return -1;
    if (TeamA.goalsFavor < TeamB.goalsFavor) return 1;
    if (TeamA.goalsFavor > TeamB.goalsFavor) return -1;
    if (TeamA.goalsOwn < TeamB.goalsOwn) return 1;
    if (TeamA.goalsOwn > TeamB.goalsOwn) return -1;
    return 0; // "If the result is 0 no changes are done with the sort order of the two values."
  });
