import { IsInt, IsPositive } from 'class-validator';

export class UpdateChallengeProgressParamsDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  campaignId: number;

  @IsInt()
  @IsPositive()
  challengeId: number;
}
