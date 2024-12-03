import { Injectable, NotFoundException } from '@nestjs/common';
import { CampaignRepository } from '../../infrastructure/repository/campaign.repository';
import { ParticipantRepository } from 'src/infrastructure/repository/participant.repository';
import { UserRepository } from 'src/infrastructure/repository/user.repository';
import { ClientRepository } from 'src/infrastructure/repository/client.repository';
import { CreateCampaignRequestDto } from 'src/application/dto/campaign/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from 'src/application/dto/campaign/request/update-campaign-request.dto';
import { CreateCampaignResponseDto } from 'src/application/dto/campaign/response/create-campaign-response.dto';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository,
    private readonly participantRepository: ParticipantRepository,
    private readonly userRepository: UserRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  async createCampaign(data: CreateCampaignRequestDto): Promise<CreateCampaignResponseDto> {
    const clientExists = await this.clientRepository.findById(data.clientId);
    if (!clientExists) throw new NotFoundException(`Client with ID ${data.clientId} does not exist`);
  
    const existingUsers = await this.userRepository.findByIds(data.userIds);
    if (existingUsers.length !== data.userIds.length) {
      throw new NotFoundException(`One or more users do not exist`);
    }
  
    const campaign = await this.campaignRepository.createCampaign({
      clientId: data.clientId,
      title: data.title,
      description: data.description,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
    });
  
    const existingParticipants = await this.participantRepository.findByCampaignAndUsers(
      campaign.id,
      data.userIds,
    );
    const newUserIds = data.userIds.filter(
      (userId) => !existingParticipants.some((participant) => participant.userId === userId),
    );
  
    const participants = newUserIds.map((userId) => ({
      userId,
      campaignId: campaign.id,
    }));
    const createdParticipants = await this.participantRepository.createParticipants(participants);
  
    return {
      ...campaign,
      participantIds: createdParticipants.map((participant) => participant.id),
    };
  }

  async updateCampaign(id: number, data: UpdateCampaignRequestDto,) {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) throw new NotFoundException(`Campaign with ID ${id} not found`);
    if (data.userIds && data.userIds.length > 0) {
      const existingParticipants = await this.participantRepository.findByCampaignAndUsers(
        id,
        data.userIds,
      );
      const newUserIds = data.userIds.filter(
        (userId) => !existingParticipants.some((participant) => participant.userId === userId),
      );

      const participants = newUserIds.map((userId) => ({
        userId,
        campaignId: id,
      }));
      await this.participantRepository.createParticipants(participants);
    }

    const updatedCampaign = await this.campaignRepository.updateCampaign(id, data);

    return updatedCampaign;
  }


  async getById(id: number) {
    return this.campaignRepository.findById(id);
  }

  async getByClientId(id: number) {
    return this.campaignRepository.findByClientId(id);
  }

  async getCampaignById(id: number) {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) throw new NotFoundException(`Campaign with ID ${id} not found`);
    return campaign;
  }

  async deleteCampaign(id: number) {
    return this.campaignRepository.deleteCampaign(id);
  }
}
