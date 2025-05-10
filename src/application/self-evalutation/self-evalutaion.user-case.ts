import { ChallengeProgressionService } from "../challenge/challenge-progression/challenge-progression.service";
import { ChallengeProgressionUseCase } from "../challenge/challenge-progression/challenge-progression.use-case";
import { ParticipantService } from "../participant/participant.service";
import { CreateSelfEvaluationDto } from "./dto/request/create-self-evalution.dto";
import { SelfEvaluationService } from "./self-evaltuation.service";


export class SelfEvaluationUseCase {
    constructor(
        private readonly selfEvaluationService: SelfEvaluationService,
        private readonly challengeProgressionUseCase: ChallengeProgressionUseCase,
        private readonly participantService: ParticipantService,

    ) {}

    async create(data: CreateSelfEvaluationDto[], userId: number, campaignId: number): Promise<any> {
        const participant = await this.participantService.getParticipantByUserAndCampaign(userId, campaignId);
        const createdEvaluations = await this.selfEvaluationService.createSelfEvaluation(data, userId, campaignId);
        await this.challengeProgressionUseCase.initializeAndGeneratePath(
            participant.id, 
            participant.campaignId, 
            participant.userId, 
            createdEvaluations
        );

        return createdEvaluations;
    }
}