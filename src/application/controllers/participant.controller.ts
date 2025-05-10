import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ParticipantService } from 'src/domain/services/participant.service';
import { CreateParticpantRequestDto } from '../dto/participant/request/create-participant-request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetParticipantResponseDto } from '../dto/participant/response/get-particpant-response.dto';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @ApiOperation({ summary: "Create a new participant" })
  @ApiResponse({
      status: 201,
      description: 'Participant successfully created',
  })
  @ApiResponse({
      status: 400,
      description: 'Bad request or validation error',
  })
  @Post()
  async createParticipant(@Body() data: CreateParticpantRequestDto) {
      return this.participantService.createParticipant(data);
  }

  @ApiOperation({ summary: "Get participants by campaign ID" })
  @ApiResponse({
      status: 200,
      description: 'Participants retrieved successfully'
  })
  @ApiResponse({
      status: 404,
      description: 'Campaign not found or no participants associated with the campaign',
  })
  @Get('campaign/:campaignId')
  async getParticipantsByCampaign(@Param('campaignId') campaignId: string): Promise<GetParticipantResponseDto> {
      return this.participantService.getParticipantsByCampaign(Number(campaignId));
  }

  @ApiOperation({ summary: "Get participant by user ID" })
  @ApiResponse({
      status: 200,
      description: 'Participant retrieved successfully'
  })
  @ApiResponse({
      status: 404,
      description: 'User not found or no participants associated with the user',
  })
  @Get('user/:userId')
  async getParticipantByUser(@Param('userId') userId: string) {
      return this.participantService.getParticipantByUser(Number(userId));
  }

  @ApiOperation({ summary: "Delete a participant by ID" })
  @ApiResponse({
      status: 200,
      description: 'Participant successfully deleted',
  })
  @ApiResponse({
      status: 404,
      description: 'Participant not found',
  })
  @Delete(':id')
  async deleteParticipant(@Param('id') id: string) {
      await this.participantService.deleteParticipant(Number(id));
  }

}
