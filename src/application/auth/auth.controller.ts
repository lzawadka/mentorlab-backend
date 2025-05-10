import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth/auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginUserRequestDto } from './dto/request/login-user-request.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RefreshTokenResponseDto } from './dto/response/refresh-token-response.dto';
import { CreateUserDto } from '../user/dto/request/create-user.dto';
import { CreateUserResponseDto } from '../user/dto/response/create-user-response.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService
  ) {}

  @ApiOperation({
    summary: "Refresh token",
  })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request (ex: token expired ou incorrect)',
  })
  @Post('refresh')
  async refreshTokens(@Body() body: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    return await this.authService.refreshTokens(body.userId, body.refreshToken);
  }

  @ApiOperation({
    summary: "Sign In User",
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully connected',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Post('login')
  async login(@Body() loginCredentials: LoginUserRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginCredentials);
  }

  @ApiOperation({summary: "Register a user"})
  @ApiResponse({
    status: 201,
    description: 'User creation success',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }
}
