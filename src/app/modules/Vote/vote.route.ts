import express from 'express';
import { voteController } from './vote.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { voteValidationSchema } from './vote.validation';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/cast-vote',
  auth(USER_ROLE.USER),
  validateRequest(voteValidationSchema.castVoteZodSchema),
  voteController.castVote
);

export const voteRoutes = router;
