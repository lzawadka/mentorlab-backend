import { Module } from '@nestjs/common';
import { ClientModule } from './application/client/client.module';
import { CampaignModule } from './application/campaign/campaign.module';
import { UserModule } from './application/user/user.module';
import { ParticipantModule } from './application/participant/participant.module';
import { ChallengeModule } from './application/challenge/challenge.module';
import { CategoryModule } from './application/category/category.module';
import { TeamModule } from './application/team/team.module';
import { AuthModule } from './application/auth/auth.module';
import { DomainServiceModule } from './domain/service/domain-service.module';
import { SelfEvaluationModule } from './application/self-evalutation/self-evaluation.module';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { LoggerService } from './shared/logging/logger.service';
import { LogsModule } from './application/logs/logs.module';
import { LeaderboardModule } from './application/leaderboard/leaderboard.module';

@Module({
  providers: [
    LoggerService, 
  ],
  imports: [
    RepositoryModule,
    ClientModule,
    CampaignModule,
    UserModule,
    ParticipantModule,
    ChallengeModule,
    TeamModule, 
    CategoryModule,
    AuthModule,
    SelfEvaluationModule,
    DomainServiceModule,
    LogsModule,
    LeaderboardModule
  ]
})
export class AppModule {}
