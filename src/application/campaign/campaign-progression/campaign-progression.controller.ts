import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { UserPermissionsGuard } from "src/shared/guards/user.guard";
import { CampaignProgressionService } from "./campaign-progression.service";
import { UserScoped } from "src/shared/decorators/user-scoped.decorator";
import { UpdateChallengeProgressParamsDto } from "../../challenge/challenge-progression/dto/request/update-challenge-progression-params.dto";
import { UpdateChallengeProgressionDto } from "../../challenge/challenge-progression/dto/request/update-challenge-progression-request.dto";
import { ChallengeProgressionResponseDto } from "../../challenge/challenge-progression/dto/response/get-challenge-progression-response.dto";
import { Roles } from "src/shared/decorators/roles.decorator";
import { UserRole } from "src/domain/enums/user-role.enum";

@Controller('campaign-progression')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, UserPermissionsGuard)
export class CampaignProgressionController {
constructor(private readonly campaignProgressionService: CampaignProgressionService) {}

  @Get('user/:userId/campaign/:campaignId')
  @UserScoped()
  async findChallengeProgressionsByUserAndCampaign(
    @Param('userId') userId: number,
    @Param('campaignId') campaignId: number,
  ) {
    return this.campaignProgressionService.getChallengeProgressionsByUserAndCampaign(
        Number(userId), 
        Number(campaignId)
    );
  }

  @Get('campaign/:campaignId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  async findChallengeProgressionByUserCampaignAndChallenge(
    @Param('campaignId') campaignId: number,
  ) {
    return this.campaignProgressionService.getChallengeProgressionByCampaign(
      Number(campaignId)
    );
  }
  
  @Get('user/:userId')
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  async findChallengeProgressionsByUser(
    @Param('userId') userId: number,
  ) {
    return this.campaignProgressionService.getChallengeProgressionsByUser(
      Number(userId)
    );
  }

  @Delete('user/:userId/challenge/:challengeId/campaign/:campaignId')
  @UserScoped()
  async delete(
    @Param() params: UpdateChallengeProgressParamsDto,
  ): Promise<void> {
    return this.campaignProgressionService.delete(
      Number(params.userId),
      Number(params.challengeId),
      Number(params.campaignId)
    );
  }

}