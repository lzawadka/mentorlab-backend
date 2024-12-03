import { Client } from './client.entity';
import { Participant } from './participant.entity';
import { Team } from './team.entity';

export class Campaign {
  id: number;

  clientId: number;
  client: Client;

  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;

  type: string;

  participants?: Participant[];
  teams?: Team[];

  createdAt: Date;
  updatedAt: Date;
}
