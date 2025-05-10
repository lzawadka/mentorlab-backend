import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserBaseDto } from "../../../user/dto/user-base.dto";

export class GetUserParticipantDto extends UserBaseDto {
    @Expose()
    @ApiProperty({description: 'Identifiant unique du participant'})
    participantId: number;
    
    @Expose()
    @ApiProperty({description: "Identifiant de l'utilisateur associé"})
    userId: number;
    
    @Expose()
    @ApiProperty({description: 'Identifiant de la campagne associée',})
    campaignId: number;
    
    @Expose()
    @ApiProperty({description: 'Progression du user dans la campagne',})
    progress: number;

    @Expose()
    @ApiProperty({description: "Identifiant de l'équipe associée (optionnel)"})
    teamId?: number;

    @Expose()
    @ApiProperty({description: 'Date de création du participant'})
    createdAt: Date;
}