export interface FirstTaskData {
  entry: string;
  notes: Notes[];
  character: string;
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
  people: {
    sex: 'male' | 'female';
    name: string;
    description: string;
    isCulprit: boolean;
  }[];
  clues: string[];
}

export interface FourthTaskData {
  exercises: {
    id: number;
    question: string;
    options: {id: number, text: string}[];
    correct: number;
    selected?: number;
    done?: boolean;
  }[];
}

export interface TaskContent {
  firstTask: FirstTaskData;
  secondTask: SecondTaskData;
  thirdTask: ThirdTaskData;
  fourthTask: FourthTaskData;
}
