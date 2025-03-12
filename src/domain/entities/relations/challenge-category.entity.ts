import { Category } from "../category.entity";
import { Challenge } from "../challenge.entity";

export class ChallengeCategory {
    id: number;
    challengeId: number;
    categoryId: number;
  
    challenge: Challenge;
    category: Category;
  }
  