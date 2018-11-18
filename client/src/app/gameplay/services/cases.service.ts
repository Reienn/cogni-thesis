import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { TaskContent } from '../models/task-content.data';
import { Performance } from '../models/game-data.data';


const TASKS_CONTENT = require('../../../assets/tasks-content.json');
const CASES =  [
  {
    id: 1,
    name: 'Misja pierwsza',
    available: true
  },
  {
    id: 2,
    name: 'Misja druga',
    available: false
  },
  {
    id: 3,
    name: 'Misja trzecia',
    available: false
  },
  {
    id: 4,
    name: 'Misja czwarta',
    available: false
  },
  {
    id: 5,
    name: 'Misja piąta',
    available: false
  },
  {
    id: 6,
    name: 'Misja szósta',
    available: false
  },
  {
    id: 7,
    name: 'Misja siódma',
    available: false
  },
  {
    id: 8,
    name: 'Misja ósma',
    available: false
  },
  {
    id: 9,
    name: 'Misja dziewiąta',
    available: false
  },
  {
    id: 10,
    name: 'Misja dziesiąta',
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
  tasksContent = JSON.parse(JSON.stringify(TASKS_CONTENT));

  constructor(private http: HttpClient) { }

  getCases(): Promise<Case[]> {
    return new Promise((resolve, reject) => {
      if (this.cases) {
        resolve(this.cases);
      } else {
        reject('No cases');
      }
    });
  }

  getTasksContent(): Promise<TaskContent[]> {
    return new Promise((resolve, reject) => {
      if (this.tasksContent) {
        resolve(this.tasksContent);
      } else {
        reject('No tasks content');
      }
    });
  }

  completedCase(id: number, performance: Performance[]) {
    this.updatePerformance(performance).then(data => {
      console.log(data);
    });
    if (id < this.cases.length) {
      this.cases[id].available = true;
    }
  }

  private updatePerformance(performance: Performance[]): Promise<any> {
    return this.http.post<any>('http://localhost:3000/performance', {performance: performance})
      .pipe(map((response: any) => {
        return response;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }
  // updateCases(updated: any) {
  //   console.log(updated);
  //   this.cases.map( item => item.id === updated.id ? updated : item );
  // }
}
