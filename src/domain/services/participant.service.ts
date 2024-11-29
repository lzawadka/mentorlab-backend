import { Injectable, NotFoundException } from '@nestjs/common';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly campaignRepository: CampaignRepository, // Ajout du repository de campagne
  ) {}

  async createParticipant(data: { userId: number; campaignId: number; teamId?: number }) {
    // Vérifie que la campagne existe
    const campaignExists = await this.campaignRepository.findById(data.campaignId);
    if (!campaignExists) {
      throw new NotFoundException(`Campaign with ID ${data.campaignId} does not exist`);
    }

    // Vérifie que le participant n'existe pas déjà pour cette campagne
    const existingParticipant = await this.participantRepository.findParticipantByIdAndCampaign(data.userId, data.campaignId);
    if (existingParticipant) {
      throw new Error(`Participant already exists for campaign with ID ${data.campaignId}`);
    }

    // Crée le participant
    return this.participantRepository.createParticipant(data.userId, data.campaignId, data.teamId);
  }

  async getParticipantsByCampaign(campaignId: number) {
    return this.participantRepository.findParticipantsByCampaign(campaignId);
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
