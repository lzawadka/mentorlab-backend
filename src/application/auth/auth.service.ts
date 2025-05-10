import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { LoginUserRequestDto } from 'src/application/auth/dto/request/login-user-request.dto';
import { RefreshTokenResponseDto } from 'src/application/auth/dto/response/refresh-token-response.dto';
import { LoginResponseDto } from 'src/application/auth/dto/response/login-response.dto';
import { UserRole } from '../../domain/enums/user-role.enum';
import { ValidateUserDto } from 'src/application/user/dto/response/validate-user-response.dto';
import { LoggerService } from 'src/shared/logging/logger.service';
import { LogType } from 'src/domain/enums/log-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidateUserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new NotFoundException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const role = user.role as UserRole;
    if (!Object.values(UserRole).includes(role)) throw new UnauthorizedException('Invalid role');

    const { password: _, ...result } = user;
    return { 
      ...result, 
      role
    };
  }

  async login(user: LoginUserRequestDto): Promise<LoginResponseDto> {
    const validUser = await this.validateUser(user.email, user.password);
    const payload = { username: validUser.email, sub: validUser.id, role: validUser.role, clientId: validUser.clientId };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(validUser.id, hashedRefreshToken);

    await this.loggerService.logTechnical(this.validateUser.name, 'Invalid Role', LogType.ERROR);
    return {
      userId: validUser.id,
      role: validUser.role,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      clientId: validUser.clientId,
      email: validUser.email
    };
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<RefreshTokenResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user || !user.refreshToken) throw new UnauthorizedException('Access Denied');

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValid) throw new UnauthorizedException('Invalid Refresh Token');

    const payload = { username: user.email, sub: user.id, role: user.role, clientId: user.clientId };

    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    await this.userRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
