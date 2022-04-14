import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRoutes = Router();

leaderBoardRoutes.get('/', LeaderBoardController.classifyAll);
leaderBoardRoutes.get('/home', LeaderBoardController.classifyThoseFromHome);
leaderBoardRoutes.get('/away', LeaderBoardController.classifyThoseFromAway);

export default leaderBoardRoutes;
