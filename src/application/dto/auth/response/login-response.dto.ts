import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: "L'ID de l'utilisateur" })
  userId: number;

  @ApiProperty({ description: 'Token JWT pour accéder aux ressources protégées' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token pour renouveler le token JWT' })
  refreshToken: string;
}
