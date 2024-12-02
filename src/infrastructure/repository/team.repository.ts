import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTeam(name: string, campaignId: number, points: number = 0) {
    return this.prisma.team.create({
      data: {
        name,
        campaignId,
        points
      },
    });
  }

  async getByCampaignId(campaignId: number) {
    return this.prisma.team.findMany({
      where: { campaignId },
      include: {
        participants: true,
      },
    });
  }
}
