import { Controller, Post, Body, Get, Head, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/request/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserRequestDto } from '../dto/user/request/login-user-request.dto';
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user-usecase';
import { UserUseCase } from '../use-cases/user.usecase';
import { UpdateUserDto } from '../dto/user/request/update-user-request.dto';
import { UpdateUserResponseDto } from '../dto/user/response/update-user-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase, 
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @ApiOperation({
    summary: "Create User",
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userUseCase.createUser(createUserDto.email, createUserDto.password);
  }
  
  @ApiOperation({
    summary: "Get User by mail",
  })
  @Get(':userMail')
  async getByMail(@Param('userMail') userMail: string) {
    return this.userUseCase.findUserByMail(userMail);
  }

  @ApiOperation({
    summary: "Sign In User",
  })
  @Post('signIn')
  async signIn(@Body() credentials: LoginUserRequestDto) {
    return this.authenticateUserUseCase.execute(credentials.email, credentials.password);
  }

  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
    type: UpdateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    const updatedUser = await this.userUseCase.updateUser(Number(id), updateUserDto);
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }

  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userUseCase.deleteUser(Number(id));
  }
}

