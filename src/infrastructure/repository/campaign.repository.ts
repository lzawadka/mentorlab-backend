import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCampaignRequestDto } from 'src/application/campaign/dto/request/update-campaign-request.dto';
import { CreateCampaignRequestDto } from 'src/application/campaign/dto/request/create-campaign-request.dto';

@Injectable()
export class CampaignRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCampaign(data: CreateCampaignRequestDto, magicCode: string) {
    return this.prisma.campaign.create({
      data: {
        clientId: data.clientId,
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        magicCode: magicCode,
        totalChallenges: data.totalChallenges,
        challenges: {
          create: data.challengeIds.map((challengeId) => ({
            challenge: {
              connect: { id: challengeId },
            },
          })),
        },
        categories: {
          create: data.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      }
    });
  }

  async findById(campaignId: number): Promise<any> {
    return this.prisma.campaign.findUnique({
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
        categories: true,
        challenges: true,
      },
    });
  }
  
  async findByClientId(clientId: number) {
    return this.prisma.campaign.findMany({
      where: { clientId },
    });
  }

  async findByMagicCode(magicCode: string) {
    return this.prisma.campaign.findUnique({
      where: { magicCode },
    });
  }

  async updateCampaign(id: number, data: UpdateCampaignRequestDto) {
    return this.prisma.campaign.update({
      where: { id },
      data: {
        clientId: data.clientId,
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        type: data.type,
        challenges: {
          deleteMany: {},
          create: data.challengeIds.map((categoryId) => ({
            challenge: {
              connect: { id: categoryId },
            },
          })),
        },
        categories: {
          deleteMany: {},
          create: data.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            userId: true,
            teamId: true,
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
        teams: true
      },
    });
  }

  async deleteCampaign(id: number) {
    return this.prisma.campaign.delete({
      where: { id },
    });
  }
}
