import { ApiProperty } from "@nestjs/swagger";

export class UpdateClientRequestDto {
    @ApiProperty()
    name?: string; 
    @ApiProperty()
    description?: string; 
    @ApiProperty()
    contactEmail?: string
}