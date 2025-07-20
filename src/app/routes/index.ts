import { Router } from 'express';
import { userRoutes } from '../modules/User/user.route';
import { authRoute } from '../modules/Auth/auth.route';
import { participantRoutes } from '../modules/Participant/participant.route';
import { debateRoutes } from '../modules/Debate/debate.route';
import { argumentRoutes } from '../modules/Argument/argument.route';
import { voteRoutes } from '../modules/Vote/vote.route';
import { leaderboardRoutes } from '../modules/Leaderboard/leaderboard.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/participants',
    route: participantRoutes,
  },
  {
    path: '/debates',
    route: debateRoutes,
  },
  {
    path: '/arguments',
    route: argumentRoutes,
  },
  {
    path: '/votes',
    route: voteRoutes,
  },
  {
    path: '/',
    route: leaderboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
