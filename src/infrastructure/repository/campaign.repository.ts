import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Campaign } from 'src/domain/entities/campaign.entity';
import { GetCampaignResponseDto } from 'src/application/dto/campaign/response/get-campaign-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCampaign(data: { clientId: number; title: string; description?: string; startDate: Date; endDate: Date; type: string }) {
    return this.prisma.campaign.create({
      data,
    });
  }

  async findById(campaignId: number): Promise<GetCampaignResponseDto> {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        client: true,
        participants: {
          select: {
              id: true,
              userId: true,
              createdAt: true,
              user: {
                  select: {
                      id: true,
                      email: true,
                      firstName: true,
                      lastName: true,
                      role: true,
                  },
              },
          },
      },
        teams: true,
      },
    });
  
    if (!campaign) {throw new NotFoundException(`Campaign with ID ${campaignId} not found`);}

    return plainToInstance(GetCampaignResponseDto, campaign, {
      excludeExtraneousValues: true,
    });
  }
  
  async findByClientId(clientId: number) {
    return this.prisma.campaign.findMany({
      where: { clientId },
    });
  }


  async updateCampaign(id: number, data: { title?: string; description?: string; startDate?: Date; endDate?: Date }) {
    return this.prisma.campaign.update({
      where: { id },
      data,
    });
  }

  async deleteCampaign(id: number) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
