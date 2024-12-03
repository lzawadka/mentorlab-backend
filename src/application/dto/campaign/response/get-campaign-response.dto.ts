import { ApiProperty } from '@nestjs/swagger';
import { GetTeamResponseDto } from '../../team/response/get-team-response.dto';
import { GetParticipantResponseDto } from '../../participant/response/get-particpant-response.dto';
import { Expose } from 'class-transformer';

export class GetCampaignResponseDto {
  @Expose()
  @ApiProperty({description: 'Identifiant unique de la campagne'})
  id: number;

  @Expose()
  @ApiProperty({description: 'Titre de la campagne'})
  title: string;

  @Expose()
  @ApiProperty({description: 'Description de la campagne'})
  description?: string;

  @Expose()
  @ApiProperty({description: 'Identifiant du client associé'})
  clientId: number;

  @Expose()
  @ApiProperty({
    description: 'Type de campagne (individuelle ou en équipe)',
    enum: ['individual', 'team'],
  })
  type: string;

  @Expose()
  @ApiProperty({description: 'Date de début de la campagne'})
  startDate: Date;

  @Expose()
  @ApiProperty({description: 'Date de fin de la campagne'})
  endDate: Date;

  @Expose()
  @ApiProperty({
    description: 'Liste des équipes participant à la campagne',
    type: [GetTeamResponseDto],
    required: false,
  })
  teams?: GetTeamResponseDto[];

  @Expose()
  @ApiProperty({
    description: 'Liste des participants de la campagne',
    type: [GetParticipantResponseDto],
    required: false,
  })
  participants?: GetParticipantResponseDto[];

  @Expose()
  @ApiProperty({description: 'Date de création de la campagne'})
  createdAt: Date;

  @Expose()
  @ApiProperty({description: 'Date de dernière mise à jour de la campagne'})
  updatedAt: Date;
}
