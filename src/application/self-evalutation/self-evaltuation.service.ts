import { Injectable } from '@nestjs/common';
import { SelfEvaluationRepository } from 'src/infrastructure/repository/self-evaluation.repository';
import { ParticipantService } from '../participant/participant.service';
import { CreateSelfEvaluationDto } from './dto/request/create-self-evalution.dto';
import { SelfEvaluation } from 'src/domain/entities/self-evaluation.entity';
import { LoggerService } from 'src/shared/logging/logger.service';

@Injectable()
export class SelfEvaluationService {
    constructor(
        private readonly selfEvaluationRepository: SelfEvaluationRepository,
        private readonly participantService: ParticipantService,
        private readonly logger: LoggerService,
    ) {
    }

    async createSelfEvaluation(data: CreateSelfEvaluationDto[], userId: number, campaignId: number): Promise<any> {
        
        const participant = await this.participantService.getParticipantByUserAndCampaign(userId, campaignId);
        
        const createdEvaluations: SelfEvaluation[] = await Promise.all(
            data.map(({ categoryId, score }) => {
                return this.selfEvaluationRepository.create(participant.id, categoryId, score)
            })
        );
        
        await this.logger.logFunctional('CreateSelfEvaluation', `User with ID ${userId} created self-evaluation for campaign with ID ${campaignId}`, userId);
        return createdEvaluations;
    }

    async getSelfEvaluationById(id: number): Promise<any> {
        const selfEvaluation = this.selfEvaluationRepository.findById(id);
        if(!selfEvaluation)
            throw new Error(`Self-evaluation with ID ${id} not found`);

        return selfEvaluation;
    }

    async getAllByUserAndCampaignId(userId: number, campaignId: number): Promise<any> {
        const participant = await this.participantService.getParticipantByUserAndCampaign(userId, campaignId);
        return this.selfEvaluationRepository.findAllByParticipantId(participant.id);
    }

    async updateSelfEvaluation(id: number, data: any): Promise<any> {
        await this.getSelfEvaluationById(id);
        const updatedSelfEvaluation = this.selfEvaluationRepository.update(id, data);
        await this.logger.logFunctional('UpdateSelfEvaluation', `Self-evaluation with ID ${id} updated`);

        return updatedSelfEvaluation;
    }

    async deleteSelfEvaluation(id: number): Promise<void> {
        await this.getSelfEvaluationById(id);
        await this.selfEvaluationRepository.delete(id);
        await this.logger.logFunctional('DeleteSelfEvaluation', `Self-evaluation with ID ${id} updated`);
    }
}