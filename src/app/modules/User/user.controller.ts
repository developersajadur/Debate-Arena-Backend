import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { userService } from './user.service';

const CreateUser = catchAsync(async (req, res) => {
  const user = await userService.CreateUser(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'User Registered Successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
});


const seedAdmin = catchAsync(async (req, res) => {
  const admin = await userService.seedAdmin();

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Admin seeded successfully',
    data: admin,
  });
});

export const userController = {

  CreateUser,
  seedAdmin,
};
