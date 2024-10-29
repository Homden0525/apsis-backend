import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

router.post('/teams', LeaderboardController.createTeam);
router.post('/teams/:teamId/counters/:counterId', LeaderboardController.createCounter);
router.post('/teams/:teamId/counters/:counterId/increment', LeaderboardController.incrementCounter);
router.get('/teams/:teamId/steps', LeaderboardController.getTeamSteps);

router.get('/teams', LeaderboardController.listTeams);
router.get('/teams/:teamId/counters', LeaderboardController.listTeamCounters);
router.delete('/teams/:teamId', LeaderboardController.deleteTeam);
router.delete('/teams/:teamId/counters/:counterId', LeaderboardController.deleteCounter);

export default router;
