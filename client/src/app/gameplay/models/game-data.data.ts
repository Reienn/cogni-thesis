export interface GameData {
  user: string;
  gameplayTime: number;
  loginDates: Date[];
  currentCase: number;
  performance: Performance[];
}

export interface Performance {
  case: number;
  task: number;
  timestamp: Date;
  points: number;
  maxPoints: number;
}
