import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignResponseDto {
    @ApiProperty()
    clientId: number; 
    @ApiProperty()
    title: string;
    @ApiProperty() 
    description?: string; 
    @ApiProperty()
    startDate: Date; 
    @ApiProperty()
    endDate: Date; 
    @ApiProperty()
    participantIds: number[]
}