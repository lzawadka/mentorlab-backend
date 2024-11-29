import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponseDto {
  @ApiProperty({
    description: 'Identifiant unique de l’utilisateur',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Email mis à jour de l’utilisateur',
    example: 'updated-email@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Date de création du compte',
    example: '2024-11-30T10:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date de dernière mise à jour du compte',
    example: '2024-11-30T12:00:00.000Z',
  })
  updatedAt: Date;
}
