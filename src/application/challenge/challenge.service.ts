import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeRequestDto } from 'src/application/challenge/dto/request/create-challenge-request.dto';
import { UpdateChallengeDto } from 'src/application/challenge/dto/request/update-challenge-request.dto';
import { CreateChallengeResponseDto } from 'src/application/challenge/dto/response/create-challenge-response.dto';
import { GetChallengeResponseDto } from 'src/application/challenge/dto/response/get-challenge-response.dto';
import { CampaignRepository } from 'src/infrastructure/repository/campaign.repository';
import { CategoryRepository } from 'src/infrastructure/repository/category.repository';
import ChallengeRepository from 'src/infrastructure/repository/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly campaignRepository: CampaignRepository
  ) {}

  async createChallenge(data: CreateChallengeRequestDto): Promise<CreateChallengeResponseDto> {
    const createdChallenge = await this.challengeRepository.createChallenge(data);
    return {
      ...createdChallenge,
      categories: createdChallenge.categories.map((relation) => ({
        id: relation.category.id,
        name: relation.category.name,
      })),
    };
  }

  async getAllChallenges(): Promise<GetChallengeResponseDto[]> {
    const challenges = await this.challengeRepository.findAllChallenges();

    return challenges.map((challenge) => ({
      ...challenge,
      categories: challenge.categories.map((relation) => ({
        id: relation.category.id,
        name: relation.category.name,
      })),
    }));
  }

  async getChallengeById(id: number): Promise<GetChallengeResponseDto> {
    const challenge = await this.challengeRepository.findChallengeById(id);

    if (!challenge) throw new NotFoundException(`Challenge with ID ${id} not found`);

    return {
      ...challenge,
      categories: challenge.categories.map((relation) => ({
        id: relation.category.id,
        name: relation.category.name,
      })),
    };
  }

  async getChallengesByCategoryId(id: number): Promise<GetChallengeResponseDto[]> {
    const categoryExists = await this.categoryRepository.findCategoryById(id);
    if (!categoryExists) throw new NotFoundException(`Category with ID ${id} not found`);

    return await this.challengeRepository.findChallengesByCategoryId(id);
  }

  async getChallengesByCampaignId(id: number): Promise<GetChallengeResponseDto[]> {
    const categoryExists = await this.campaignRepository.findById(id);
    if (!categoryExists) throw new NotFoundException(`Campaign with ID ${id} not found`);

    return await this.challengeRepository.findChallengesByCampaignId(id);
    return;
  }

  async getChallengesByCategoryIds(categoryIds: number[]): Promise<GetChallengeResponseDto[]> {
    if (categoryIds.length === 0) throw new Error('No category IDs provided.');
  
    const challenges = await this.challengeRepository.findChallengesByCategoryIds(categoryIds);

    return challenges.map((challenge) => ({
      ...challenge,
      categories: challenge.categories.map((relation) => ({
        id: relation.category.id,
        name: relation.category.name,
      })),
    }));
  }

  async updateChallenge(id: number, data: UpdateChallengeDto) {
    const existingCategories = await this.categoryRepository.findCategoryByIds(data.categoryIds);

    if (!existingCategories || existingCategories.length !== data.categoryIds.length) 
      throw new NotFoundException('One or more categories do not exist');

    return this.challengeRepository.updateChallenge(id, data);
  }

  async deleteChallenge(id: number): Promise<void> {
    await this.getChallengeById(id);
    this.challengeRepository.deleteChallenge(id);
  }
}
