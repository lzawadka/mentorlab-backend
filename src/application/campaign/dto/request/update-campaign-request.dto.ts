import { ApiProperty } from "@nestjs/swagger";

export class UpdateCampaignRequestDto {
    @ApiProperty()
    title?: string; 
    
    @ApiProperty()
    description?: string; 

    @ApiProperty()
    startDate?: Date; 

    @ApiProperty()
    endDate?: Date

    @ApiProperty()
    clientId?: number

    @ApiProperty()
    type?: string

    @ApiProperty()
    userIds?: number[]
    
    @ApiProperty()
    challengeIds?: number[]
    
    @ApiProperty()
    categoryIds?: number[]
}