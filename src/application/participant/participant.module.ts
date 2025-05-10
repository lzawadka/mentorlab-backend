import { Global, Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

@Global()
@Module({
  controllers: [ParticipantController],
  providers: [ParticipantService],
  exports: [ParticipantService]
})
export class ParticipantModule {}
