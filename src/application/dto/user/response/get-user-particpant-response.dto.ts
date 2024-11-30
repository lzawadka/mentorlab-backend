import { ApiProperty } from "@nestjs/swagger";
import { GetParticipantResponseDto } from "../../participant/response/get-particpant-response.dto";

export class GetUserResponseDto {
    @ApiProperty({ description: "L'ID de l'utilisateur" })
    id: number;

    @ApiProperty({ description: "L'email de l'utilisateur" })
    email: string;

    @ApiProperty({ description: "Le prénom complet de l'utilisateur" })
    firstName?: string;

    @ApiProperty({ description: "Le nom de l'utilisateur" })
    lastName?: string;

    @ApiProperty({ description: "Le rôle de l'utilisateur (participant, coach, admin)" })
    role: string;

    @ApiProperty({ description: "Date de création de l'utilisateur" })
    createdAt: Date;

    @ApiProperty({ description: "Date de mise à jour de l'utilisateur" })
    updatedAt: Date;

    @ApiProperty({
        description: "The list of particpants associated with the client",
        type: [GetParticipantResponseDto],
    })
    particpants?: GetParticipantResponseDto[];
}