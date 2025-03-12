// leaderboard.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Participant, Team } from '@prisma/client';

@Injectable()
export class LeaderboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findCampaignById(campaignId: number): Promise<any> {
    return this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, type: true },
    });
  }

  async upsertParticipantLeaderboard(
    campaignId: number,
    participantId: number,
    points: number,
    rank: number,
  ): Promise<any> {
    return this.prisma.leaderboard.upsert({
      where: {
        campaignId_participantId: {
          campaignId,
          participantId,
        },
      },
      create: {
        campaignId,
        participantId,
        points,
        rank,
      },
      update: {
        points,
        rank,
        updatedAt: new Date(),
      },
    });
  }

  async upsertTeamLeaderboard(
    campaignId: number,
    teamId: number,
    points: number,
    rank: number,
  ): Promise<any> {
    return this.prisma.leaderboard.upsert({
      where: {
        campaignId_teamId: {
          campaignId,
          teamId,
        },
      },
      create: {
        campaignId,
        teamId,
        points,
        rank,
      },
      update: {
        points,
        rank,
        updatedAt: new Date(),
      },
    });
  }

  async deleteTeamEntries(campaignId: number) {
    return this.prisma.leaderboard.deleteMany({
      where: {
        campaignId,
        teamId: { not: null },
      },
    });
  }

  async deleteParticipantEntries(campaignId: number) {
    return this.prisma.leaderboard.deleteMany({
      where: {
        campaignId,
        participantId: { not: null },
      },
    });
  }

  async getLeaderboard(campaignId: number): Promise<any[]> {
    return this.prisma.leaderboard.findMany({
      where: { campaignId },
      orderBy: { rank: 'asc' },
      include: {
        participant: {
          include: { user: true },
        },
        team: true,
      },
    });
  }

  async getParticipantsByCampaign(campaignId: number): Promise<(Participant & {
    progress: any[];
    user: any;
  })[]> {
    return this.prisma.participant.findMany({
      where: { campaignId },
      include: {
        progress: { where: { campaignId } },
        user: true,
      },
    });
  }

  async getTeamsByCampaign(campaignId: number): Promise<(Team & {
    participants: (Participant & { progress: any[] })[];
  })[]> {
    return this.prisma.team.findMany({
      where: { campaignId },
      include: {
        participants: {
          include: {
            progress: { where: { campaignId } },
          },
        },
      },
    });
  }
}
