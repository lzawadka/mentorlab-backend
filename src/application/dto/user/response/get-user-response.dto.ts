import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponseDto {
    @ApiProperty({ description: "L'ID de l'utilisateur" })
    id: number;

    @ApiProperty({ description: "L'email de l'utilisateur" })
    email: string;

    @ApiProperty({ description: "Le nom complet de l'utilisateur (facultatif)" })
    name?: string;

    @ApiProperty({ description: "Le rôle de l'utilisateur (participant, coach, admin)" })
    role: string;

    @ApiProperty({ description: "Date de création de l'utilisateur" })
    createdAt: Date;

    @ApiProperty({ description: "Date de mise à jour de l'utilisateur" })
    updatedAt: Date;
}