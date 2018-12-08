import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import {
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatButtonToggleModule } from '@angular/material';

import { StartModule } from '../start/start.module';

import { IntroComponent } from './components/intro/intro.component';
import { FirstTaskComponent } from './components/first-task/first-task.component';
import { SecondTaskComponent } from './components/second-task/second-task.component';
import { ThirdTaskComponent } from './components/third-task/third-task.component';
import { FourthTaskComponent } from './components/fourth-task/fourth-task.component';
import { GameTaskComponent } from './components/game-task/game-task.component';
import { GuideComponent } from './components/guide/guide.component';
import { AbstractTaskComponent } from './components/abstract-task/abstract-task.component';
import { NotepadComponent } from './components/first-task/notepad/notepad.component';

const ROUTES: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: ':id',
    component: GameTaskComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    DragulaModule.forRoot(),
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    StartModule
  ],
  declarations: [
    IntroComponent,
    FirstTaskComponent,
    SecondTaskComponent,
    ThirdTaskComponent,
    FourthTaskComponent,
    GameTaskComponent,
    GuideComponent,
    AbstractTaskComponent,
    NotepadComponent
  ]
})
export class GameplayModule { }
