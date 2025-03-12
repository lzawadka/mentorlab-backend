import { ApiProperty } from '@nestjs/swagger';
import { GetTeamResponseDto } from '../../../team/dto/response/get-team-response.dto';
import { Expose } from 'class-transformer';
import { GetUserResponseDto } from '../../../user/dto/response/get-user-response.dto';
import { GetUserParticipantDto } from '../../../participant/dto/response/get-user-participant-response.dto';

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
    type: [GetUserParticipantDto],
    required: false,
  })
  user?: GetUserParticipantDto[];

  @Expose()
  @ApiProperty({description: 'Date of campaign creation'})
  createdAt: Date;

  @Expose()
  @ApiProperty({description: 'Date of the last campaign update'})
  updatedAt: Date;

  @Expose()
  @ApiProperty({description: 'ChallengeIds of the campaign'})
  challengeIds?: Date;

  @Expose()
  @ApiProperty({description: 'Total number of challenge for this campaign'})
  totalChallenges: number;
}
