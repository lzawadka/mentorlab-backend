import { Global, Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignProgressionController } from './campaign-progression/campaign-progression.controller';
import { CampaignProgressionService } from './campaign-progression/campaign-progression.service';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { ParticipantService } from '../participant/participant.service';
import { LoggerService } from 'src/shared/logging/logger.service';

@Global()
@Module({
  controllers: [
    CampaignController, 
    CampaignProgressionController
  ],
  providers: [
    CampaignService, 
    CampaignProgressionService,
    ClientService, 
    UserService, 
    ParticipantService,
    LoggerService
  ],
  exports: [
    CampaignService, 
    CampaignProgressionService
  ],
})
export class CampaignModule {}
