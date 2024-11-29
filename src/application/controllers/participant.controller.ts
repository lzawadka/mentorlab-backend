import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ParticipantService } from 'src/domain/services/participant.service';
import { CreateParticpantRequestDto } from '../dto/participant/request/create-participant-request.dto';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  async createParticipant(@Body() data: CreateParticpantRequestDto) {
    return this.participantService.createParticipant(data);
  }

  @Get('campaign/:campaignId')
  async getParticipantsByCampaign(@Param('campaignId') campaignId: string) {
    return this.participantService.getParticipantsByCampaign(Number(campaignId));
  }

  @Get('user/:userId')
  async getParticipantByUser(@Param('userId') userId: string) {
    return this.participantService.getParticipantByUser(Number(userId));
  }

  @Delete(':id')
  async deleteParticipant(@Param('id') id: string) {
    await this.participantService.deleteParticipant(Number(id));
  }
}
