import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetParticipantResponseDto } from 'src/application/dto/participant/response/get-particpant-response.dto';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly campaignRepository: CampaignRepository, // Ajout du repository de campagne
  ) {}

  async createParticipant(data: { userId: number; campaignId: number; teamId?: number }) {
    const campaignExists = await this.campaignRepository.findById(data.campaignId);
    if (!campaignExists) {
      throw new NotFoundException(`Campaign with ID ${data.campaignId} does not exist`);
    }

    const existingParticipant = await this.participantRepository.findParticipantByIdAndCampaign(data.userId, data.campaignId);
    if (existingParticipant) {
      throw new Error(`Participant already exists for campaign with ID ${data.campaignId}`);
    }

    return this.participantRepository.createParticipant(data.userId, data.campaignId, data.teamId);
  }

  async getParticipantsByCampaign(campaignId: number): Promise<GetParticipantResponseDto> {
    const particpants =  this.participantRepository.findParticipantsByCampaign(campaignId);
    return plainToInstance(GetParticipantResponseDto, particpants, {
      excludeExtraneousValues: true,
    });
  }

  async getParticipantByUser(userId: number) {
    const participant = await this.participantRepository.findParticipantByUser(userId);
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }
    return participant;
  }

  async deleteParticipant(id: number) {
    await this.participantRepository.deleteParticipant(id);
  }
}
