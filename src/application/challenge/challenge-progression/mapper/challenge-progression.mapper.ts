import { plainToInstance } from 'class-transformer';
import { ChallengeProgressionResponseDto } from '../dto/response/get-challenge-progression-response.dto';

export class ChallengeProgressionMapper {

  static toFullResponse(result: any): ChallengeProgressionResponseDto {
    return plainToInstance(ChallengeProgressionResponseDto, {
      id: result.id,
      challengeId: result.challengeId,
      campaignId: result.campaignId,
      participantId: result.participantId,
      status: result.status,
      completedAt: result.completedAt,
      order: result.order,
      challenge: result.challenge,
    });
  }
  static toCreateResponse(result: any): Partial<ChallengeProgressionResponseDto> {
    return plainToInstance(ChallengeProgressionResponseDto, {result});
  }

  static toListResponse(results: any[]): ChallengeProgressionResponseDto[] {
    return results.map((result) => this.toFullResponse(result));
  }
}
