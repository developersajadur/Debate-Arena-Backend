import express from 'express';
import { leaderboardController } from './leaderboard.controller';

const router = express.Router();


router.get('/leaderboard', leaderboardController.getLeaderboard);

export const leaderboardRoutes = router;
