import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TaskContent } from '../models/task-content.data';
import { Performance } from '../models/game-data.data';
import { environment } from '../../../environments/environment';

const DYNAMIC_TASKS_CONTENT = require('../../../assets/dynamic-tasks-content.json');
const CASES =  [
  {
    id: 1,
    name: 'Sprawa pierwsza',
    image: 'room',
    available: true
  },
  {
    id: 2,
    name: 'Sprawa druga',
    image: 'room2',
    available: false
  },
  {
    id: 3,
    name: 'Sprawa trzecia',
    image: 'store1',
    available: false
  },
  {
    id: 4,
    name: 'Sprawa czwarta',
    image: 'museum',
    available: false
  },
  {
    id: 5,
    name: 'Sprawa piąta',
    image: 'store2',
    available: false
  },
  {
    id: 6,
    name: 'Sprawa szósta',
    image: 'restaurant',
    available: false
  },
  {
    id: 7,
    name: 'Sprawa siódma',
    image: 'classroom',
    available: false
  },
  {
    id: 8,
    name: 'Sprawa ósma',
    image: 'playground',
    available: false
  },
  {
    id: 9,
    name: 'Sprawa dziewiąta',
    image: 'beach',
    available: false
  },
  {
    id: 10,
    name: 'Sprawa dziesiąta',
    image: 'inprogress',
    available: false
  }
];


export interface Case {
  id: number;
  name: string;
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  cases: Case[] = JSON.parse(JSON.stringify(CASES));
  dynamicTasksContent = JSON.parse(JSON.stringify(DYNAMIC_TASKS_CONTENT));
  currentCase: number;

  constructor(private http: HttpClient) { }

  getCases(): Promise<{cases: Case[], currentCase: number}> {
    return new Promise((resolve, reject) => {
      if (this.cases) {
        resolve({cases: this.cases, currentCase: JSON.parse(localStorage.getItem('currentUser')).currentCase});
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

        const preparedClues = this.prepareClues([...this.dynamicTasksContent.clues], cluesNumber);
        const people = this.preparePeople([...this.dynamicTasksContent.people], preparedClues, cluesNumber);
        const exercises = this.prepareExercises({...this.dynamicTasksContent.exercises}, [...item.exercises]);

        const randomizedCommands = item.searchingCommands;
        randomizedCommands.sort(() => 0.5 - Math.random());

        resolve({
          firstTask: {
            entry: item.description,
            notes: item.notes.map((note, index) => ({...note, id: index + 1})),
            character: item.character
          },
          secondTask: {
            scene: item.scene,
            clues: randomizedCommands.map((command, index) => ({...command, clueName: preparedClues.active[index].name}))
          },
          thirdTask: {
            people: people,
            clues: preparedClues.active.map(el => el.name)
          },
          fourthTask: {
            exercises: exercises,
            character: item.character
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
        let user;
        user = JSON.parse(localStorage.getItem('currentUser'));
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

  private prepareClues(clues, cluesNumber: number) {
    let activeClues, otherClues;
    clues.sort(() => 0.5 - Math.random());
    activeClues = clues.slice(0, cluesNumber);
    activeClues.sort(() => 0.5 - Math.random());
    otherClues = clues.slice(cluesNumber, clues.length);
    return({active: activeClues, other: otherClues});
  }

  private preparePeople(people, clues, cluesNumber: number) {
    let culpritDescription;
    people.sort(() => 0.5 - Math.random());
    people = people.slice(0, cluesNumber);

    culpritDescription = clues.active.map(el => el.description);
    culpritDescription.sort(() => 0.5 - Math.random());
    people[0] = {...people[0],
      isCulprit: true,
      description: culpritDescription.join(' ')
    };

    for (let i = 1; i < people.length; i++) {
      let cluesForInnocent = [...clues.active];
      cluesForInnocent.sort(() => 0.5 - Math.random());
      cluesForInnocent.pop();
      cluesForInnocent = [...cluesForInnocent, ...clues.other];
      cluesForInnocent = cluesForInnocent.slice(0, cluesNumber);
      people[i] = {...people[i],
        isCulprit: false,
        description: cluesForInnocent.map(el => el.description).join(' ')
      };
    }
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
          question: el.question,
          options: options.map((option, index) => ({id: index + 1, text: option})),
          correct: 1
        });
      }
    });
    return exercisesContent;
  }
}
