import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCampaign(data: { clientId: number; title: string; description?: string; startDate: Date; endDate: Date }) {
    return this.prisma.campaign.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.campaign.findMany({
      include: {
        participants: true,
        teams: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.campaign.findUnique({
      where: { id },
      include: {
        participants: true,
        teams: true,
      },
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
