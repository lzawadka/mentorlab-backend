import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetParticipantResponseDto } from 'src/application/participant/dto/response/get-particpant-response.dto';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
@Injectable()
export class ParticipantService {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly campaignRepository: CampaignRepository
  ) {}

  async createParticipant(data: { userId: number; campaignId: number; teamId?: number }) {
    const campaignExists = await this.campaignRepository.findById(data.campaignId);
    if (!campaignExists)
      throw new NotFoundException(`Campaign with ID ${data.campaignId} does not exist`);

    const existingParticipant = await this.participantRepository.findParticipantByIdAndCampaign(data.userId, data.campaignId);
    if (existingParticipant)
      throw new Error(`Participant already exists for campaign with ID ${data.campaignId} and userId: ${data.userId}`);

    const createdParticipant = await this.participantRepository.createParticipant(data.userId, data.campaignId, data.teamId);

    return createdParticipant;
  }

  async createParticipants(data: { users: { userId: number; teamId?: number }[]; campaignId: number }) {
    for (const user of data.users) {
      const existingParticipant = await this.participantRepository.findParticipantByIdAndCampaign(
        user.userId,
        data.campaignId,
      );
      
      if (existingParticipant) {
        console.warn(`Participant already exists for campaign with ID ${data.campaignId} and userId: ${user.userId}`);
        continue;
      }
  
      // Créer le participant
      await this.participantRepository.createParticipant(user.userId, data.campaignId, user.teamId);
    }
  }

  async findParticipantById(participantId: number) {
    return this.participantRepository.findParticipantById(participantId);
  }

  async getParticipantsByCampaign(campaignId: number): Promise<Array<GetParticipantResponseDto>> {
    const particpants =  this.participantRepository.findParticipantsByCampaign(campaignId);
    return plainToInstance(Array<GetParticipantResponseDto>, particpants, {
      excludeExtraneousValues: true,
    });
  }

  async getParticipantsByUser(userId: number) {
    const participant = await this.participantRepository.findParticipantsByUser(userId);
    if (!participant) {
      throw new NotFoundException('Participant not found');
    }
    return participant;
  }

  async getParticipantByUserAndCampaign(userId: number, campaignId: number) {
    const participant = await this.participantRepository.findParticipantByUserAndCampaign(userId, campaignId);
    if (!participant)
      throw new NotFoundException(`Participant with userId: ${userId} and campaignId: ${campaignId} not found`)
    
    return participant;
  }

  async getByCampaignAndUsers(campaignId: number, userIds: number[]) {
    return this.participantRepository.findByCampaignAndUsers(campaignId, userIds);
  }

  async deleteParticipant(id: number) {
    await this.participantRepository.deleteParticipant(id);
  }
}
