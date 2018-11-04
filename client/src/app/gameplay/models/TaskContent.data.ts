export interface FirstTaskData {
  id: number;
  question: string;
  answer: string;
  correct: boolean;
  empty: boolean;
}

export interface SecondTaskData {
  id: number;
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
