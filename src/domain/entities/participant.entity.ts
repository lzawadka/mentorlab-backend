import { User } from './user.entity';
import { Campaign } from './campaign.entity';
import { Team } from './team.entity';

export class Participant {
    id: number;
    user?: User; // Relation vers l'utilisateur
    campaign?: Campaign; // Relation vers la campagne
    team?: Team; // Relation vers l'équipe (optionnelle)
    userId: number;
    campaignId: number;
    teamId?: number;
    createdAt: Date;
}
