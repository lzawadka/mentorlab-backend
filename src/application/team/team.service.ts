import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamRequestDto } from 'src/application/team/dto/request/create-team-request.dto';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
import { TeamRepository } from 'src/infrastructure/repository/team.repository';
import { UpdateTeamRequestDto } from './dto/request/update-team-request.dto';
import { GetTeamResponseDto } from './dto/response/get-team-response.dto';
import { plainToInstance } from 'class-transformer';
import { GetUserParticipantDto } from '../participant/dto/response/get-user-participant-response.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly campaignRepository: CampaignRepository,
    private readonly participantRepository: ParticipantRepository,
  ) {}

  async createTeam(data: CreateTeamRequestDto) {
    // Vérifie que la campagne existe
    await this.checkExistingCampaign(data.campaignId);

    // Vérifie que le participant existe pour cette campagne
    await this.checkParticipantExistingInCampaign(data.participantIds, data.campaignId);

    // Crée l'équipe
    const team = await this.teamRepository.createTeam(data.name, data.campaignId);

    // Ajoute les participants à l'équipe
    await this.updateParticipantTeam(data.participantIds, team.id);

    return {
      ...team,
      participantIds: data.participantIds,
    };
  }

  async getTeamByCampaignId(campaignId: number): Promise<GetTeamResponseDto[]> {
    const teams = await this.teamRepository.getByCampaignId(campaignId)
    if(!teams) throw new NotFoundException(`Team with campaignId: ${campaignId}, does not exist`);

    const transformedTeam = teams.map(this.mapTeamToDto);
  
    return transformedTeam;
  }

  async getTeamById(id: number): Promise<GetTeamResponseDto> {
    const team = await this.teamRepository.getById(id);
    if(!team) throw new NotFoundException(`Team with ID ${id} does not exist`);

    return this.mapTeamToDto(team);
  }

  async deleteTeam(id: number) {
    return await this.teamRepository.delete(id);
  }

  async updateTeam(id: number, data: UpdateTeamRequestDto): Promise<any> {
    this.checkExistingCampaign(data.campaignId);
    this.checkParticipantExistingInCampaign(data.participantIds, data.campaignId);
    const teamUpdated = await this.teamRepository.update(id, data)
    await this.updateParticipantTeam(data.participantIds, id);

    return teamUpdated;
  }

  private mapTeamToDto(team) {
    return plainToInstance(GetTeamResponseDto, {
      id: team.id,
      name: team.name,
      campaignId: team.campaignId,
      points: team.points,
      createdAt: team.createdAt,
      users: team.participants?.map((participant) =>
        plainToInstance(GetUserParticipantDto, {
          participantId: participant.id,
          userId: participant.userId,
          createdAt: participant.createdAt,
          email: participant.user.email,
          firstName: participant.user.firstName,
          lastName: participant.user.lastName,
          role: participant.user.role,
        })
      ),
    })
  }

  private async updateParticipantTeam(participantIds: number[], teamId: number): Promise<void> {
    await Promise.all(
      participantIds.map((participantId) =>
        this.participantRepository.updateParticipantTeam(participantId, teamId),
      ),
    );
  }

  private async checkExistingCampaign(campaignId: number): Promise<void> {
    const campaignExists = await this.campaignRepository.findById(campaignId);
    if (!campaignExists) throw new NotFoundException(`Campaign with ID ${campaignId} does not exist`);
  }

  private async checkParticipantExistingInCampaign(participantIds: number[], campaignId: number): Promise<void> {
    const participants = await this.participantRepository.findByIds(participantIds);
    const invalidParticipants = participants.filter((p) => p.campaignId !== campaignId);
    if (invalidParticipants.length > 0)
      throw new NotFoundException(`Some participants are not part of the campaign with ID ${campaignId}`);
  }
}
