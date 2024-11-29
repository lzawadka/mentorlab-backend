import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: "L'ID de l'utilisateur" })
  userId: number;

  @ApiProperty({ description: 'Refresh token valide pour renouveler le token JWT' })
  refreshToken: string;
}
