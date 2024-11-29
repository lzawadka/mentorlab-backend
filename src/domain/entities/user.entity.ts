export class User {
  id: number;
  email: string;
  password?: string;
  name?: string;
  role: string; 
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
