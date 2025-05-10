import { ApiProperty } from '@nestjs/swagger';
import { GetParticipantResponseDto } from '../../participant/response/get-particpant-response.dto';

export class GetTeamResponseDto {
  @ApiProperty({description: 'Identifiant unique de l’équipe'})
  id: number;

  @ApiProperty({description: 'Nom de l’équipe'})
  name: string;

  @ApiProperty({description: 'Identifiant de la campagne associée'})
  campaignId: number;

  @ApiProperty({
    description: 'Points accumulés par la team',
    default: 0,
  })
  points: number;

  @ApiProperty({
    description: 'Liste des participants de la team',
    type: [GetParticipantResponseDto],
    required: false,
  })
  participants?: GetParticipantResponseDto[];

  @ApiProperty({description: 'Date de création de l’équipe'})
  createdAt: Date;

  @ApiProperty({description: 'Date de dernière mise à jour de l’équipe'})
  updatedAt: Date;
}
