import { ArgumentModel } from './argument.model';
import { IArgument } from './argument.interface';
import status from 'http-status';
import AppError from '../../errors/AppError';
import { DebateModel } from '../Debate/debate.model';
import { ParticipantModel } from '../Participant/participant.model';
import { containsToxicWords } from '../../utils/checkToxicContent';

const createArgument = async (
  payload: IArgument,
  author: string,
): Promise<IArgument> => {


  const toxicWords = containsToxicWords(payload.content);
  if (toxicWords.length > 0) {
    throw new AppError(
      status.BAD_REQUEST,
      `Your argument contains inappropriate words: ${toxicWords.join(', ')}`
    );
  }

  const isDebateExist = await DebateModel.findById(payload.debate);

  if (!isDebateExist || isDebateExist.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Debate not found');
  }

  if (isDebateExist.status !== 'open') {
    throw new AppError(
      status.BAD_REQUEST,
      'Debate is not open for participation',
    );
  }

  if (isDebateExist.endsAt && isDebateExist.endsAt < new Date()) {
    throw new AppError(status.BAD_REQUEST, 'Debate has already ended');
  }

  const isParticipant = await ParticipantModel.findOne({
    user: author,
    debate: payload.debate,
  });

  if (!isParticipant) {
    throw new AppError(
      status.CONFLICT,
      'You have not joined this debate, join first',
    );
  }

  const createdArgument = await ArgumentModel.create({
    ...payload,
    author,
  });

  return createdArgument;
};

const updateArgument = async (
  argumentId: string,
  userId: string,
  updatedContent: string,
): Promise<IArgument> => {
  const argument = await ArgumentModel.findById(argumentId);

  if (!argument || argument.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Argument not found');
  }

  if (argument.author.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You can only edit your own arguments',
    );
  }

  const timeDifference = Date.now() - new Date(argument.createdAt!).getTime();
  const fiveMinutes = 5 * 60 * 1000;

  if (timeDifference > fiveMinutes) {
    throw new AppError(status.FORBIDDEN, 'Edit time expired');
  }

  argument.content = updatedContent;

  await argument.save();
  return argument;
};

const deleteArgument = async (
  argumentId: string,
  userId: string,
): Promise<void> => {
  const argument = await ArgumentModel.findById(argumentId);
  if (!argument || argument.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Argument not found');
  }

  if (argument.author.toString() !== userId) {
    throw new AppError(
      status.FORBIDDEN,
      'You can only delete your own arguments',
    );
  }

  const timeDifference = Date.now() - new Date(argument.createdAt!).getTime();
  if (timeDifference > 5 * 60 * 1000) {
    throw new AppError(status.FORBIDDEN, 'Delete time expired');
  }

  await ArgumentModel.findByIdAndUpdate(
    { argumentId },
    { isDeleted: true },
    { new: true },
  );
};

export const argumentService = {
  createArgument,
  updateArgument,
  deleteArgument,
};
