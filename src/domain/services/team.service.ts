import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamRepository } from '../../infrastructure/repository/team.repository';
import { CampaignRepository } from '../../infrastructure/repository/campaign.repository';
import { ParticipantRepository } from '../../infrastructure/repository/participant.repository';
import { CreateTeamRequestDto } from 'src/application/dto/team/request/create-team-request.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly campaignRepository: CampaignRepository,
    private readonly participantRepository: ParticipantRepository,
  ) {}

  async createTeam(data: CreateTeamRequestDto) {
    // Vérifie que la campagne existe
    const campaignExists = await this.campaignRepository.findById(data.campaignId);
    if (!campaignExists) throw new NotFoundException(`Campaign with ID ${data.campaignId} does not exist`);

    // Vérifie que le participant existe pour cette campagne
    const participants = await this.participantRepository.findByIds(data.participantIds);
    const invalidParticipants = participants.filter((p) => p.campaignId !== data.campaignId);
    if (invalidParticipants.length > 0) {
      throw new NotFoundException(`Some participants are not part of the campaign with ID ${data.campaignId}`);
    }

    // Crée l'équipe
    const team = await this.teamRepository.createTeam(data.name, data.campaignId);

    // Ajoute les participants à l'équipe
    await Promise.all(
      data.participantIds.map((participantId) =>
        this.participantRepository.updateParticipantTeam(participantId, team.id),
      ),
    );

    return {
      ...team,
      participantIds: data.participantIds,
    };
  }

  async getTeamByCampaignId(campaignId: number) {
    return await this.teamRepository.getByCampaignId(campaignId);
  }
}
