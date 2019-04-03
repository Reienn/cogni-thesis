import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import {
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatFormFieldModule, MatInputModule } from '@angular/material';

import { StartModule } from '../start/start.module';
import { AuthModule } from '../auth/auth.module';

import { IntroComponent } from './components/intro/intro.component';
import { FirstTaskComponent } from './components/first-task/first-task.component';
import { SecondTaskComponent } from './components/second-task/second-task.component';
import { ThirdTaskComponent } from './components/third-task/third-task.component';
import { FourthTaskComponent } from './components/fourth-task/fourth-task.component';
import { GameTaskComponent } from './components/game-task/game-task.component';
import { GuideComponent } from './components/guide/guide.component';
import { AbstractTaskComponent } from './components/abstract-task/abstract-task.component';
import { NotepadComponent } from './components/first-task/notepad/notepad.component';
import { CompletedComponent } from './components/guide/completed/completed.component';
import { MenuComponent } from './components/menu/menu.component';
import { Notepad2Component } from './components/first-task/notepad2/notepad2.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'list',
    component: IntroComponent
  },
  {
    path: 'list/:id',
    component: GameTaskComponent
  }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    DragulaModule.forRoot(),
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    StartModule,
    AuthModule
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
    NotepadComponent,
    CompletedComponent,
    MenuComponent,
    Notepad2Component
  ]
})
export class GameplayModule { }
