import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TaskContent, SourceTaskData, SourceClues, SourceClue, Exercises,
         EXERCISE_QUESTIONS, EXERCISE_BLANK } from '../models/task-content.data';
import { Performance } from '../models/game-data.data';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../auth/services/authentication.service';

const DYNAMIC_TASKS_CONTENT = require('../../../assets/dynamic-tasks-content.json');
const DEFAULT_BEST_SCORES = [null, null, null, null, null, null, null, null, null, null];

export interface Case {
  id: number;
  available: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  dynamicTasksContent: SourceTaskData;
  currentCase: number;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getCases(): Promise<{cases: Case[], currentCase: number}> {
    return this.getTaskData().then((taskData: SourceTaskData) => {
      this.dynamicTasksContent = taskData;
        if (this.dynamicTasksContent && this.dynamicTasksContent.cases) {
          const casesList: Case[] = this.dynamicTasksContent.cases.map(el => ({
            id: el.id,
            image: el.scene,
            available: false
          }));
          const currentCase = this.authenticationService.getUser().currentCase;
          return {cases: casesList, currentCase: currentCase};
        }
    });
  }

  async getDynamicTasksContent(caseId: number): Promise<TaskContent> {
    if (!this.dynamicTasksContent) {
      this.dynamicTasksContent = await this.getTaskData();
    }
    if (this.dynamicTasksContent && this.dynamicTasksContent.cases
        && this.dynamicTasksContent.cases.find(el => el.id === caseId) ) {
      const item = this.dynamicTasksContent.cases.find(el => el.id === caseId);
      const cluesNumber = item.cluesNumber;

      const versions = item.versions;
      versions.sort(() => 0.5 - Math.random());
      const version = versions[0];

      const preparedClues = this.prepareClues(this.dynamicTasksContent.clues, cluesNumber);
      const people = this.preparePeople([...this.dynamicTasksContent.people], preparedClues, cluesNumber);
      const exercises = this.prepareExercises({...this.dynamicTasksContent.exercises}, item.exercises);

      let randomizedCommands = item.searchingCommands;
      randomizedCommands.sort(() => 0.5 - Math.random());
      randomizedCommands = randomizedCommands.slice(0, cluesNumber);

      const activeClues = [...preparedClues.active.other, ...preparedClues.active.jobs];
      activeClues.sort(() => 0.5 - Math.random());

      return {
        firstTask: {
          entry: version.description,
          notes: version.notes.map((note, index) => ({...note, id: index + 1})),
          character: version.character
        },
        secondTask: {
          scene: item.scene,
          clues: randomizedCommands.map((command, index) => ({...command, clueName: activeClues[index].name}))
        },
        thirdTask: {
          people: people,
          clues: activeClues.map(el => el.name)
        },
        fourthTask: {
          exercises: exercises,
          character: version.character,
          stolenItem: version.stolenItem
        }
      };
    }
  }

