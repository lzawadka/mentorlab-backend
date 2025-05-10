import { CampaignChallenge } from "./relations/campaign-challenge.entity";
import { ChallengeCategory } from "./relations/challenge-category.entity";

export class Challenge {
    id: number;
    title: string;
    description?: string;
    example?: string;
    estimatedTime?: number;
    difficulty: string;
    minThreshold: number;
    maxThreshold: number;
    createdAt: Date;
    updatedAt: Date;
  
    categories?: ChallengeCategory[]; // Association avec les catégories
    campaigns?: CampaignChallenge[]; // Association optionnelle avec les campagnes
  }
  