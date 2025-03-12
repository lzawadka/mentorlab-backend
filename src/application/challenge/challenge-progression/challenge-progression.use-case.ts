import { Injectable, NotFoundException } from '@nestjs/common';
import { ParticipantService } from '../../participant/participant.service';
import { CampaignProgressionService } from '../../campaign/campaign-progression/campaign-progression.service';
import { UserPathService } from 'src/domain/service/user/user-path.service';
import { CampaignService } from 'src/application/campaign/campaign.service';
import { SelfEvaluationService } from 'src/application/self-evalutation/self-evaltuation.service';
import { LeaderboardService } from 'src/application/leaderboard/leaderboard.service';
import { LoggerService } from 'src/shared/logging/logger.service';
import { LogType } from 'src/domain/enums/log-type.enum';
import { UpdateChallengeProgressionDto } from './dto/request/update-challenge-progression-request.dto';
import { ChallengeProgressionResponseDto } from './dto/response/get-challenge-progression-response.dto';
import { ProgressStatus } from 'src/domain/enums/progress-status.enum';
import { ChallengeProgressionMapper } from './mapper/challenge-progression.mapper';
import { ChallengeProgressionService } from './challenge-progression.service';

@Injectable()
export class ChallengeProgressionUseCase {
  constructor(
    private readonly challengeProgressService: ChallengeProgressionService,

    private readonly participantService: ParticipantService,
    private readonly campaignProgressService: CampaignProgressionService,
    private readonly userPathService: UserPathService,
    private readonly campaignService: CampaignService,
    private readonly selfEvaluationService: SelfEvaluationService,
    private readonly leaderboardService: LeaderboardService,
    private readonly logger: LoggerService,
  ) {}

  async initializeAndGeneratePath(
    participantId: number,
    campaignId: number,
    userId: number,
    selfEvaluations: any
  ): Promise<void> {
    try {
      // delete old challenges
      await this.challengeProgressService.deleteOldChallenges(participantId, campaignId);

      // generate new challenges
      await this.generateAndInsertChallenges(participantId, campaignId, selfEvaluations);

      // update campaign progress
      try {
        await this.campaignProgressService.createOrUpdateParticipantCampaignProgress(
          participantId,
          userId,
          campaignId
        );
      } catch (error) {
        await this.logger.logTechnical(
          'InitializeAndGeneratePath',
          `Failed to update campaign progress with ID ${campaignId}`,
          LogType.ERROR,
          userId
        );
        throw new Error('Failed to update campaign progress.');
      }
    } catch (error) {
      await this.logger.logTechnical(
        'InitializeAndGeneratePath',
        `Failed to initialize and generate path. StackTrace:  ${error.message}`,
        LogType.ERROR,
        userId
      );
      throw new Error(`Failed to initialize and generate path. StackTrace:  ${error.message}`);
    }
  }

  async generateAndInsertChallenges(
    participantId: number,
    campaignId: number,
    selfEvaluations: any
  ): Promise<void> {
    const completedChallenges = await this.getCompletedChallengesByUserAndCampaign(
      participantId,
      campaignId
    );

    const campaign = await this.campaignService.getById(campaignId);
    if (!campaign || campaign.totalChallenges <= 0)
      throw new Error('Campaign totalChallenges is not properly defined.');

    const generatedChallenges = await this.userPathService.generateUserPath(
      completedChallenges,
      selfEvaluations
    );

    const newChallenges = generatedChallenges.map((challenge) => ({
      participantId,
      campaignId,
      challengeId: challenge.challengeId,
      status: 'NOT_STARTED',
    }));

    try {
      if (newChallenges.length > 0) {
        await this.challengeProgressService.bulkInsert(newChallenges);
      }
    } catch (error) {
      await this.logger.logTechnical(
        'InitializeAndGeneratePath',
        `Failed to insert challenges for participant with ID ${participantId}`,
        LogType.ERROR
      );
      throw new Error(
        `Failed to insert challenges into database for participant with ID ${participantId}`
      );
    }
  }

  async refreshChallenges(userId: number, campaignId: number): Promise<void> {
    try {
      const participant = await this.participantService.getParticipantByUserAndCampaign(
        userId,
        campaignId
      );
      // Domain Service
      await this.challengeProgressService.deleteOldChallenges(participant.id, campaignId);

      const selfEvaluations = await this.selfEvaluationService.getAllByUserAndCampaignId(
        userId,
        campaignId
      );

      await this.generateAndInsertChallenges(participant.id, campaignId, selfEvaluations);

      await this.logger.logTechnical(
        'refreshChallenges',
        `Refreshed challenges for participant ${participant.id}.`,
        LogType.INFO
      );
    } catch (error) {
      await this.logger.logTechnical(
        'refreshChallenges',
        `Failed to refresh challenges. StackTrace: ${error.message}`,
        LogType.ERROR
      );
      throw new Error('Failed to refresh challenges.');
    }
  }

