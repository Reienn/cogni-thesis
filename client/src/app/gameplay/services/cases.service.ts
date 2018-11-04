import { Injectable } from '@angular/core';

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

  constructor() { }

  getCases(): Promise<Case[]> {
    return new Promise((resolve, reject) => {
      if (this.cases) {
        resolve(this.cases);
      } else {
        reject('No cases');
      }
    });
  }

  completedCase(id: number) {
    if (id < this.cases.length) {
      this.cases[id].available = true;
    }
  }

  // updateCases(updated: any) {
  //   console.log(updated);
  //   this.cases.map( item => item.id === updated.id ? updated : item );
  // }
}
