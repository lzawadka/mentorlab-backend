import { Client } from "./client.entity";
import { Participant } from "./participant.entity";

export class User {
  id: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  participants?: Participant[];
  client?: Client;
  clientId?: number;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
