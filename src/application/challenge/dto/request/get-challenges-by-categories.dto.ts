import { ApiProperty } from "@nestjs/swagger";

export class GetChallengesByCategoriesRequestDto {
    @ApiProperty()
    categorieIds : number[]
}