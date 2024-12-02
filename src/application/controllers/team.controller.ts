import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TeamService } from 'src/domain/services/team.service';
import { CreateTeamRequestDto } from '../dto/team/request/create-team-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: "Create a new team" })
  @ApiResponse({
      status: 201,
      description: 'Team successfully created',
  })
  @ApiResponse({
      status: 400,
      description: 'Bad request or validation error',
  })
  @Post()
  async createTeam(@Body() data: CreateTeamRequestDto) {
      return this.teamService.createTeam(data);
  }

  @ApiOperation({ summary: "Get teams by campaign ID" })
  @ApiResponse({
      status: 200,
      description: 'Teams retrieved successfully',
  })
  @ApiResponse({
      status: 404,
      description: 'Campaign not found or no teams associated with the campaign',
  })
  @Get(':campaignId')
  async getTeamByCampaignId(@Param('campaignId') campaignId: number) {
      return this.teamService.getTeamByCampaignId(Number(campaignId));
  }

}
