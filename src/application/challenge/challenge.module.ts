import { Global, Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeProgressionController } from './challenge-progression/challenge-progression.controller';
import { ChallengeProgressionService } from './challenge-progression/challenge-progression.service';
import { UserPathService } from 'src/domain/service/user/user-path.service';
import { CampaignProgressionService } from '../campaign/campaign-progression/campaign-progression.service';
import { ParticipantService } from '../participant/participant.service';
import { LoggerService } from 'src/shared/logging/logger.service';
import { SelfEvaluationService } from '../self-evalutation/self-evaltuation.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { TeamService } from '../team/team.service';
import { ChallengeProgressionUseCase } from './challenge-progression/challenge-progression.use-case';

@Global()
@Module({
  controllers: [
    ChallengeController, 
    ChallengeProgressionController
  ],
  providers: [
    ChallengeService,
    ChallengeProgressionService,
    ChallengeProgressionUseCase,
    UserPathService,
    ParticipantService,
    CampaignProgressionService,
    LoggerService,
    SelfEvaluationService,
    LeaderboardService,
    TeamService,
  ],
  exports: [
    ChallengeService, 
    ChallengeProgressionService
  ],
})
export class ChallengeModule {}
