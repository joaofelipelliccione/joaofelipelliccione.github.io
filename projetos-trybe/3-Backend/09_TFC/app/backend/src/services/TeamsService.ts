import TeamsModel from '../database/models/TeamsModel';

const findAll = async (): Promise<TeamsModel[]> => {
  const allTeams = await TeamsModel.findAll();
  return allTeams;
};

const findByPk = async (teamId: number): Promise<TeamsModel | null> => {
  const team = await TeamsModel.findByPk(teamId);

  if (team === null) return null;

  return team;
};

export default {
  findAll,
  findByPk,
};
