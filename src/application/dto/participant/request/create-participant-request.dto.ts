import { ApiProperty } from "@nestjs/swagger";

export class CreateParticpantRequestDto {
    @ApiProperty()
    userId: number; 
    @ApiProperty()
    campaignId: number; 
    @ApiProperty()
    teamId?: number
}