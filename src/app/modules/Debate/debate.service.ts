/* eslint-disable @typescript-eslint/no-explicit-any */
import { DebateModel } from './debate.model';
import { IDebate } from './debate.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { IParticipant } from '../Participant/participant.interface';
import { ParticipantModel } from '../Participant/participant.model';
import QueryBuilder from '../../builders/QueryBuilder';

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



const getAllDebatesByQuery = async (query: Record<string, any>) => {
  const modelQuery = DebateModel.find();

  const searchableFields = ['title', 'tags', 'category'];

  const debateQueryBuilder = new QueryBuilder<IDebate>(modelQuery, query)
    .search(searchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await debateQueryBuilder.modelQuery;
  const meta = await debateQueryBuilder.countTotal();

  return {
    meta,
    data: result,
  };
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
  getAllDebatesByQuery
};
