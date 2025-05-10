import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { GetClientWithUsersResponseDto } from 'src/application/user/dto/response/get-client-users-response.dto';
import { GetUserResponseDto } from 'src/application/user/dto/response/get-user-response.dto';
import { CreateUserResponseDto } from 'src/application/user/dto/response/create-user-response.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserResponseDto } from 'src/application/user/dto/response/update-user-response.dto';
import { UpdateUserDto } from 'src/application/user/dto/request/update-user-request.dto';
import { UpdateUserPasswordDto } from 'src/application/user/dto/request/update-user-password.dto';
import { CreateUserDto } from 'src/application/user/dto/request/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { LoggerService } from 'src/shared/logging/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService
  ) {}

  async createUser(createUser: CreateUserDto): Promise<CreateUserResponseDto> {
    const existingUser: User = await this.userRepository.findByEmail(createUser.email);
    if (existingUser) throw new ConflictException('User with this email already exists');

    if(!this.validatePassword(createUser.password)) 
      throw new BadRequestException(
       'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
      );

    if (!this.validateEmail(createUser.email))
      throw new BadRequestException('Invalid email format');

    createUser.password = await bcrypt.hash(createUser.password, 10);
    const createdUser =  await this.userRepository.create(createUser);

    await this.logger.logFunctional('User created', `User ${createdUser.email} created`, createdUser.id);

    return {
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      clientId: createdUser.clientId
    };
  }

  async deleteUser(userId: number): Promise<void> {
    const user: User = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.deleteUser(userId);

    await this.logger.logFunctional('User deleted', `User ${userId} deleted`, userId);
  }

  async updateUser(userId: number, data: UpdateUserDto): Promise<UpdateUserResponseDto> {
    const user: User = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (!this.validateEmail(data.email))
      throw new BadRequestException('Invalid email format');

    const userUpdated: Promise<User> = this.userRepository.updateUser(userId, data);

    await this.logger.logFunctional('User updated', `User ${userId} deleted`, userId);

    return userUpdated;
  }

  async updatePassword(userId: number, data: UpdateUserPasswordDto): Promise<void> {
    const user: User = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if(!this.validatePassword(data.newPassword)) 
      throw new BadRequestException(
       'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
      );

    const hashedPassword: string = await bcrypt.hash(data.newPassword, 10);
    await this.userRepository.updateUserPassword(userId, hashedPassword);

    await this.logger.logFunctional('User password updated', `User ${userId} successfuly updated his pasword`);
  }

  async findUserByMail(userMail: string): Promise<GetUserResponseDto> {
    const user: User = await this.userRepository.findByEmail(userMail);
    if(!user) throw new NotFoundException(`User with mail ${userMail} not found`);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      participants: user.participants.map(participant => ({
        id: participant.id,
      })),
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
        clientId: user.clientId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    };
  }

  async findByIds(userIds: number[]) {
    return this.userRepository.findByIds(userIds);
  }

  private validatePassword(password: string): boolean {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private validateEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
}