  async findByUserAndCampaign(
    userId: number,
    campaignId: number
  ): Promise<ChallengeProgressionResponseDto[]> {
    const participant = await this.participantService.getParticipantByUserAndCampaign(
      userId,
      campaignId
    );
    if (!participant) {
      throw new NotFoundException(
        `Participant with userId: ${userId} and campaignId: ${campaignId} not found`
      );
    }

    // Domain Service
    const result = await this.challengeProgressService.findByUserAndCampaign(
      userId,
      campaignId
    );

    if (!result || result.length === 0) {
      throw new NotFoundException(`No progressions found for participant with ID ${participant.id}`);
    }

    return ChallengeProgressionMapper.toListResponse(result);
  }

  async findChallengeProgressionByUserAndCampaign(
    userId: number,
    challengeId: number,
    campaignId: number
  ): Promise<ChallengeProgressionResponseDto> {
    // Domain Service
    const result = await this.challengeProgressService.findByUserCampaignAndChallenge(
      userId,
      challengeId,
      campaignId
    );

    if (!result) {
      throw new NotFoundException(
        `No progression found for user with ID ${userId} and challenge ID ${challengeId}`
      );
    }

    return ChallengeProgressionMapper.toFullResponse(result);
  }

  async update(
    userId: number,
    challengeId: number,
    campaignId: number,
    updateDto: UpdateChallengeProgressionDto
  ): Promise<ChallengeProgressionResponseDto> {
    try {
      const participant = await this.participantService.getParticipantByUserAndCampaign(
        userId,
        campaignId
      );

      // On vérifie l'existence via le domain service
      const challengeProgression = await this.findChallengeProgressionByUserAndCampaign(
        userId,
        challengeId,
        campaignId
      );

      // Ensuite on update via le domain service
      const updatedChallengeProgress = await this.challengeProgressService.update(
        challengeProgression.id,
        updateDto
      );

      if (updateDto.status === ProgressStatus.COMPLETED) {
        // refresh then recalc leaderboard
        await this.refreshChallenges(participant.id, campaignId);
        await this.leaderboardService.recalcLeaderboard(campaignId, await this.participantService.getParticipantsByCampaign(campaignId));
      }

      if (
        updateDto.status === ProgressStatus.COMPLETED ||
        updateDto.status === ProgressStatus.IN_PROGRESS
      ) {
        await this.campaignProgressService.createOrUpdateParticipantCampaignProgress(
          participant.id,
          userId,
          campaignId
        );
      }

      await this.logger.logFunctional(
        'UpdateChallengeProgression',
        `Challenge progression ${challengeProgression.id} updated`
      );

      return ChallengeProgressionMapper.toFullResponse(updatedChallengeProgress);
    } catch (error) {
      await this.logger.logTechnical(
        'UpdateChallengeProgression',
        `Failed to update challenge progression. StackTrace: ${error.message}`,
        LogType.ERROR
      );
      throw new Error('Failed to update challenge progression.');
    }
  }

  async delete(userId: number, challengeId: number, campaignId: number): Promise<void> {
    const participant = await this.participantService.getParticipantByUserAndCampaign(
      userId,
      campaignId
    );
    if (!participant) {
      throw new NotFoundException(
        `Participant with userId: ${userId} and campaignId: ${campaignId}`
      );
    }

    const challengeProgression = await this.findChallengeProgressionByUserAndCampaign(
      participant.id,
      challengeId,
      campaignId
    );
    if (!challengeProgression) {
      throw new NotFoundException(
        `Progression not found with challengeId: ${challengeId} and participantId: ${participant.id}`
      );
    }

    // On passe par le domain service
    await this.challengeProgressService.delete(challengeProgression.id);
    await this.logger.logFunctional(
      'DeleteChallengeProgression',
      `Challenge progression ${challengeProgression.id} deleted`,
      userId
    );
  }

  async getCompletedChallengesByUserAndCampaign(
    userId: number,
    campaignId: number
  ): Promise<number[]> {
    const completedChallenges =
      await this.challengeProgressService.findByUserAndCampaign(userId, campaignId);
    return completedChallenges.map((completion) => completion.challengeId);
  }
}
