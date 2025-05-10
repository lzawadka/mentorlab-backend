import { Campaign } from './campaign.entity';
import { Participant } from './participant.entity';

export class Team {
  id: number;

  name: string;

  campaignId: number;
  campaign: Campaign;

  participants?: Participant[];

  points: number;
  createdAt: Date;
  updatedAt: Date;
}
