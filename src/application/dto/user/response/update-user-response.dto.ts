import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponseDto {
  @ApiProperty({ description: "L'ID de l'utilisateur" })
  id: number;

  @ApiProperty({ description: "L'email de l'utilisateur" })
  email: string;

  @ApiProperty({ description: "Date de mise à jour de l'utilisateur" })
  updatedAt: Date;
}
