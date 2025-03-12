import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CampaignProgressionRepository } from 'src/infrastructure/repository/campaign-progression.repository';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import { ChallengeProgressionRepository } from 'src/infrastructure/repository/challenge-progression.repository';
import ChallengeRepository from 'src/infrastructure/repository/challenge.repository';
import { ClientRepository } from 'src/infrastructure/repository/client.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
import { SelfEvaluationRepository } from 'src/infrastructure/repository/self-evaluation.repository';
import { TeamRepository } from 'src/infrastructure/repository/team.repository';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { LoggerRepository } from './logger.repository';
import { LeaderboardRepository } from './leaderboard.repository';

@Global()
@Module({
    providers: [
        PrismaService,
        CampaignRepository, 
        ParticipantRepository, 
        UserRepository, 
        ClientRepository, 
        ChallengeRepository, 
        CategoryRepository, 
        TeamRepository,
        ChallengeProgressionRepository,
        CampaignProgressionRepository,
        UserRepository,
        SelfEvaluationRepository,
        LoggerRepository,
        LeaderboardRepository
    ],
    exports: [
        CampaignRepository, 
        ParticipantRepository, 
        UserRepository, 
        ClientRepository,
        ChallengeRepository, 
        CategoryRepository,
        TeamRepository,
        ChallengeProgressionRepository,
        CampaignProgressionRepository,
        SelfEvaluationRepository,
        UserRepository,
        LoggerRepository,
        LeaderboardRepository
    ],
})
export class RepositoryModule {}
  