import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CampaignService } from 'src/domain/services/campaign.service';
import { CreateCampaignRequestDto } from '../dto/campaign/request/create-campaign-request.dto';
import { UpdateCampaignRequestDto } from '../dto/campaign/request/update-campaign-request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @ApiOperation({
    summary: "Create new campaign",
  })
  @Post()
  async createCampaign(
    @Body()
    data: CreateCampaignRequestDto,
  ) {
    return this.campaignService.createCampaign(data);
  }

  @ApiOperation({
    summary: "Get all campaign",
  })
  @Get()
  async getAllCampaigns() {
    return this.campaignService.getAllCampaigns();
  }

  @ApiOperation({
    summary: "Get Campaign by Id",
  })
  @Get('getById/:id')
  async getCampaignById(@Param('id') id: string) {
    return this.campaignService.getCampaignById(Number(id));
  }

  @ApiOperation({
    summary: "Get Campaign by ClientId",
  })
  @Get('getByClientId/:clientId')
  async getCampaignByClientId(@Param('clientId') id: string) {
    return this.campaignService.getByClientId(Number(id));
  }

  @ApiOperation({
    summary: "Update Campaign",
  })
  @Put(':id')
  async updateCampaign(@Param('id') id: string, @Body() data: UpdateCampaignRequestDto) {
    return this.campaignService.updateCampaign(Number(id), data);
  }

  @ApiOperation({
    summary: "Delete Campaign",
  })
  @Delete(':id')
  async deleteCampaign(@Param('id') id: string) {
    return this.campaignService.deleteCampaign(Number(id));
  }
}
