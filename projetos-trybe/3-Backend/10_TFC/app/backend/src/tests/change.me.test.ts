import * as sinon from 'sinon'; // Fornece o stub, responsável pela simulação dos retornos (de sucesso e/ou falha).
import * as chai from 'chai'; // Necessário para construção de asserções.
import chaiHttp = require('chai-http'); // Permite a realização de requisições p/ uma determinada API, durante os testes

import { app } from '../app';

import UsersModels from '../database/models/UsersModel';
import { mockUsersArr } from './mocks/users';

import TeamsModel from '../database/models/TeamsModel';
import { mockTeams } from './mocks/teams';

import MatchesModel from '../database/models/MatchesModel';
import { mockMatches, mockMatchesInProgress, mockMatchesStopped } from './mocks/matches';
import { IMatch } from '../interfaces/matchesInterfaces';

import LeaderBoardService from '../services/LeaderBoardService';
import { mockGeneralClassification, mockHomeClassification, mockAwayClassification } from './mocks/leaderboard';
import { IClassification } from '../interfaces/leaderBoardInterfaces';

import { Response } from 'superagent'; // Tipo que a response oriunda do Chai HTTP deverá apresentar.

chai.use(chaiHttp);

const { expect } = chai;

describe('1) Login Routes:', () => {
  let chaiHttpResponse: Response;

  before(async () => { // Antes de cada it() ou describe(), realizado dentro do respectivo describe(), o retorno de UsersModels.findOne() passa a ser fixo e previsível.
    sinon.stub(UsersModels, 'findOne').resolves(mockUsersArr[0] as UsersModels);
  });

  after(() => { // Após de cada it() ou describe(), realizado dentro do respectivo describe(), o retorno de UsersModels.findOne() volta a ser variável e não previsível.
    (UsersModels.findOne as sinon.SinonStub).restore();
  });

  describe('1.1) Método POST para /login:', () => {
    it("1.1.1) Gera a mensagem de erro 'All fields must be filled', quando o campo 'email' não for informado.", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'password',
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it("1.1.2) Gera a mensagem de erro 'All fields must be filled', quando o campo 'password' não for informado.", async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'usuario@dominio.com.br'
      });

      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('1.1.3) Falha no login devido à email com formato inválido.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: mockUsersArr[1].email, // Endereço de e-mail com formato incorreto.
        password: 'secret_user', // Senha correta, sem encriptação.
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.4) Falha no login devido à senha com formato inválido.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: mockUsersArr[0].email, // Endereço de e-mail correto, cadastrado no banco.
        password: mockUsersArr[1].password, // Senha com formato incorreto.
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.5) Falha no login devido à email não cadastrado no banco.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'usuario@dominio.com.br',
        password: 'password'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.6) Falha no login devido à senha incorreta.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: mockUsersArr[0].email, // Endereço de e-mail correto, cadastrado no banco.
        password: 'senhaIncorreta'
      });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });

    it('1.1.7) Login realizado com sucesso.', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: mockUsersArr[0].email, // Endereço de e-mail correto, cadastrado no banco.
        password: 'secret_user', // Senha correta, sem encriptação.
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.be.keys('id', 'username', 'role', 'email');
      expect(chaiHttpResponse.body.token).to.be.string;
    });
  });

  describe('1.2) Método GET para /login/validate:', () => {
    it('1.2.1) Falha devido à token não informado.', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .send();

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Token not found');
    });

    it('1.2.2) Falha devido à token inválido.', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set({ authorization: 't0k3nInv4l1d' });

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.error).to.be.equal('Invalid token');
    });
  });
});

describe('2) Teams Routes:', () => {
  let chaiHttpResponse: Response;

  describe('2.1) Regular Find All Teams:', () => {
    before(async () => {
      sinon.stub(TeamsModel, 'findAll').resolves(mockTeams as TeamsModel[]);
    });
  
    after(() => {
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('2.1.1) Retorna uma lista com todos os times.', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.be.keys('id', 'teamName');
      expect(chaiHttpResponse.body[1]).to.be.keys('id', 'teamName');
      expect(chaiHttpResponse.body[2]).to.be.keys('id', 'teamName');
    });
  });

  describe('2.2) FindByPk Team:', () => {
    before(async () => {
      sinon.stub(TeamsModel, 'findByPk').resolves(mockTeams[0] as TeamsModel); // Retorna o time de id igual à 1.
    });
  
    after(() => {
      (TeamsModel.findByPk as sinon.SinonStub).restore();
    });

    it('2.2.1) Retorna uma único time, cuja id foi passada como parâmetro de rota.', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.keys('id', 'teamName');
      expect(chaiHttpResponse.body.id).to.be.equal(1);
    });
  });
});

