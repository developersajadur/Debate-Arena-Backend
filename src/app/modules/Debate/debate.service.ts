import { DebateModel } from './debate.model';
import { IDebate } from './debate.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { IParticipant } from '../Participant/participant.interface';
import { ParticipantModel } from '../Participant/participant.model';

const createDebate = async (
  payload: IDebate,
  userId: string,
): Promise<IDebate> => {
  const endsAt = new Date(Date.now() + payload.duration * 60 * 60 * 1000);

  const debate = await DebateModel.create({
    ...payload,
    endsAt,
    createdBy: userId,
  });

  return debate;
};

const joinDebate = async (
  payload: IParticipant,
  userId: string,
): Promise<IParticipant> => {
  const isDebateExist = await DebateModel.findById(payload.debate);
  if (!isDebateExist || isDebateExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Debate not found');
  } else if (isDebateExist.status !== 'open') {
    throw new AppError(
      status.BAD_REQUEST,
      'Debate is not open for participation',
    );
  } else if (isDebateExist.endsAt && isDebateExist.endsAt < new Date()) {
    throw new AppError(status.BAD_REQUEST, 'Debate has already ended');
  }

  const exists = await ParticipantModel.findOne({
    user: payload.user,
    debate: payload.debate,
  });

  if (exists) {
    throw new AppError(status.CONFLICT, 'You have already joined this debate');
  }

  const joined = await ParticipantModel.create({ ...payload, user: userId });
  return joined;
};

export const debateService = {
  createDebate,
  joinDebate,
};
