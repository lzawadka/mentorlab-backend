import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CampaignService } from 'src/domain/services/campaign.service';
import { CreateCampaignRequestDto } from '../dto/campaign/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from '../dto/campaign/request/update-campaign-request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @ApiOperation({
    summary: "Create campaign",
  })
  @Post()
  async createCampaign(
    @Body()
    data: CreateCampaignRequestDto,
  ) {
    return this.campaignService.createCampaign(data);
  }

  @ApiOperation({
    summary: "Fetch all campaigns",
  })
  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @ApiOperation({
    summary: "Fetch campaign by id",
  })
  @Get('getById/:id')
  async getCampaignById(@Param('id') id: string) {
    return this.campaignService.getCampaignById(Number(id));
  }

  @ApiOperation({
    summary: "Fetch campaigns by clientId",
  })
  @Get('getByClientId/:clientId')
  async getCampaignsByClientId(@Param('clientId') id: string) {
    return this.campaignService.getByClientId(Number(id));
  }

  @ApiOperation({
    summary: "Update campaign",
  })
  @Put(':id')
  async updateCampaign(@Param('id') id: string, @Body() data: UpdateCampaignRequestDto) {
    return this.campaignService.updateCampaign(Number(id), data);
  }

  @ApiOperation({
    summary: "Delete campaign",
  })
  @Delete(':id')
  async deleteCampaign(@Param('id') id: string) {
    return this.campaignService.deleteCampaign(Number(id));
  }
}
