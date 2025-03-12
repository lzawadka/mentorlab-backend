import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateChallengeRequestDto {
  @ApiProperty({ description: 'Title of the challenge' })
  title: string;

  @ApiProperty({ description: 'Description of the challenge', required: false })
  description?: string;

  @ApiProperty({ description: 'Example or practical use case', required: false })
  example?: string;

  @ApiProperty({ description: 'Estimated time in minutes', required: false })
  estimatedTime?: number;

  @ApiProperty({ description: 'Difficulty level (easy, medium, hard)' })
  difficulty: string;

  @ApiProperty({ description: 'Minimum threshold level' })
  minThreshold: number;

  @ApiProperty({ description: 'Maximum threshold level' })
  maxThreshold: number;

  @ApiProperty({ description: 'List of category IDs', example: [1, 2] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categoryIds: number[];
}
