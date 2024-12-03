import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Participant } from 'src/domain/entities/participant.entity';

@Injectable()
export class ParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findParticipantByIdAndCampaign(participantId: number, campaignId: number) {
    return this.prisma.participant.findFirst({
      where: { id: participantId, campaignId },
    });
  }

  async createParticipant(userId: number, campaignId: number, teamId?: number) {
    return this.prisma.participant.create({
      data: {
        userId,
        campaignId,
        teamId,
      },
    });
  }

  async findParticipantsByCampaign(campaignId: number) {
    return this.prisma.participant.findMany({
      where: { campaignId },
      include: { user: true, team: true },
    });
  }

  async findParticipantByUser(userId: number) {
    return this.prisma.participant.findMany({
      where: { userId },
      include: { campaign: true },
    });
  }

  async deleteParticipant(participantId: number) {
    return this.prisma.participant.delete({
      where: { id: participantId },
    });
  }

  async createParticipants(participants: { userId: number; campaignId: number }[]): Promise<Participant[]> {
    await this.prisma.participant.createMany({
      data: participants,
      skipDuplicates: true,
    });
  
    return this.prisma.participant.findMany({
      where: {
        OR: participants.map((participant) => ({
          userId: participant.userId,
          campaignId: participant.campaignId,
        })),
      },
    });
  }
  

  async findByIds(participantIds: number[]) {
    return this.prisma.participant.findMany({
      where: {
        id: { in: participantIds },
      },
    });
  }

  async updateParticipantTeam(participantId: number, teamId: number) {
    return this.prisma.participant.update({
      where: { id: participantId },
      data: { teamId },
    });
  }

  async findByCampaignAndUsers(
    campaignId: number,
    userIds: number[],
  ): Promise<Participant[]> {
    return this.prisma.participant.findMany({
      where: {
        campaignId,
        userId: { in: userIds },
      },
    });
  }
  
}
