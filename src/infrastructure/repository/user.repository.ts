import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(user: Partial<User>): Promise<User> {
    const prismaUser: Prisma.UserCreateInput = {
      email: user.email,
      password: user.password,
    };

    return this.prisma.user.create({
      data: prismaUser,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email },
      include: {
        participants: true
      },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
  
  async findById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async findByIds(userIds: number[]) {
    return this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
    });
  }

  async getUsersByClientId(clientId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        clientId: clientId,
      },
      include: {
        client: true,
        participants: true
      },
    }); 
  }

}
