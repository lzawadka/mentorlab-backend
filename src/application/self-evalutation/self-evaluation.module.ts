import { Global, Module } from '@nestjs/common';
import { SelfEvaluationService } from './self-evaltuation.service';
import { SelfEvaluationController } from './self-evalution.controller';
import { ChallengeProgressionService } from '../challenge/challenge-progression/challenge-progression.service';
import { ParticipantService } from '../participant/participant.service';
import { LoggerService } from 'src/shared/logging/logger.service';
import { SelfEvaluationUseCase } from './self-evalutaion.user-case';

@Global()
@Module({
    providers: [
        SelfEvaluationService,
        ChallengeProgressionService, 
        ParticipantService,
        LoggerService,
        SelfEvaluationUseCase
    ],
    exports: [SelfEvaluationService, SelfEvaluationUseCase],
    controllers: [SelfEvaluationController],
})
export class SelfEvaluationModule {}