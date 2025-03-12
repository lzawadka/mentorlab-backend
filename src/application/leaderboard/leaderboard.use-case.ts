import { LoggerService } from "src/shared/logging/logger.service";
import { LeaderboardService } from "./leaderboard.service";
import { ParticipantService } from "../participant/participant.service";
import { GetParticipantResponseDto } from "../participant/dto/response/get-particpant-response.dto";

export class LeaderboardUseCase {
    constructor(
        private readonly leaderboardService: LeaderboardService,
        private readonly participantService: ParticipantService,
        private readonly logger: LoggerService,
      ) {}
    
      async recalcLeaderboard(campaignId: number): Promise<void> {
        this.logger.logFunctional('recalcLeaderboard', `Fetching leaderboard for campaign ${campaignId}.`);
        const participants: GetParticipantResponseDto[] = await this.participantService.getParticipantsByCampaign(
          campaignId,
        );
        return this.leaderboardService.recalcLeaderboard(campaignId, participants);
      }

      async getLeaderboard(campaignId: number) {
        this.logger.logFunctional('getLeaderboard', `Fetching leaderboard for campaign ${campaignId}.`);
        return this.leaderboardService.getLeaderboard(campaignId);
      }
}