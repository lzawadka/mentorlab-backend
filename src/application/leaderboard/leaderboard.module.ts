
import { LeaderboardController } from "./leaderboard.controller";
import { Global, Module } from "@nestjs/common";
import { LeaderboardService } from "./leaderboard.service";
import { LeaderboardUseCase } from "./leaderboard.use-case";
import { CampaignService } from "../campaign/campaign.service";
import { ParticipantService } from "../participant/participant.service";
import { TeamService } from "../team/team.service";
import { LoggerService } from "src/shared/logging/logger.service";
import { UserService } from "../user/user.service";
import { ClientService } from "../client/client.service";

@Global()
@Module({
    providers: [
      LeaderboardService, 
      LeaderboardUseCase,
      CampaignService,
      TeamService,
      LoggerService,
      UserService,
      ClientService
    ],
    controllers: [LeaderboardController],
    exports: [LeaderboardService, LeaderboardUseCase]
  })
export class LeaderboardModule {}
  