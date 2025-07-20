import { ArgumentModel } from '../Argument/argument.model';
import { LeaderboardEntry } from './leaderboard.interface';

type LeaderboardFilter = 'weekly' | 'monthly' | 'all-time';

const getLeaderboard = async (
  filter: LeaderboardFilter = 'all-time',
  limit: number = 10
): Promise<LeaderboardEntry[]> => {
  let dateFilter: Date | undefined;
  const now = new Date();

  if (filter === 'weekly') {
    dateFilter = new Date(now);
    dateFilter.setDate(now.getDate() - 7);
  } else if (filter === 'monthly') {
    dateFilter = new Date(now);
    dateFilter.setMonth(now.getMonth() - 1);
  }

  const matchStage = {
    isDeleted: false,
    ...(dateFilter ? { createdAt: { $gte: dateFilter } } : {}),
  };

  const leaderboard = await ArgumentModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$author',
        totalVotes: { $sum: { $size: '$votes' } },
        debatesParticipated: { $addToSet: '$debate' },
      },
    },
    {
      $project: {
        totalVotes: 1,
        debatesParticipatedCount: { $size: '$debatesParticipated' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    { $unwind: '$user' },
    {
      $project: {
        username: '$user.name',
        totalVotes: 1,
        debatesParticipatedCount: 1,
      },
    },
    { $sort: { totalVotes: -1 } },
    { $limit: limit },
  ]);

  return leaderboard as LeaderboardEntry[];
};

export const leaderboardService = {
  getLeaderboard,
};
