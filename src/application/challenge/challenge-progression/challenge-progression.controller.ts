import { Controller, Get, Delete, Body, Param, UseGuards, Put } from '@nestjs/common';
import { UpdateChallengeProgressionDto } from './dto/request/update-challenge-progression-request.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UserScoped } from 'src/shared/decorators/user-scoped.decorator';
import { UpdateChallengeProgressParamsDto } from './dto/request/update-challenge-progression-params.dto';
import { UserPermissionsGuard } from 'src/shared/guards/user.guard';
import { ChallengeProgressionResponseDto } from './dto/response/get-challenge-progression-response.dto';
import { ChallengeProgressionUseCase } from './challenge-progression.use-case';

@Controller('challenge-progression')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, UserPermissionsGuard)
export class ChallengeProgressionController {
  constructor(private readonly service: ChallengeProgressionUseCase) {}

  @Get('user/:userId/campaign/:campaignId')
  @UserScoped()
  async findByUser(
    @Param('userId') userId: number,
    @Param('campaignId') campaignId: number,
  ): Promise<Array<ChallengeProgressionResponseDto>> {
    return this.service.findByUserAndCampaign(Number(userId), Number(campaignId));
  }

  @Get('user/:userId/challenge/:challengeId/campaign/:campaignId')
  @UserScoped()
  async findChallengeProgressionByUserAndCampaign(
    @Param() params: UpdateChallengeProgressParamsDto,
  ): Promise<ChallengeProgressionResponseDto> {
    return this.service.findChallengeProgressionByUserAndCampaign(
      Number(params.userId),
      Number(params.challengeId),
      Number(params.campaignId),
    );
  }

  @Put('user/:userId/challenge/:challengeId/campaign/:campaignId')
  @UserScoped()
  async update(
    @Param() params: UpdateChallengeProgressParamsDto,
    @Body() updateDto: UpdateChallengeProgressionDto
  ): Promise<ChallengeProgressionResponseDto> {
    return this.service.update(
      Number(params.userId),
      Number(params.challengeId),
      Number(params.campaignId), 
      updateDto
    );
  }

  @Delete('user/:userId/challenge/:challengeId/campaign/:campaignId')
  @UserScoped()
  async delete(
    @Param() params: UpdateChallengeProgressParamsDto,
  ): Promise<void> {
    return this.service.delete(
      Number(params.userId),
      Number(params.challengeId),
      Number(params.campaignId)
    );
  }
}
