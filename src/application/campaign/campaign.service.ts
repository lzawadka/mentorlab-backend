import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampaignRequestDto } from 'src/application/campaign/dto/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from 'src/application/campaign/dto/request/update-campaign-request.dto';
import { CreateCampaignResponseDto } from 'src/application/campaign/dto/response/create-campaign-response.dto';
import { GetCampaignResponseDto } from 'src/application/campaign/dto/response/get-campaign-response.dto';
import { plainToInstance } from 'class-transformer';
import { GetUserParticipantDto } from 'src/application/participant/dto/response/get-user-participant-response.dto';
import { UpdateCampaignResponseDto } from 'src/application/campaign/dto/response/update-campaign-response.dto';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { ParticipantService } from '../participant/participant.service';
import { ClientService } from '../client/client.service';
import { UserService } from '../user/user.service';
import { LoggerService } from 'src/shared/logging/logger.service';
import { LogType } from 'src/domain/enums/log-type.enum';

@Injectable()
export class CampaignService {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private readonly participantService: ParticipantService,
    private readonly userService: UserService,
    private readonly clientService: ClientService,
    private readonly logger: LoggerService,
  ) {}

  async createCampaign(data: CreateCampaignRequestDto): Promise<CreateCampaignResponseDto> {
    const clientExists = await this.clientService.getClientById(data.clientId);
    if (!clientExists) {
      await this.logger.logTechnical('CreateCampaign', `Campaign ${data.title} not created. Client with ID ${data.clientId} does not exist`, LogType.ERROR);
      throw new NotFoundException(`Client with ID ${data.clientId} does not exist`);
    } 
  
    const existingUsers = await this.userService.findByIds(data.userIds);
    if (existingUsers.length !== data.userIds.length)
      throw new NotFoundException(`One or more users do not exist`);
  
    const campaign = await this.campaignRepository.createCampaign(
      data,
      this.generateMagicCode()
    );
  
    const existingParticipants = await this.participantService.getByCampaignAndUsers(
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

    const createdParticipants = await Promise.all(
      participants.map(async (participant) => await this.participantService.createParticipant(participant))
    );

    await this.logger.logFunctional('CreateCampaign', `Campaign ${data.title} created`);
  
    return {
      ...campaign,
      participantIds: createdParticipants.map((participant) => participant.id),
    };
  }

  async updateCampaign(
    id: number,
    data: UpdateCampaignRequestDto
  ): Promise<UpdateCampaignResponseDto> {
    // Check if the campaign exists
    const campaign = await this.campaignRepository.findById(id);

    if (!campaign) 
      throw new NotFoundException(`Campaign with ID ${id} not found`);
  
    // Handle userIds if provided
    if (data.userIds?.length > 0) await this.handleParticipantsUpdate(id, data.userIds);

    // Handle update campaign
    const updatedCampaign = await this.campaignRepository.updateCampaign(id, {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      type: data.type,
      challengeIds: data.challengeIds,
      categoryIds: data.categoryIds
    });

    const transformedParticipants = updatedCampaign.participants.map((participant) =>
      plainToInstance(GetUserParticipantDto, {
        participantId: participant.id,
        userId: participant.userId,
        campaignId: updatedCampaign.id,
        teamId: participant.teamId,
        createdAt: participant.createdAt,
        firstName: participant.user.firstName,
        lastName: participant.user.lastName,
        role: participant.user.role,
        email: participant.user.email,
      })
    );
  
    // Prepare the final response
    const transformedCampaign = plainToInstance(
      UpdateCampaignResponseDto,
      {
        ...updatedCampaign,
        user: transformedParticipants,
        teams: updatedCampaign.teams,
      },
      { excludeExtraneousValues: true }
    );
  
    await this.logger.logFunctional('UdpateCampaign', `Campaign ${id} updated`);
    // Map to the response DTO
    return plainToInstance(UpdateCampaignResponseDto, transformedCampaign, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: number): Promise<GetCampaignResponseDto> {
    const campaign = await this.campaignRepository.findById(id);
    if (!campaign) {
      await this.logger.logTechnical('UdpateCampaign', `Campaign ${id} not updated, campaign does not exist`, LogType.ERROR);
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    } 

    // Map Participant/User to DTO 
    const transformedParticipants = campaign.participants.map((participant) =>
      plainToInstance(GetUserParticipantDto, {
        participantId: participant.id,
        userId: participant.userId,
        campaignId: campaign.id,
        teamId: participant.teamId,
        createdAt: participant.createdAt,
        ...participant.user,
      })
    );

    // Map Campaign to DTO 
    const transformedCampaign = plainToInstance(
      GetCampaignResponseDto,
      {
        ...campaign,
        user: transformedParticipants,
        teams: campaign.teams,
      },
      { excludeExtraneousValues: true }
    );
  
    return transformedCampaign;
  }

  async getByClientId(id: number): Promise<GetCampaignResponseDto[]> {
    return this.campaignRepository.findByClientId(id);
  }

  async deleteCampaign(id: number): Promise<void> {
    await this.getById(id);
    this.campaignRepository.deleteCampaign(id);
    await this.logger.logFunctional('DeleteCampaign', `Campaign ${id} deleted`);
  }
  
  async getByMagicCode(magicCode: string): Promise<GetCampaignResponseDto> {
    const campaign = await this.campaignRepository.findByMagicCode(magicCode);
    if (!campaign) throw new NotFoundException(`Campaign with magiCode ${magicCode} not found`);
    return campaign
  }

  private generateMagicCode(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private async handleParticipantsUpdate(
    campaignId: number,
    userIds: number[]
  ): Promise<void> {
    // Retrieve existing participants for the campaign
    const existingParticipants =
      await this.participantService.getByCampaignAndUsers(campaignId, userIds);
  
    // Determine new user IDs
    const newUserIds = userIds.filter(
      (userId) =>
        !existingParticipants.some(
          (participant) => participant.userId === userId
        )
    );
  
    // Create new participants for the campaign
    if (newUserIds.length > 0) {
      const newParticipants = {
        users: newUserIds.map((userId) => ({
          userId
        })),
        campaignId,
      };
    
      await this.participantService.createParticipants(newParticipants);
    }
  }
}
