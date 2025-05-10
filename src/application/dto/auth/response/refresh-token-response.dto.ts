import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({ description: 'Nouveau token JWT' })
  accessToken: string;

  @ApiProperty({ description: 'Nouveau refresh token' })
  refreshToken: string;
}
