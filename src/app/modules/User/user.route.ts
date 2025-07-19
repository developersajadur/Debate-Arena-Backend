import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';

const router = express.Router();

router.post(
  '/register-user',
  validateRequest(userValidationSchema.registerUser),
  userController.CreateUser,
);


router.post('/admin/seed', userController.seedAdmin);

export const userRoutes = router;
