import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Token d’accès généré pour l’utilisateur'
  })
  access_token: string;

  @ApiProperty({
    description: 'Token de rafraîchissement'
  })
  refresh_token: string;
}
