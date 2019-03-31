export const EXERCISE_TYPE_WORD_GROUPS = 'wordGroups';
export const EXERCISE_TYPE_CLOZE_TEST = 'clozeTest';
export const EXERCISE_TYPE_CLOZE_TEST_REVERSED = 'clozeTestReversed';

export const EXERCISE_QUESTIONS = {
  [EXERCISE_TYPE_WORD_GROUPS]: 'Które słowo <b>NIE pasuje</b> do pozostałych?',
  [EXERCISE_TYPE_CLOZE_TEST]: 'Która odpowiedź <b>pasuje</b> w puste miejse?',
  [EXERCISE_TYPE_CLOZE_TEST_REVERSED]: 'Która odpowiedź <b>NIE pasuje</b> w puste miejsce?'
};
export const EXERCISE_BLANK = '....................';

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
  cases: {
    id: number;
    name: string;
    description: string;
    character: string;
    notes: {
      question: string;
      answer: string
    }[];
    stolenItem: string;
    scene: string;
    searchingCommands: {
      command: string;
      item: string
    }[];
    exercises: {
      type: string;
      amount: number
    }[]
  }[];
}

export interface SourceClues {
  jobs: SourceClue[];
  other: SourceClue[];
}
export interface SourceClue {
  name: string;
  description: {
    unisex?: string;
    male?: string;
    female?: string;
  };
}
