import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { ValidateUserDto } from 'src/application/dto/user/response/validate-user-response.dto';
import { LoginUserRequestDto } from 'src/application/dto/auth/request/login-user-request.dto';
import { RefreshTokenResponseDto } from 'src/application/dto/auth/response/refresh-token-response.dto';
import { LoginResponseDto } from 'src/application/dto/auth/response/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidateUserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: LoginUserRequestDto): Promise<LoginResponseDto> {
    const validUser = await this.validateUser(user.email, user.password);
    const payload = { username: validUser.email, sub: validUser.id, role: validUser.role };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(validUser.id, hashedRefreshToken);

    return {
      userId: validUser.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
    };
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<RefreshTokenResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) throw new UnauthorizedException('Access Denied');

    // Vérifie si le refresh token correspond à celui stocké
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Invalid Refresh Token');

    const payload = { username: user.email, sub: user.id };

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Met à jour le refresh token dans la base de données
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
