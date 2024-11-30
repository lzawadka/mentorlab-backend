import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ description: "L'ID de l'utilisateur" })
  id: number;

  @ApiProperty({ description: "L'email de l'utilisateur" })
  email: string;

  @ApiProperty({ description: "Le prénom de l'utilisateur" })
  firstName: string;

  @ApiProperty({ description: "Le nom de l'utilisateur" })
  lastName: string;

  @ApiProperty({ description: "Le rôle de l'utilisateur (participant, coach, admin)" })
  role: string;

  @ApiProperty({ description: "Date de création de l'utilisateur" })
  createdAt: Date;
}
