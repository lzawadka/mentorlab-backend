import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CampaignService } from 'src/domain/services/campaign.service';
import { CreateCampaignRequestDto } from '../dto/campaign/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from '../dto/campaign/request/update-campaign-request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @ApiOperation({
    summary: "Création d'un campagne",
  })
  @Post()
  async createCampaign(
    @Body()
    data: CreateCampaignRequestDto,
  ) {
    return this.campaignService.createCampaign(data);
  }

  @ApiOperation({
    summary: "Récupère tout les campagnes",
  })
  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @ApiOperation({
    summary: "Récupère une campagne pas son id",
  })
  @Get('getById/:id')
  async getCampaignById(@Param('id') id: string) {
    return this.campaignService.getCampaignById(Number(id));
  }

  @ApiOperation({
    summary: "Récupère une campagne par son clientId",
  })
  @Get('getByClientId/:clientId')
  async getCampaignByClientId(@Param('clientId') id: string) {
    return this.campaignService.getByClientId(Number(id));
  }

  @ApiOperation({
    summary: "Met à jour une campagne",
  })
  @Put(':id')
  async updateCampaign(@Param('id') id: string, @Body() data: UpdateCampaignRequestDto) {
    return this.campaignService.updateCampaign(Number(id), data);
  }

  @ApiOperation({
    summary: "Supprime une campagne",
  })
  @Delete(':id')
  async deleteCampaign(@Param('id') id: string) {
    return this.campaignService.deleteCampaign(Number(id));
  }
}
