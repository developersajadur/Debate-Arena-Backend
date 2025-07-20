import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { voteService } from './vote.service';
import { Request } from 'express';
import { TTokenUser } from '../../middlewares/auth';
import AppError from '../../errors/AppError';

const castVote = catchAsync(
  async (req: Request & { user?: TTokenUser }, res) => {
    if (!req.user || !req.user.userId) {
      throw new AppError(status.UNAUTHORIZED, 'User not authenticated');
    }
    const  userId = req.user.userId;
    const { argumentId } = req.body;

    const updatedArgument = await voteService.castVote(userId, argumentId);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Vote submitted successfully',
      data: {
        totalVotes: updatedArgument.votes.length,
      },
    });
  },
);

export const voteController = {
  castVote,
};
