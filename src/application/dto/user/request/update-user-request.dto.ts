import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Email de l’utilisateur',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Mot de passe de l’utilisateur',
  })
  password?: string;
}
