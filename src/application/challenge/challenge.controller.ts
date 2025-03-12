import { Body, Controller, Get, Param, Post , Put, Delete, UseGuards} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ChallengeService } from 'src/application/challenge/challenge.service';
import { CreateChallengeRequestDto } from './dto/request/create-challenge-request.dto';
import { GetChallengesByCategoriesRequestDto } from './dto/request/get-challenges-by-categories.dto';
import { UpdateChallengeDto } from './dto/request/update-challenge-request.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesPermissionsGuard } from 'src/shared/guards/roles.guard';
import { ClientScoped } from 'src/shared/decorators/client-scoped.decorator';

@Controller('challenges')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesPermissionsGuard)
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new challenge' })
  @ApiBody({
    description: 'Data required to create a new challenge',
    type: CreateChallengeRequestDto,
  })
  @ApiResponse({ status: 201, description: 'Challenge successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @Roles(UserRole.ADMIN, UserRole.COACH)
  async createChallenge(@Body() data: CreateChallengeRequestDto) {
    return this.challengeService.createChallenge(data);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all challenges' })
  @ApiResponse({
    status: 200,
    description: 'List of all challenges.',
  })
  @Roles(UserRole.ADMIN, UserRole.COACH)
  async getAllChallenges() {
    return this.challengeService.getAllChallenges();
  }

  @Get(':id/client/:clientId')
  @ApiOperation({ summary: 'Fetch a challenge by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the challenge to fetch',
  })
  @ApiResponse({
    status: 200,
    description: 'Challenge successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Challenge not found.' })
  @Roles(UserRole.ADMIN, UserRole.COACH, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async getChallengeById(@Param('id') id: number) {
    return this.challengeService.getChallengeById(Number(id));
  }

  @Get('category/:id/client/:clientId')
  @ApiOperation({ summary: 'Fetch a challenge by category' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the category',
  })
  @ApiResponse({
    status: 200,
    description: 'Challenges successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.',
  })
  @Roles(UserRole.ADMIN, UserRole.COACH, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async getChallengesByCategory(@Param('id') categoryId: number) {
    return this.challengeService.getChallengesByCategoryId(Number(categoryId));
  }

  @Post('by-categories/client/:clientId')
  @ApiOperation({ summary: 'Fetch challenges by category IDs' })
  @ApiBody({
    description: 'Data required to update the challenge',
    type: GetChallengesByCategoriesRequestDto,
  })
  @ApiResponse({ status: 200, description: 'Challenges found' })
  @ApiResponse({ status: 400, description: 'Invalid category IDs' })
  @Roles(UserRole.ADMIN, UserRole.COACH, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async getChallengesByCategoryIds(@Body() data: GetChallengesByCategoriesRequestDto) {
    return this.challengeService.getChallengesByCategoryIds(data.categorieIds);
  }

  @Get('client/:clientId/campaign/:campaignId')
  @ApiOperation({ summary: 'Fetch challenges by campaign ID' })
  @ApiResponse({ status: 200, description: 'Challenges found' })
  @ApiResponse({ status: 400, description: 'Invalid category IDs' })
  @Roles(UserRole.ADMIN, UserRole.COACH)
  @ClientScoped()
  async getChallengesByCampaignId(@Param('campaignId') campaignId: number) {
    return this.challengeService.getChallengesByCampaignId(Number(campaignId));
  }

  @Put(':id/client/:clientId')
  @ApiOperation({ summary: 'Update a challenge by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the challenge to update',
  })
  @ApiBody({
    description: 'Data required to update the challenge',
    type: UpdateChallengeDto,
  })
  @ApiResponse({ status: 200, description: 'Challenge successfully updated.' })
  @ApiResponse({ status: 404, description: 'Challenge not found.' })
  @Roles(UserRole.ADMIN, UserRole.COACH, UserRole.CLIENT_ADMIN)
  async updateChallenge(@Param('id') id: number, @Body() data: UpdateChallengeDto) {
    return this.challengeService.updateChallenge(Number(id), data);
  }

  @Delete(':id/client/:clientId')
  @ApiOperation({ summary: 'Delete a challenge by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the challenge to delete',
  })
  @ApiResponse({ status: 200, description: 'Challenge successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Challenge not found.' })
  @Roles(UserRole.ADMIN, UserRole.COACH, UserRole.CLIENT_ADMIN)
  @ClientScoped()
  async deleteChallenge(@Param('id') id: number) {
    return this.challengeService.deleteChallenge(Number(id));
  }
}
