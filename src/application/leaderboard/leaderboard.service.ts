import { Injectable, NotFoundException } from '@nestjs/common';
import { LeaderboardRepository } from 'src/infrastructure/repository/leaderboard.repository';
import { GetCampaignResponseDto } from '../campaign/dto/response/get-campaign-response.dto';
import { LoggerService } from 'src/shared/logging/logger.service';
import { CampaignService } from '../campaign/campaign.service';
import { LogType } from 'src/domain/enums/log-type.enum';
import { GetParticipantResponseDto } from '../participant/dto/response/get-particpant-response.dto';
import { GetTeamResponseDto } from '../team/dto/response/get-team-response.dto';
import { TeamService } from '../team/team.service';

@Injectable()
export class LeaderboardService {
  constructor(
    private readonly leaderboardRepository: LeaderboardRepository,
    private readonly campaignService: CampaignService,
    private readonly teamService: TeamService,
    private readonly logger: LoggerService,
  ) {}

  async getLeaderboard(campaignId: number) {
    return this.leaderboardRepository.getLeaderboard(campaignId);
  }

  async recalcLeaderboard(campaignId: number, participants: GetParticipantResponseDto[]): Promise<void> {
    const campaign = await this.campaignService.getById(campaignId);
    if (!campaign) {
        throw new NotFoundException(`Campaign ${campaignId} not found`);
    }

    const recalcHandlers: Record<string, (c: GetCampaignResponseDto, p: GetParticipantResponseDto[]) => Promise<void>> = {
        individual: (c, p) => this.recalcIndividual(c, p),
        team: (c) => this.recalcTeam(c),
    };
    
    const handler = recalcHandlers[campaign.type];
    if (!handler) {
        this.logger.logTechnical(
        'recalcLeaderboard',
        `Unknown campaign type: ${campaign.type}`,
        LogType.ERROR,
        );
        throw new Error(`Unknown campaign type: ${campaign.type}`);
    }

    await handler(campaign, participants);
  }

  private async recalcIndividual(campaign: GetCampaignResponseDto, participants: GetParticipantResponseDto[]) {

    const scored = participants.map((p) => {
      const challengesCompleted = p.progress[0]?.challengesCompleted ?? 0;
      return {
        participantId: p.id,
        points: challengesCompleted,
      };
    });

    scored.sort((a, b) => b.points - a.points);

    for (let i = 0; i < scored.length; i++) {
      const { participantId, points } = scored[i];
      const rank = i + 1;

      await this.leaderboardRepository.upsertParticipantLeaderboard(
        campaign.id,
        participantId,
        points,
        rank,
      );
    }

    await this.leaderboardRepository.deleteTeamEntries(campaign.id);
  }

  private async recalcTeam(campaign: GetCampaignResponseDto) {
    const teams: GetTeamResponseDto[] = await this.teamService.getTeamByCampaignId(campaign.id);

    const scoredTeams = teams.map((team) => {
      let totalPoints = 0;
      team.participants.forEach((p) => {
        totalPoints += p.progress[0]?.challengesCompleted ?? 0;
      });
      return {
        teamId: team.id,
        points: totalPoints,
      };
    });

    scoredTeams.sort((a, b) => b.points - a.points);

    for (let i = 0; i < scoredTeams.length; i++) {
      const { teamId, points } = scoredTeams[i];
      const rank = i + 1;

      await this.leaderboardRepository.upsertTeamLeaderboard(
        campaign.id,
        teamId,
        points,
        rank,
      );
    }

    await this.leaderboardRepository.deleteParticipantEntries(campaign.id);
  }
}
