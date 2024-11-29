import { Controller, Post, Body, Get, Head, Param, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from '../dto/user/request/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserRequestDto } from '../dto/auth/request/login-user-request.dto';
import { UserUseCase } from '../use-cases/user.usecase';
import { UpdateUserDto } from '../dto/user/request/update-user-request.dto';
import { UpdateUserResponseDto } from '../dto/user/response/update-user-response.dto';
import { GetUserResponseDto } from '../dto/user/response/get-user-response.dto';
import { CreateUserResponseDto } from '../dto/user/response/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase, 
  ) {}

  @ApiOperation({
    summary: "Create User",
  })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userUseCase.createUser(createUserDto.email, createUserDto.password);
  }
  
  @ApiOperation({
    summary: "Get User by mail",
  })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouvé',
    type: GetUserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé',
  })
  @Get(':userMail')
  async getByMail(@Param('userMail') userMail: string): Promise<GetUserResponseDto> {
    return this.userUseCase.findUserByMail(userMail);
  }

  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès',
    type: UpdateUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiResponse({
    status: 400,
    description: 'Données invalides',
  })
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userUseCase.updateUser(Number(id), updateUserDto);
  }

  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userUseCase.deleteUser(Number(id));
  }
}

