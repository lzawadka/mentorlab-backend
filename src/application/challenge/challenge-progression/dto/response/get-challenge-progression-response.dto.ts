import { Expose, Type } from 'class-transformer';
import { GetChallengeResponseDto } from 'src/application/challenge/dto/response/get-challenge-response.dto';

export class ChallengeProgressionResponseDto {
  @Expose()
  id: number;

  @Expose()
  participantId: number;

  @Expose()
  challengeId: number;

  @Expose()
  status: string;

  @Expose()
  completedAt?: Date | null;

  @Expose()
  order?: number;

  @Expose()
  userId?: number;

  @Expose()
  @Type(() => GetChallengeResponseDto)
  challenge?: GetChallengeResponseDto;
}