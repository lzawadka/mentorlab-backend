import { ApiProperty } from "@nestjs/swagger";
import { GetTeamResponseDto } from "../../team/response/get-team-response.dto";
import { GetCampaignResponseDto } from "../../campaign/response/get-campaign-response.dto";
import { Expose } from "class-transformer";

export class GetParticipantResponseDto {
    @Expose()
    @ApiProperty({description: 'Identifiant unique du participant'})
    id: number;
    
    @Expose()
    @ApiProperty({description: "Identifiant de l'utilisateur associé"})
    userId: number;
    
    @Expose()
    @ApiProperty({description: 'Identifiant de la campagne associée',})
    campaignId: number;

    @Expose()
    @ApiProperty({description: "Identifiant de l'équipe associée (optionnel)"})
    teamId?: number;

    @Expose()
    @ApiProperty({
    description: 'Détails de la campagne associée',
    type: GetCampaignResponseDto,
    required: false,
    })
    campaign?: GetCampaignResponseDto;

    @Expose()
    @ApiProperty({
    description: "Détails de l'équipe associée (optionnel)",
    required: false,
    type: GetTeamResponseDto,
    })
    team?: GetTeamResponseDto;

    @Expose()
    @ApiProperty({description: 'Date de création du participant'})
    createdAt: Date;
}