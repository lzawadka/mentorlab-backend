import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CampaignService } from './campaign.service';
import { CreateCampaignRequestDto } from './dto/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from './dto/request/update-campaign-request.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/shared/guards/roles.guard';

@Controller('campaign')
@ApiBearerAuth()
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @ApiOperation({
    summary: "Create campaign",
  })
  @Post()
  @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async createCampaign(@Body() data: CreateCampaignRequestDto) {
    return this.campaignService.createCampaign(data);
  }

  @ApiOperation({
    summary: "Fetch campaign by id",
  })
  @Get('getById/:id/client/:clientId')
  @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.PARTICIPANT, UserRole.COACH)
  @ClientScoped()
  async getCampaignById(@Param('id') id: number) {
    return this.campaignService.getById(Number(id));
  }

  @ApiOperation({
    summary: "Fetch campaigns by clientId",
  })
  @Get('getByClientId/:clientId')
  @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN, UserRole.COACH)
  @ClientScoped()
  async getCampaignsByClientId(@Param('clientId') id: string) {
    return this.campaignService.getByClientId(Number(id));
  }

  @ApiOperation({
    summary: "Fetch campaigns by magicCode",
  })
  @Get('magicCode/:magiccCode')
  async getCampaignsByMagicCode(@Param('magiccCode') magicCode: string) {
    return this.campaignService.getByMagicCode(magicCode);
  }

  @ApiOperation({
    summary: "Update campaign",
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async updateCampaign(@Param('id') id: string, @Body() data: UpdateCampaignRequestDto) {
    return this.campaignService.updateCampaign(Number(id), data);
  }

  @ApiOperation({
    summary: "Delete campaign",
  })
  @Delete(':id/clientId/:clientId')
  @UseGuards(JwtAuthGuard, RolesPermissionsGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async deleteCampaign(@Param('id') id: string) {
    return this.campaignService.deleteCampaign(Number(id));
  }
}
