import { ApiProperty } from '@nestjs/swagger';
import { GetTeamResponseDto } from '../../team/response/get-team-response.dto';
import { GetParticipantResponseDto } from '../../participant/response/get-particpant-response.dto';

export class GetCampaignResponseDto {
  @ApiProperty({description: 'Identifiant unique de la campagne'})
  id: number;

  @ApiProperty({description: 'Titre de la campagne'})
  title: string;

  @ApiProperty({description: 'Description de la campagne'})
  description?: string;

  @ApiProperty({description: 'Identifiant du client associé'})
  clientId: number;

  @ApiProperty({
    description: 'Type de campagne (individuelle ou en équipe)',
    enum: ['individual', 'team'],
  })
  type: string;

  @ApiProperty({description: 'Date de début de la campagne'})
  startDate: Date;

  @ApiProperty({description: 'Date de fin de la campagne'})
  endDate: Date;

  @ApiProperty({
    description: 'Liste des équipes participant à la campagne',
    type: [GetTeamResponseDto],
    required: false,
  })
  teams?: GetTeamResponseDto[];

  @ApiProperty({
    description: 'Liste des participants de la campagne',
    type: [GetParticipantResponseDto],
    required: false,
  })
  participants?: GetParticipantResponseDto[];

  @ApiProperty({description: 'Date de création de la campagne'})
  createdAt: Date;

  @ApiProperty({description: 'Date de dernière mise à jour de la campagne'})
  updatedAt: Date;
}
