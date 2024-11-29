import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new ConflictException('User with this email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.create({ email, password: hashedPassword });
  }

  async findUserByMail(userMail: string): Promise<User> {
    return this.userRepository.findByEmail(userMail);
  }

  async updateUser(userId: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.updateUser(userId, data);
  }

  async deleteUser(userId: number): Promise<void> {
    this.userRepository.deleteUser(userId);
  }
}
