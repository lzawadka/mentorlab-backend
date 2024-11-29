import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamRequestDto {
    @ApiProperty()
    name: string; 
    @ApiProperty()
    campaignId: number; 
    @ApiProperty()
    participantIds: number[]
}