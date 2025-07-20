import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { debateService } from './debate.service';
import { Request } from 'express';
import { TTokenUser } from '../../middlewares/auth';
import AppError from '../../errors/AppError';

const createDebate = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const result = await debateService.createDebate(req.body, req.user.userId);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Debate created successfully',
      data: result,
    });
  },
);

const joinDebate = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const result = await debateService.joinDebate(req.body, req.user.userId);

    sendResponse(res, {
      statusCode: status.CREATED,
      success: true,
      message: 'Successfully joined the debate',
      data: result,
    });
  },
);

const getAllDebatesByQuery = catchAsync(async (req, res) => {
  const result = await debateService.getAllDebatesByQuery(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Debates fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

export const debateController = {
  createDebate,
  joinDebate,
  getAllDebatesByQuery
};
