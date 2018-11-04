export interface FirstTaskData {
  entry: string;
  notes: Notes[];
}

export interface Notes {
  id: number;
  question: string;
  answer: string;
  correct?: boolean;
  empty?: boolean;
}

export interface SecondTaskData {
  scene: string;
  clues: {
    command: string;
    item: string,
    clueName: string;
    found?: boolean;
  }[];
}

export interface ThirdTaskData {
  id: number;
}

export interface FourthTaskData {
  id: number;
}

export interface TaskContent {
  firstTask: FirstTaskData[];
  secondTask: SecondTaskData[];
  thirdTask: ThirdTaskData[];
  fourthTask: FourthTaskData[];
}
