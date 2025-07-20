import express from 'express';
import { debateController } from './debate.controller';
import validateRequest from '../../middlewares/validateRequest';
import { debateValidationSchema } from './debate.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { participantValidationSchema } from '../Participant/participant.validation';

const router = express.Router();

router.post(
  '/create',
  auth(USER_ROLE.USER),
  validateRequest(debateValidationSchema.createDebateZodValidation),
  debateController.createDebate
);

router.post(
  '/join',
  auth(USER_ROLE.USER),
  validateRequest(participantValidationSchema.createParticipantZodValidation),
  debateController.joinDebate
);

router.get(
  '/',
  // auth(USER_ROLE.USER),
  debateController.getAllDebatesByQuery
);

export const debateRoutes = router;
