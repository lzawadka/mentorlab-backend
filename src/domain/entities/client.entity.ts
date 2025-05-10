import { User } from "@prisma/client";

export class Client {
    id: number;
    name: string;
    description?: string;
    contactEmail: string;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
  }