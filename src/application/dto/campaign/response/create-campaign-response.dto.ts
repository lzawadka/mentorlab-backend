import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignResponseDto {
    @ApiProperty()
    clientId: number; 
    @ApiProperty()
    userIds: number[]; 
    @ApiProperty()
    title: string;
    @ApiProperty() 
    description?: string; 
    @ApiProperty()
    startDate: Date; 
    @ApiProperty()
    endDate: Date
}