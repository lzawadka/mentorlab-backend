import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { User } from '../entities/user.entity';
import { GetClientWithUsersResponseDto } from 'src/application/dto/user/response/get-client-users-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteUser(userId);
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return this.userRepository.updateUser(userId, data);
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
