import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/domain/services/auth.service';
import { LoginUserRequestDto } from '../dto/auth/request/login-user-request.dto';
import { RefreshTokenDto } from '../dto/auth/refresh-token.dto';
import { LoginResponseDto } from '../dto/auth/response/login-response.dto';
import { RefreshTokenResponseDto } from '../dto/auth/response/refresh-token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
