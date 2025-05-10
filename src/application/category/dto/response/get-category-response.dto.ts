import { ApiProperty } from "@nestjs/swagger";

export class GetCategoryResponseDto {
    @ApiProperty({ description: 'ID of the category' })
    id: number;

    @ApiProperty({ description: 'Name of the category' })
    name: string;
}