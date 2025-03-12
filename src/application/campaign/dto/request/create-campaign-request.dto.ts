import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCampaignRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    clientId: number; 
    
    @ApiProperty()
    userIds: number[]; 
    
    @ApiProperty()
    @IsNotEmpty()
    title: string; 

    @ApiProperty()
    @IsNotEmpty()
    type: string; 
    
    @ApiProperty()
    @IsNotEmpty()   
    description?: string; 

    @ApiProperty()
    @IsNotEmpty()   
    totalChallenges?: number; 
    
    @ApiProperty()
    startDate: Date; 
    
    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    challengeIds: number[];

    @ApiProperty()
    categoryIds: number[];
}