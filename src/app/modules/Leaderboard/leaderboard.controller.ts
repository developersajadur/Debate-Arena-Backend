import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import status from 'http-status';
import { Request, Response } from 'express';
import { leaderboardService } from './leaderboard.service';

const getLeaderboard = catchAsync(async (req: Request, res: Response) => {
  const filter = (req.query.filter as 'weekly' | 'monthly' | 'all-time') || 'all-time';
  const limit = parseInt(req.query.limit as string) || 10;

  const leaderboard = await leaderboardService.getLeaderboard(filter, limit);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Leaderboard (${filter}) fetched successfully`,
    data: leaderboard,
  });
});

export const leaderboardController = {
  getLeaderboard,
};
