import { Injectable } from "@nestjs/common";
import { ChallengeService } from "src/application/challenge/challenge.service";
import { LogType } from "src/domain/enums/log-type.enum";
import { LoggerService } from "src/shared/logging/logger.service";

@Injectable()
export class UserPathService {
    constructor(
        private readonly challengeService: ChallengeService,
        private readonly logger: LoggerService,
    ) {}
  
    async generateUserPath(completedChallengeIds: number[], selfEvaluations: any): Promise<any[]> {
      try {
        // Step 1: Check if self-evaluations are available
        if (!selfEvaluations || selfEvaluations.length === 0) {
          await this.logger.logTechnical('generateUserPath', 'No self-evaluations found for this participant.', LogType.ERROR);
          throw new Error('No self-evaluations found for this participant.');
        }
    
        // Step 2: Load all available challenges
        let allChallenges;
        try {
          allChallenges = await this.challengeService.getAllChallenges();
        } catch (error) {
          await this.logger.logTechnical('generateUserPath', 'Failed to retrieve challenges.', LogType.ERROR);
          throw new Error('Failed to retrieve challenges.');
        }
    
        // Step 3: Filter by useful challenges
        const relevantChallenges = allChallenges.filter(challenge => {
          const categoryIds = challenge.categories.map(category => Number(category.id));
          const matchingCategory = selfEvaluations.some(evaluation => categoryIds.includes(Number(evaluation.categoryId)));
          const matchingThreshold = selfEvaluations.some(evaluation => evaluation.score >= challenge.minThreshold && evaluation.score <= challenge.maxThreshold);
          const notCompleted = !completedChallengeIds.includes(challenge.id);
          return matchingCategory && matchingThreshold && notCompleted;
        });

        if (relevantChallenges.length === 0)
          throw new Error('No relevant challenges found.');
    
        // Step 4: Select 3 random challenges from the relevant challenges
        const selectedChallenges = this.getRandomChallenges(relevantChallenges, 3);

        return selectedChallenges.map(challenge => ({
            challengeId: challenge.id,
            status: 'NOT_STARTED'
        }));
      } catch (error) {
        await this.logger.logTechnical('generateUserPath', `Failed to generate user path. StackTrace: ${error.message}`, LogType.ERROR);
        throw new Error('Failed to generate user path.');
      }
    } 

    /**
     * Select random challenges from the list
     */
    private getRandomChallenges(challenges: any[], count: number): any[] {
      return challenges.sort(() => 0.5 - Math.random()).slice(0, count);
    }
}
  