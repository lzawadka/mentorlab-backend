import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'ID de l’utilisateur',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'Refresh token valide',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;
}
