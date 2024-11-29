import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh')
  async refreshTokens(@Body() body: { userId: number; refreshToken: string }) {
    return this.authService.refreshTokens(body.userId, body.refreshToken);
  }
}
