import { Injectable } from "@nestjs/common";
import { ProgressStatus } from "src/domain/enums/progress-status.enum";
import { CampaignProgressionRepository } from "src/infrastructure/repository/campaign-progression.repository";
import { ChallengeProgressionRepository } from "src/infrastructure/repository/challenge-progression.repository";

@Injectable()
export class CampaignProgressionService {
    constructor(
        private readonly campaignProgressRepository: CampaignProgressionRepository,
        private readonly challengeProgressRepository: ChallengeProgressionRepository,
      ) {}

    async createOrUpdateParticipantCampaignProgress(particpantId: number, userId: number, campaignId: number): Promise<void> {
        const challengeProgressions = await this.challengeProgressRepository.findByUserAndCampaign(userId, campaignId);

        // Compter les challenges complétés et en cours
        const challengesCompleted = challengeProgressions.filter(
            (progression) => progression.status === ProgressStatus.COMPLETED
        ).length;

        const challengesInProgress = challengeProgressions.filter(
            (progression) => progression.status === ProgressStatus.IN_PROGRESS
        ).length;

        const totalChallenges = challengeProgressions.length;

        // Calculer le pourcentage de progression
        const progressPercentage = Math.round((challengesCompleted / totalChallenges) * 100);

        // Mettre à jour la table ParticipantCampaignProgress
        await this.campaignProgressRepository.createOrUpdateProgress(particpantId, campaignId, {
            challengesCompleted,
            challengesInProgress,
            progressPercentage,
        });
    }
    
    async getChallengeProgressionsByUserAndCampaign(userId: number, campaignId: number) {
        return await this.campaignProgressRepository.findChallengeProgressionsByUserAndCampaign(userId, campaignId);
    }

    async getChallengeProgressionByCampaign(campaignId: number) {
        return await this.campaignProgressRepository.findChallengeProgressionByCampaign(campaignId);
    }

    async getChallengeProgressionsByUser(userId: number) {
        return await this.campaignProgressRepository.findChallengeProgressionsByUser(userId);
    }

    async delete(userId: number, campaignId: number, challengeId: number) {
        await this.challengeProgressRepository.findByUserCampaignAndChallenge(userId, challengeId, campaignId);
    }
}