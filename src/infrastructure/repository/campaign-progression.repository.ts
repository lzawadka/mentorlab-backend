import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeProgressionDto } from 'src/application/challenge/challenge-progression/dto/request/create-challenge-progression-request.dto';
import { ParticipantCampaignProgress } from '@prisma/client';

@Injectable()
export class CampaignProgressionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Récupérer toutes les progressions pour un participant
  async findByParticipantAndCampaign(participantId: number, campaignId: number) {
    return this.prisma.participantCampaignProgress.findUnique({
        where: {
          participantId_campaignId: { participantId, campaignId },
        },
    });
  }

  // Récupérer toutes les progressions pour un participant
  async findByCampaign(campaignId: number) {
    return this.prisma.participantCampaignProgress.findMany({
        where: {campaignId},
    });
  }

  // Récupérer toutes les progressions d'une campagne pour un utilisateur
  async findChallengeProgressionsByUserAndCampaign(userId: number, campaignId: number) {
    return await this.prisma.participantCampaignProgress.findFirst({
      where: {
        participant: {
          userId,
          campaignId,
        },
      },
      include: {
        participant: {
          select: { userId: true },
        },
      },
    });
  }

  // Récupérer toutes les progressions d'une campagne pour un utilisateur
  async findChallengeProgressionsByUser(userId: number) {
    return await this.prisma.participantCampaignProgress.findFirst({
      where: {
        participant: {
          userId
        },
      },
      include: {
        participant: {
          select: { userId: true },
        },
      },
    });
  }

  // Récupérer une progression spécifique d'un challenge pour un utilisateur et une campagne
  async findChallengeProgressionByCampaign(
    campaignId: number,
  ) {
    return await this.prisma.participantCampaignProgress.findMany({
      where: {
        campaignId
      },
      include: {
        participant: {
          select: { userId: true },
        },
      },
    });
  }

  // Mettre à jour une progression
  async createOrUpdateProgress(participantId: number, campaignId: number, data: Partial<ParticipantCampaignProgress>) {
    return this.prisma.participantCampaignProgress.upsert({
        where: {
          participantId_campaignId: { participantId, campaignId },
        },
        create: {
          participantId,
          campaignId,
          ...data,
        },
        update: {
          ...data,
        },
      });
  }

  // Supprimer une progression (si nécessaire)
  async delete(id: number) {
    return this.prisma.participantCampaignProgress.delete({
      where: { id },
    });
  }
}
