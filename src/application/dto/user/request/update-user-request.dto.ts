import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({description: 'Email du user'})
  email?: string;

  @ApiPropertyOptional({description: 'Prénom du user'})
  firstName?: string;

  @ApiPropertyOptional({description: 'Nom du User'})
  lastName?: string;
}
