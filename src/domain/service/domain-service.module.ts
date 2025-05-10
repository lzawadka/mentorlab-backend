import { Global, Module } from '@nestjs/common';
import { UserPathService } from './user/user-path.service';
import { SelfEvaluationService } from 'src/application/self-evalutation/self-evaltuation.service';
import { ChallengeService } from 'src/application/challenge/challenge.service';
import { LoggerService } from 'src/shared/logging/logger.service';
import { ParticipantService } from 'src/application/participant/participant.service';

@Global()
@Module({
    providers: [
        UserPathService, 
        SelfEvaluationService,
        ParticipantService,
        ChallengeService,
        LoggerService
    ],
    exports: [UserPathService],
})
export class DomainServiceModule {}