  completedCase(id: number, performance: Performance[], score: number): Promise<any> {
    const user = this.authenticationService.getUser();
    user.bestScores = user.bestScores && user.bestScores.length ? user.bestScores : DEFAULT_BEST_SCORES;
    user.bestScores[id - 1] = user.bestScores[id - 1] === null || score > user.bestScores[id - 1] ? score : user.bestScores[id - 1];
    return this.http.post<any>(environment.baseUrl + '/api/performance',
      {performance: performance, bestScores: user.bestScores, id: id})
      .pipe(map((response: any) => {
        if (!user.currentCase || (user.currentCase && user.currentCase < id)) {
          user.currentCase = id;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        return response;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }

  private getTaskData(): Promise<SourceTaskData> {
    return this.http.get<any>(environment.baseUrl + '/api/get-custom-task-data')
    .pipe(map((data: any) => {
      if (data && data[0] && data[0].customTaskData) {
        return JSON.parse(JSON.stringify(data[0].customTaskData));
      } else {
        return JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
      }
    })).toPromise();
  }

  private prepareClues(clues: SourceClues, cluesNumber: number) {
    let activeClues: SourceClue[], inactiveClues: SourceClue[];
    clues.other.sort(() => 0.5 - Math.random());
    activeClues = clues.other.slice(0, cluesNumber - 1);
    inactiveClues = clues.other.slice(cluesNumber - 1, clues.other.length);
    clues.jobs.sort(() => 0.5 - Math.random());
    const activeJob = clues.jobs.shift();
    return({active: {jobs: [activeJob], other: activeClues},
            inactive: {jobs: clues.jobs, other: inactiveClues}});
  }

  private preparePeople(people, clues: {active: SourceClues, inactive: SourceClues}, cluesNumber: number) {
    let culpritDescription: string[];
    people.sort(() => 0.5 - Math.random());
    people = people.slice(0, cluesNumber);

    culpritDescription = [...clues.active.jobs, ...clues.active.other].map(el => el.description[people[0].sex]);
    culpritDescription.sort(() => 0.5 - Math.random());
    people[0] = {...people[0],
      isCulprit: true,
      description: culpritDescription.join(' ')
    };

    for (let i = 1; i < people.length; i++) {
      const jobs = [...clues.inactive.jobs, ...clues.active.jobs];
      jobs.sort(() => 0.5 - Math.random());
      let cluesForInnocent = [...clues.active.other];
      cluesForInnocent.sort(() => 0.5 - Math.random());
      cluesForInnocent.pop();
      cluesForInnocent = [...cluesForInnocent, ...clues.inactive.other, jobs[0]];
      cluesForInnocent.sort(() => 0.5 - Math.random());
      cluesForInnocent = cluesForInnocent.slice(0, cluesNumber);
      people[i] = {...people[i],
        isCulprit: false,
        description: cluesForInnocent.map(el => el.description[people[i].sex]).join(' ')
      };
    }
    people.sort(() => 0.5 - Math.random());
    return people;
  }

  private prepareExercises(exercisesSource, exercises: Exercises) {
    let exercisesContent = [];

    if (exercises.wordGroups) {
      const wordGroups = exercisesSource.wordGroups;
      wordGroups.sort(() => 0.5 - Math.random());
      for (let i = 0; i < exercises.wordGroups; i++) {
        let options = wordGroups[i];
        options.sort(() => 0.5 - Math.random());
        options = options.slice(0, 3);

        const correctOption = wordGroups[ i < wordGroups.length - 1 ? i + 1 : 0];
        correctOption.sort(() => 0.5 - Math.random());
        options.unshift(correctOption[0]);

        exercisesContent.push({
          question: EXERCISE_QUESTIONS.wordGroups,
          options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
        });
      }
    }

    if (exercises.clozeTest) {
      exercisesSource.clozeTest.sort(() => 0.5 - Math.random());
      for (let i = 0; i < exercises.clozeTest; i++) {
        const clozeTestTask = exercisesSource.clozeTest.shift();
        if (!clozeTestTask) {
          break;
        }
        const correct = clozeTestTask.correct;
        correct.sort(() => 0.5 - Math.random());
        const incorrect = clozeTestTask.incorrect;
        incorrect.sort(() => 0.5 - Math.random());
        const options = [correct.pop(), ...incorrect.slice(0, 3)];
        exercisesContent.push({
          question: EXERCISE_QUESTIONS.clozeTest,
          sentence: clozeTestTask.sentence.replace('*', EXERCISE_BLANK),
          options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
          });
      }
    }

    if (exercises.clozeTestReversed) {
      exercisesSource.clozeTest.sort(() => 0.5 - Math.random());
      for (let i = 0; i < exercises.clozeTestReversed; i++) {
        const clozeTestReversedTask = exercisesSource.clozeTest.pop();
        if (!clozeTestReversedTask) {
          break;
        }
        const correct = clozeTestReversedTask.incorrect;
        correct.sort(() => 0.5 - Math.random());
        const incorrect = clozeTestReversedTask.correct;
        incorrect.sort(() => 0.5 - Math.random());
        const options = [correct.pop(), ...incorrect.slice(0, 3)];
        exercisesContent.push({
          question: EXERCISE_QUESTIONS.clozeTestReversed,
          sentence: clozeTestReversedTask.sentence.replace('*', EXERCISE_BLANK),
          options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
        });
      }
    }

    exercisesContent = exercisesContent.map((el, i) =>
      ({...el, id: i + 1, done: false, correct: 1})).sort(() => 0.5 - Math.random());
    return exercisesContent;
  }
}
