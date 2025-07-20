/* eslint-disable @typescript-eslint/no-explicit-any */
import cron from 'node-cron';
import { Document } from 'mongoose';
import { DebateModel } from './debate.model';
import { ArgumentModel } from '../Argument/argument.model';
import { IUser } from '../User/user.interface';
import { IDebate } from './debate.interface';


export const startDebateMonitor = () => {
  cron.schedule('*/1 * * * *', async () => {
    try {
      const now = new Date();
      const expiredDebates = await DebateModel.find({
        status: 'open',
        endsAt: { $lte: now },
      }) as (IDebate & Document)[];

      for (const debate of expiredDebates) {
        const argumentsList = await ArgumentModel.find({
          debate: debate._id,
          isDeleted: false,
        }).populate<{ author: IUser }>('author', 'name email'); 
        const voteCounts = {
          support: 0,
          oppose: 0,
        };

        for (const arg of argumentsList) {
          const side = (arg as any).side;

          if (side === 'support') {
            voteCounts.support += arg.votes.length;
          } else if (side === 'oppose') {
            voteCounts.oppose += arg.votes.length;
          }
        }

        const winner =
          voteCounts.support > voteCounts.oppose
            ? 'support'
            : voteCounts.oppose > voteCounts.support
            ? 'oppose'
            : null;

        debate.status = 'closed';
        debate.winner = winner;
        await debate.save();
      }

      console.log(`[${new Date().toISOString()}]  Debate auto-close cron executed`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error in debate auto-close cron`, error);
    }
  });
};
