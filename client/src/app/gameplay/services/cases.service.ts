import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TaskContent, SourceTaskData, SourceClues, SourceClue } from '../models/task-content.data';
import { Performance } from '../models/game-data.data';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../auth/services/authentication.service';

const DYNAMIC_TASKS_CONTENT = require('../../../assets/dynamic-tasks-content.json');

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

  dynamicTasksContent: SourceTaskData = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
  currentCase: number;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getCases(): Promise<{cases: Case[], currentCase: number}> {
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
        reject('No cases');
      }
    });
  }

  getDynamicTasksContent(caseId: number): Promise<TaskContent> {
    return new Promise((resolve, reject) => {
      if (this.dynamicTasksContent && this.dynamicTasksContent.cases) {
        const item = this.dynamicTasksContent.cases.find(el => el.id === caseId);
        const cluesNumber = item.searchingCommands.length;

        const preparedClues = this.prepareClues(this.dynamicTasksContent.clues, cluesNumber);
        const people = this.preparePeople([...this.dynamicTasksContent.people], preparedClues, cluesNumber);
        const exercises = this.prepareExercises({...this.dynamicTasksContent.exercises}, [...item.exercises]);

        const randomizedCommands = item.searchingCommands;
        randomizedCommands.sort(() => 0.5 - Math.random());

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
        reject('No task content');
      }
    });
  }

  completedCase(id: number, performance: Performance[]): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/api/performance', {performance: performance, id: id})
      .pipe(map((response: any) => {
        const user = this.authenticationService.getUser();
        if (!user.currentCase || (user.currentCase && user.currentCase < id)) {
          user.currentCase = id;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
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
    let exercisesContent, source, options, correctOption;
    exercisesContent = [];
    exercises.map(el => {
      source = exercisesSource[el.type];
      source.sort(() => 0.5 - Math.random());
      for (let i = 0; i < el.amount; i++) {
        options = source[i];
        options.sort(() => 0.5 - Math.random());
        options = options.slice(0, 3);

        correctOption = source[ i < source.length - 1 ? i + 1 : 0];
        correctOption.sort(() => 0.5 - Math.random());
        options.unshift(correctOption[0]);

        exercisesContent.push({
          id: i + 1,
          done: false,
          question: el.question,
          options: options.map((option, index) => ({id: index + 1, text: option})).sort(() => 0.5 - Math.random()),
          correct: 1
        });
      }
    });
    exercisesContent.sort(() => 0.5 - Math.random());
    return exercisesContent;
  }
}
