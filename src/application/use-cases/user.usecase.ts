import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UpdateUserResponseDto } from '../dto/user/response/update-user-response.dto';
import { GetUserResponseDto } from '../dto/user/response/get-user-response.dto';
import { CreateUserResponseDto } from '../dto/user/response/create-user-response.dto';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, password: string): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser =  await this.userRepository.create({ email, password: hashedPassword });
    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      createdAt: createdUser.createdAt
    };
  }

  async findUserByMail(userMail: string): Promise<GetUserResponseDto> {
    const user: User = await this.userRepository.findByEmail(userMail);
    if(!user) throw new NotFoundException(`User with mail ${userMail} not found`);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<UpdateUserResponseDto> {
    const updatedUser = await this.userRepository.updateUser(userId, data);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      updatedAt: updatedUser.updatedAt,
    };
  }

  async deleteUser(userId: number): Promise<void> {
    this.userRepository.deleteUser(userId);
  }
}
