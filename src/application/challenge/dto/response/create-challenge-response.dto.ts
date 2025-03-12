import { ApiProperty } from '@nestjs/swagger';
import { GetChallengeCategoryDto } from './get-challenge-category-response.dto';
import { Expose } from 'class-transformer';

export class CreateChallengeResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  example?: string;

  @ApiProperty()
  @Expose()
  estimatedTime?: number;

  @ApiProperty()
  @Expose()
  difficulty: string;

  @ApiProperty()
  @Expose()
  minThreshold: number;

  @ApiProperty()
  @Expose()
  maxThreshold: number;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: [Array<GetChallengeCategoryDto>] })
  @Expose()
  categories: GetChallengeCategoryDto[];
}
