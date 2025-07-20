import express from 'express';
import { argumentController } from './argument.controller';
import validateRequest from '../../middlewares/validateRequest';
import { argumentValidationSchema } from './argument.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/post',
  auth(USER_ROLE.USER),
  validateRequest(argumentValidationSchema.createArgumentZodValidation),
  argumentController.postArgument,
);

router.patch(
  '/edit/:id',
  auth(USER_ROLE.USER),
  validateRequest(argumentValidationSchema.updateArgumentZodValidation),
  argumentController.editArgument,
);

router.delete(
  '/delete/:id',
  auth(USER_ROLE.USER),
  argumentController.removeArgument,
);

export const argumentRoutes = router;
