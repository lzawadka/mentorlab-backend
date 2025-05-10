import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTeamRequestDto } from './dto/request/create-team-request.dto';
import { TeamService } from './team.service';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UpdateTeamRequestDto } from './dto/request/update-team-request.dto';
import { GetTeamResponseDto } from './dto/response/get-team-response.dto';

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
  @Post('client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  @ClientScoped()
  async createTeam(@Body() data: CreateTeamRequestDto) {
      return this.teamService.createTeam(data);
  }

  @ApiOperation({ summary: "Get teams by campaign ID" })
  @ApiResponse({
      status: 200,
      description: 'Teams retrieved successfully',
      type: [Array<GetTeamResponseDto>]
  })
  @ApiResponse({
      status: 404,
      description: 'Campaign not found or no teams associated with the campaign',
  })
  @Get('campaign/:campaignId/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH, UserRole.PARTICIPANT)
  @ClientScoped()
  async getTeamByCampaignId(@Param('campaignId') campaignId: number): Promise<GetTeamResponseDto[]> {
      return this.teamService.getTeamByCampaignId(Number(campaignId));
  }

  @ApiOperation({ summary: "Get teams by campaign ID" })
  @ApiResponse({
      status: 200,
      description: 'Teams retrieved successfully',
      type: [Array<GetTeamResponseDto>]
  })
  @ApiResponse({
      status: 404,
      description: 'Campaign not found or no teams associated with the campaign',
  })
  @Get(':id/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH, UserRole.PARTICIPANT)
  @ClientScoped()
  async getTeamBId(@Param('id') id: number): Promise<GetTeamResponseDto> {
      return this.teamService.getTeamById(Number(id));
  }

  @ApiOperation({ summary: "Update team by ID" })
  @ApiResponse({
      status: 200,
      description: 'Team retrieved successfully',
  })
  @ApiResponse({
      status: 404,
      description: 'Team not found',
  })
  @Put(':id/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  @ClientScoped()
  async updateTeam(@Param('id') id: number, @Body() data: UpdateTeamRequestDto) {
      return this.teamService.updateTeam(Number(id), data);
  }

  @ApiOperation({ summary: "Delete team by ID" })
  @ApiResponse({
      status: 200,
      description: 'Team successfully deleted',
  })
  @ApiResponse({
      status: 404,
      description: 'Team not found',
  })
  @Delete(':id/client/:clientId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async deleteTeam(@Param('id') id: number) {
      return this.teamService.deleteTeam(Number(id));
  }
}
