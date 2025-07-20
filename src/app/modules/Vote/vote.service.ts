/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import { ArgumentModel } from '../Argument/argument.model';
import AppError from '../../errors/AppError';
import { Types } from 'mongoose';

const castVote = async (userId: string, argumentId: string) => {
  const argument = await ArgumentModel.findById(argumentId).populate('debate');
  if (!argument || argument.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Argument not found');
  }
  const debate = argument.debate as any;

  if (!debate || debate.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Debate not found');
  }

  if (debate.status !== 'open') {
    throw new AppError(status.FORBIDDEN, 'Debate is closed for voting');
  }

  const alreadyVoted = argument.votes.some((v) => v.user.toString() === userId);
  if (alreadyVoted) {
    throw new AppError(status.CONFLICT, 'You already voted');
  }

  argument.votes.push({
    user: new Types.ObjectId(userId),
    votedAt: new Date(),
  });
  await argument.save();

  return argument;
};

export const voteService = {
  castVote,
};
