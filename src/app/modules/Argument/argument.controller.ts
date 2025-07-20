import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { argumentService } from './argument.service';
import { Request } from 'express';
import { TTokenUser } from '../../middlewares/auth';
import AppError from '../../errors/AppError';

const postArgument = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const result = await argumentService.createArgument(
      req.body,
      req.user.userId,
    );

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Argument posted successfully',
      data: result,
    });
  },
);

const editArgument = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const { id } = req.params;
    const userId = req.user.userId;
    const { content } = req.body;

    const result = await argumentService.updateArgument(id, userId, content);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Argument updated successfully',
      data: result,
    });
  },
);

const removeArgument = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const { id } = req.params;
    const userId = req.user.userId;

    await argumentService.deleteArgument(id, userId);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Argument deleted successfully',
      data: null,
    });
  },
);

export const argumentController = {
  postArgument,
  editArgument,
  removeArgument,
};
