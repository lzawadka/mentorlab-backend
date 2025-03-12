import { Controller, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './dto/request/update-user-password.dto';
import { UpdateUserDto } from './dto/request/update-user-request.dto';
import { GetClientWithUsersResponseDto } from './dto/response/get-client-users-response.dto';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { UpdateUserResponseDto } from './dto/response/update-user-response.dto';
import { UserService } from './user.service';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, 
  ) {}
  
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
  @Get(':userMail/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT, UserRole.COACH)
  @ClientScoped()
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
  @Put(':id/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT)
  @ClientScoped()
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
  @Put(':id/client/:clientId/password')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT)
  @ClientScoped()
  async updatePassword(
    @Param('id') userId: string,
    @Body() data: UpdateUserPasswordDto,
  ): Promise<void> {
    await this.userService.updatePassword(Number(userId), data);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User nopt found' })
  @Delete(':id/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT)
  @ClientScoped()
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(Number(id));
  }

  @Get('user/client/:clientId')
  @ApiOperation({ summary: 'Fetch all user for a clientId' })
  @ApiResponse({
    status: 200,
    description: 'Details of the client with its users',
    type: GetClientWithUsersResponseDto,
  })
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  @ClientScoped()
  async getUsersByClientId(@Param('clientId') clientId: number) {
    return this.userService.getUsersByClientId(Number(clientId));
  }
}

