import { Controller, Post, Body, Get, Head, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/request/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/user/request/update-user-request.dto';
import { UpdateUserResponseDto } from '../dto/user/response/update-user-response.dto';
import { GetUserResponseDto } from '../dto/user/response/get-user-response.dto';
import { CreateUserResponseDto } from '../dto/user/response/create-user-response.dto';
import { UserService } from 'src/domain/services/user.service';
import { GetClientWithUsersResponseDto } from '../dto/user/response/get-client-users-response.dto';
import { UpdateUserPasswordDto } from '../dto/user/request/update-user-password.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, 
  ) {}

  @ApiOperation({summary: "Create user"})
  @ApiResponse({
    status: 201,
    description: 'User creation success',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto.email, createUserDto.password);
  }
  
  @ApiOperation({summary: "Fetch user by mail"})
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: GetUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':userMail')
  async getByMail(@Param('userMail') userMail: string): Promise<GetUserResponseDto> {
    return this.userService.findUserByMail(userMail);
  }

  @ApiOperation({ summary: 'Update user datas' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
    type: UpdateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 400,
    description: 'Invalid datas',
  })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.updateUser(Number(id), updateUserDto);
  }

  @ApiOperation({ summary: "Update user password" })
  @ApiResponse({
    status: 200,
    description: "Password updated successfully",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @Put(':id/password')
  async updatePassword(
    @Param('id') userId: string,
    @Body() data: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(Number(userId), data);
  }


  @ApiOperation({ summary: 'Delet user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User nopt found' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(Number(id));
  }

  @Get('userClient/:clientId')
  @ApiOperation({ summary: 'Fetch all user for a clientId' })
  @ApiResponse({
    status: 200,
    description: 'Details of the client with its users',
    type: GetClientWithUsersResponseDto,
  })
  async getUsersByClientId(@Param('clientId') clientId: number) {
    return this.userService.getUsersByClientId(Number(clientId));
  }
}

