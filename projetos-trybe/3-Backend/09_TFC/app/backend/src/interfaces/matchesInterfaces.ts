import MatchesModel from '../database/models/MatchesModel';

export interface IMatch extends MatchesModel {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface ICreateMatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: number,
}

export interface ICreatedMatch extends ICreateMatch {
  id: number
}

export interface IUpdateScore {
  homeTeamGoals: number,
  awayTeamGoals: number
}
