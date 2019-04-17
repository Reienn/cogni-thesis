import { Performance } from '../../gameplay/models/game-data.data';
import { SourceTaskData } from '../../gameplay/models/task-content.data';

export interface Player {
  name: string;
  currentCase: number;
  bestScores?: number[];
  lastActivityAt?: number;
  performance?: Performance[];
  customTaskData?: SourceTaskData;
}
