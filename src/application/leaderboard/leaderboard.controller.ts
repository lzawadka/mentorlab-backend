import { Controller, Post, Param, Get } from "@nestjs/common";
import { LeaderboardUseCase } from "./leaderboard.use-case";

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardUseCase: LeaderboardUseCase) {}

  @Post(':campaignId/recalc')
  async recalc(@Param('campaignId') campaignId: number) {
    await this.leaderboardUseCase.recalcLeaderboard(Number(campaignId));
  }

  @Get(':campaignId')
  async getLeaderboard(@Param('campaignId') campaignId: number) {
    return this.leaderboardUseCase.getLeaderboard(Number(campaignId));
  }
}
