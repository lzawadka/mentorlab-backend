import { ApiProperty } from "@nestjs/swagger";

export class CreateSelfEvaluationDto {
    @ApiProperty({ description: "Category ID", example: 1 })
    categoryId: number;
    @ApiProperty({ description: "Score assigned by the user", minimum: 1, maximum: 10 })
    score: number;
}