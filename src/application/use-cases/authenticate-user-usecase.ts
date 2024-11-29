import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/domain/services/auth.service';
import { AuthResponseDto } from '../dto/auth/response/auth-response.dto';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }
}
