import { Campaign } from "../campaign.entity";
import { Challenge } from "../challenge.entity";

export class CampaignChallenge {
    id: number;
    campaignId: number;
    challengeId: number;
  
    campaign: Campaign;
    challenge: Challenge;
  }
  