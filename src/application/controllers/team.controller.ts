import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TeamService } from 'src/domain/services/team.service';
import { CreateTeamRequestDto } from '../dto/team/request/create-team-request.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async createTeam(@Body() data: CreateTeamRequestDto) {
    return this.teamService.createTeam(data);
  }

  @Get(':campaignId')
  async getTeamByCampaignId(@Param('campaignId') campaignId: number) {
    return this.teamService.getTeamByCampaignId(Number(campaignId));
  }
}
