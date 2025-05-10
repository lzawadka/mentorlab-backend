import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { GetChallengeCategoryDto } from "./get-challenge-category-response.dto";

export class GetChallengeResponseDto {
    @ApiProperty()
    @Expose()
    id: number;
  
    @ApiProperty()
    @Expose()
    title: string;
  
    @ApiProperty()
    @Expose()
    description: string;
  
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

    @ApiProperty()
    @Expose()
    updatedAt: Date;

    @ApiProperty()
    @Expose()
    categories?: GetChallengeCategoryDto[];
}