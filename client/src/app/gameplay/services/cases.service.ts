import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TaskContent, SourceTaskData, SourceClues, SourceClue, EXERCISE_QUESTIONS, EXERCISE_BLANK,
        EXERCISE_TYPE_WORD_GROUPS, EXERCISE_TYPE_CLOZE_TEST, EXERCISE_TYPE_CLOZE_TEST_REVERSED } from '../models/task-content.data';
import { Performance } from '../models/game-data.data';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../auth/services/authentication.service';

const DYNAMIC_TASKS_CONTENT = require('../../../assets/dynamic-tasks-content.json');
const DEFAULT_BEST_SCORES = [null, null, null, null, null, null, null, null, null, null];

export interface Case {
  id: number;
  name: string;
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
    this.dynamicTasksContent = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
    return new Promise((resolve, reject) => {
      if (this.dynamicTasksContent && this.dynamicTasksContent.cases) {
        const casesList: Case[] = this.dynamicTasksContent.cases.map(el => ({
          id: el.id,
          name: el.name,
          image: el.scene,
          available: false
        }));
        const currentCase = this.authenticationService.getUser().currentCase;
        resolve({cases: casesList, currentCase: currentCase});
      } else {
        reject('Nie udało się pobrać listy spraw.');
      }
    });
  }

  getDynamicTasksContent(caseId: number): Promise<TaskContent> {
    this.dynamicTasksContent = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
    return new Promise((resolve, reject) => {
      if (this.dynamicTasksContent && this.dynamicTasksContent.cases
          && this.dynamicTasksContent.cases.find(el => el.id === caseId) ) {
        const item = this.dynamicTasksContent.cases.find(el => el.id === caseId);
        const cluesNumber = item.cluesNumber;

        const preparedClues = this.prepareClues(this.dynamicTasksContent.clues, cluesNumber);
        const people = this.preparePeople([...this.dynamicTasksContent.people], preparedClues, cluesNumber);
        const exercises = this.prepareExercises({...this.dynamicTasksContent.exercises}, [...item.exercises]);

        let randomizedCommands = item.searchingCommands;
        randomizedCommands.sort(() => 0.5 - Math.random());
        randomizedCommands = randomizedCommands.slice(0, cluesNumber);

        const activeClues = [...preparedClues.active.other, ...preparedClues.active.jobs];
        activeClues.sort(() => 0.5 - Math.random());

        resolve({
          firstTask: {
            entry: item.description,
            notes: item.notes.map((note, index) => ({...note, id: index + 1})),
            character: item.character
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
            character: item.character,
            stolenItem: item.stolenItem
          }
        });
      } else {
        reject('Nie udało się pobrać treści zadania.');
      }
    });
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

    culpritDescription = [...clues.active.jobs, ...clues.active.other].map(el =>
      el.description.unisex ? el.description.unisex : el.description[people[0].sex]);
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
        description: cluesForInnocent.map(el => el.description.unisex ? el.description.unisex : el.description[people[i].sex]).join(' ')
      };
    }
    people.sort(() => 0.5 - Math.random());
    return people;
  }

  private prepareExercises(exercisesSource, exercises) {
    let exercisesContent = [];
    exercises.map(el => {
      switch (el.type) {
        case EXERCISE_TYPE_WORD_GROUPS:
          const wordGroups = exercisesSource.wordGroups;
          wordGroups.sort(() => 0.5 - Math.random());
          for (let i = 0; i < el.amount; i++) {
            let options = wordGroups[i];
            options.sort(() => 0.5 - Math.random());
            options = options.slice(0, 3);

            const correctOption = wordGroups[ i < wordGroups.length - 1 ? i + 1 : 0];
            correctOption.sort(() => 0.5 - Math.random());
            options.unshift(correctOption[0]);

            exercisesContent.push({
              question: EXERCISE_QUESTIONS[el.type],
              options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
            });
          }
          break;
        case EXERCISE_TYPE_CLOZE_TEST:
          exercisesSource.clozeTest.sort(() => 0.5 - Math.random());
          for (let i = 0; i < el.amount; i++) {
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
              question: EXERCISE_QUESTIONS[el.type],
              sentence: clozeTestTask.sentence.replace('*', EXERCISE_BLANK),
              options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
             });
          }
          break;
        case EXERCISE_TYPE_CLOZE_TEST_REVERSED:
          exercisesSource.clozeTest.sort(() => 0.5 - Math.random());
          for (let i = 0; i < el.amount; i++) {
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
              question: EXERCISE_QUESTIONS[el.type],
              sentence: clozeTestReversedTask.sentence.replace('*', EXERCISE_BLANK),
              options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
            });
          }
          break;
        default:
          break;
      }
    });
    exercisesContent = exercisesContent.map((el, i) =>
      ({...el, id: i + 1, done: false, correct: 1})).sort(() => 0.5 - Math.random());
    return exercisesContent;
  }
}
