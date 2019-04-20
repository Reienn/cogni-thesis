export const EXERCISE_QUESTIONS = {
  wordGroups: 'Które słowo <b>NIE pasuje</b> do pozostałych?',
  clozeTest: 'Która odpowiedź <b>pasuje</b> w puste miejse?',
  clozeTestReversed: 'Która odpowiedź <b>NIE pasuje</b> w puste miejsce?'
};
export const EXERCISE_BLANK = '....................';
export const CHARACTERS = ['boy_01', 'girl_01', 'man_01', 'man_02', 'man_03', 'man_04', 'woman_01', 'woman_02', 'woman_03', 'woman_04'];
export const STOLEN_ITEMS = ['camera', 'handbag', 'laptop', 'money', 'painting', 'phone', 'piggybank', 'rucksack', 'wallet', 'watch'];

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
    item: string;
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
    sentence?: string;
    options: {id: number; text: string}[];
    correct: number;
    selected?: number;
    done?: boolean;
  }[];
  character: string;
  stolenItem: string;
}

export interface TaskContent {
  firstTask: FirstTaskData;
  secondTask: SecondTaskData;
  thirdTask: ThirdTaskData;
  fourthTask: FourthTaskData;
}

export interface SourceTaskData {
  people: {
    sex: string;
    name: string
  }[];
  clues: SourceClues;
  exercises: {
    wordGroups: string[][];
    clozeTest: {sentence: string, correct: string[], incorrect: string[]}[];
  };
  cases: CaseData[];
}

export interface CaseData {
  id: number;
  versions: {
    character: string;
    stolenItem: string;
    description: string;
    notes: {
      question: string;
      answer: string
    }[];
  }[];
  scene: string;
  cluesNumber: number;
  searchingCommands: {
    command: string;
    item: string
  }[];
  exercises: Exercises;
}

export interface Exercises {
  wordGroups: number;
  clozeTest: number;
  clozeTestReversed: number;
}

export interface SourceClues {
  jobs: SourceClue[];
  other: SourceClue[];
}
export interface SourceClue {
  name: string;
  description: {
    male: string;
    female: string;
  };
}