describe('3) Matches Routes:', () => {
  let chaiHttpResponse: Response;

  describe('3.1) Regular Find All Matches:', () => {
    before(async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(mockMatches as IMatch[]);
    });
  
    after(() => {
      (MatchesModel.findAll as sinon.SinonStub).restore();
    });

    it('3.1.1) Retorna uma lista com todas as partidas, em progresso e paradas.', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.be.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      expect(chaiHttpResponse.body[0].inProgress).to.be.equal(0);
      expect(chaiHttpResponse.body[1].inProgress).to.be.equal(1);
      expect(chaiHttpResponse.body[0].teamHome).to.be.keys('teamName');
      expect(chaiHttpResponse.body[0].teamAway).to.be.keys('teamName');
    });
  });

  describe('3.2) Find All Matches Lazy Loading:', () => {
    it('3.2.1) Retorna uma lista com todas as partidas em progresso, ao passar a query string "?inProgress=true".', async () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesInProgress as IMatch[]);
      });
    
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.be.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      expect(chaiHttpResponse.body[0].inProgress).to.be.equal(1);
      expect(chaiHttpResponse.body[1].inProgress).to.be.equal(1);
      expect(chaiHttpResponse.body[0].teamHome).to.be.keys('teamName');
      expect(chaiHttpResponse.body[0].teamAway).to.be.keys('teamName');
    });

    it('3.2.2) Retorna uma lista com todas as partidas paradas, ao passar a query string "?inProgress=false".', async () => {
      before(async () => {
        sinon.stub(MatchesModel, 'findAll').resolves(mockMatchesStopped as IMatch[]);
      });
    
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[0]).to.be.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      expect(chaiHttpResponse.body[0].inProgress).to.be.equal(0);
      expect(chaiHttpResponse.body[1].inProgress).to.be.equal(0);
      expect(chaiHttpResponse.body[0].teamHome).to.be.keys('teamName');
      expect(chaiHttpResponse.body[0].teamAway).to.be.keys('teamName');
    });
  });
});

describe('4) Leaderboard Routes:', () => {
  let chaiHttpResponse: Response;

  describe('4.1) Get General Classification:', () => {
    before(async () => {
      sinon.stub(LeaderBoardService, 'classifyAll').resolves(mockGeneralClassification as IClassification[]);
    });
  
    after(() => {
      (LeaderBoardService.classifyAll as sinon.SinonStub).restore();
    });

    it('4.1.1) Retorna a classificação geral do torneio.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency');
    });
  });

  describe('4.2) Get Classification (Home Perspective) :', () => {
    before(async () => {
      sinon.stub(LeaderBoardService, 'classifyThoseFromHome').resolves(mockHomeClassification as IClassification[]);
    });
  
    after(() => {
      (LeaderBoardService.classifyThoseFromHome as sinon.SinonStub).restore();
    });

    it('4.2.1) Retorna a classificação do torneio, apenas considerando pontos obtidos em casa.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency');
    });
  });

  describe('4.3) Get Classification (Away Perspective) :', () => {
    before(async () => {
      sinon.stub(LeaderBoardService, 'classifyThoseFromAway').resolves(mockAwayClassification as IClassification[]);
    });
  
    after(() => {
      (LeaderBoardService.classifyThoseFromAway as sinon.SinonStub).restore();
    });

    it('4.3.1) Retorna a classificação do torneio, apenas considerando pontos obtidos fora de casa.', async () => {
      chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body[1]).to.be.keys('name', 'totalPoints', 'totalGames', 'totalVictories', 'totalDraws', 'totalLosses', 'goalsFavor', 'goalsFavor', 'goalsBalance', 'efficiency');
    });
  });

});