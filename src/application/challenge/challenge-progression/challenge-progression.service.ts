import { Injectable, NotFoundException } from '@nestjs/common';
import { ChallengeProgressionRepository } from '../../../infrastructure/repository/challenge-progression.repository';
import { UpdateChallengeProgressionDto } from './dto/request/update-challenge-progression-request.dto';
import { ChallengeProgressionResponseDto } from './dto/response/get-challenge-progression-response.dto';

@Injectable()
export class ChallengeProgressionService {
  constructor(
    private readonly challengeProgressRepository: ChallengeProgressionRepository,
  ) {}

  async deleteOldChallenges(participantId: number, campaignId: number): Promise<void> {
    return this.challengeProgressRepository.deleteOldChallenges(participantId, campaignId);
  }

  /**
   * Insère en bulk une liste de challenge progression
   */
  async bulkInsert(challenges: Array<{
    participantId: number;
    campaignId: number;
    challengeId: number;
    status: string;
  }>): Promise<void> {
    return this.challengeProgressRepository.bulkInsert(challenges);
  }

  /**
   * Trouve toutes les progressions pour un user/campaign
   */
  async findByUserAndCampaign(
    userId: number,
    campaignId: number
  ): Promise<ChallengeProgressionResponseDto[]> {
    return this.challengeProgressRepository.findByUserAndCampaign(userId, campaignId);
  }

  /**
   * Trouve la progression d’un challenge précis
   */
  async findByUserCampaignAndChallenge(
    userId: number,
    challengeId: number,
    campaignId: number
  ): Promise<ChallengeProgressionResponseDto | null> {
    return this.challengeProgressRepository.findByUserCampaignAndChallenge(
      userId,
      challengeId,
      campaignId
    );
  }

  /**
   * Met à jour un record de challenge progression
   */
  async update(
    challengeProgressionId: number,
    updateDto: UpdateChallengeProgressionDto
  ): Promise<ChallengeProgressionResponseDto> {
    return this.challengeProgressRepository.update(challengeProgressionId, updateDto);
  }

  /**
   * Supprime un record de challenge progression
   */
  async delete(challengeProgressionId: number): Promise<void> {
    this.challengeProgressRepository.delete(challengeProgressionId);
  }
}
