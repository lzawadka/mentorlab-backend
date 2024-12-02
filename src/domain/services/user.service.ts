import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { User } from '../entities/user.entity';
import { GetClientWithUsersResponseDto } from 'src/application/dto/user/response/get-client-users-response.dto';
import { GetUserResponseDto } from 'src/application/dto/user/response/get-user-response.dto';
import { CreateUserResponseDto } from 'src/application/dto/user/response/create-user-response.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserResponseDto } from 'src/application/dto/user/response/update-user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, password: string): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser =  await this.userRepository.create({ email, password: hashedPassword });
    return {
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      role: createdUser.role,
      createdAt: createdUser.createdAt
    };
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.deleteUser(userId);
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<UpdateUserResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.userRepository.updateUser(userId, data);
  }

  async findUserByMail(userMail: string): Promise<GetUserResponseDto> {
    const user: User = await this.userRepository.findByEmail(userMail);
    if(!user) throw new NotFoundException(`User with mail ${userMail} not found`);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      participants: user.participants,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUsersByClientId(clientId: number): Promise<GetClientWithUsersResponseDto> {
    const users: User[] =  await this.userRepository.getUsersByClientId(clientId);
    
    if (!users || users.length === 0) throw new NotFoundException(`Client with ID ${clientId} not found`);

    const clientData = users[0].client;

    return {
      clientId: clientData.id,
      name: clientData.name,
      description: clientData.description,
      contactEmail: clientData.contactEmail,
      createdAt: clientData.createdAt,
      updatedAt: clientData.updatedAt,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        participants: user.participants,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    };
  }
}
