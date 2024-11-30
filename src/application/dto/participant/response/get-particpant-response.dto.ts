import { ApiProperty } from "@nestjs/swagger";
import { GetUserResponseDto } from "../../user/response/get-user-response.dto";
import { GetTeamResponseDto } from "../../team/response/get-team-response.dto";
import { GetCampaignResponseDto } from "../../campaign/response/get-campaign-response.dto";

export class GetParticipantResponseDto {
    @ApiProperty({description: 'Identifiant unique du participant'})
    id: number;
    
    @ApiProperty({description: "Identifiant de l'utilisateur associé"})
    userId: number;

    @ApiProperty({description: 'Identifiant de la campagne associée',})
    campaignId: number;

    @ApiProperty({
    description: "Identifiant de l'équipe associée (optionnel)",
    required: false,
    })
    teamId?: number;

    @ApiProperty({
    description: 'Détails de la campagne associée',
    type: GetCampaignResponseDto,
    required: false,
    })
    campaign?: GetCampaignResponseDto;

    @ApiProperty({
    description: "Détails de l'équipe associée (optionnel)",
    required: false,
    type: GetTeamResponseDto,
    })
    team?: GetTeamResponseDto;

    @ApiProperty({description: 'Date de création du participant'})
    createdAt: Date;
}