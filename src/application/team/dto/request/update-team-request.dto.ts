import { ApiProperty } from "@nestjs/swagger";

export class UpdateTeamRequestDto {
    @ApiProperty()
    name?: string; 
    @ApiProperty()
    participantIds?: number[]
    @ApiProperty()
    campaignId?: number
}