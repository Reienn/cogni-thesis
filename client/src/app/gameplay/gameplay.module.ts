import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { IntroComponent } from './components/intro/intro.component';
import { FirstTaskComponent } from './components/first-task/first-task.component';
import { SecondTaskComponent } from './components/second-task/second-task.component';
import { ThirdTaskComponent } from './components/third-task/third-task.component';
import { FourthTaskComponent } from './components/fourth-task/fourth-task.component';
import { GameTaskComponent } from './components/game-task/game-task.component';
import { GuideComponent } from './components/guide/guide.component';

const ROUTES: Routes = [
  {
    path: '',
    component: IntroComponent
  },
  {
    path: 'game-task',
    component: GameTaskComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    IntroComponent,
    FirstTaskComponent,
    SecondTaskComponent,
    ThirdTaskComponent,
    FourthTaskComponent,
    GameTaskComponent,
    GuideComponent
  ]
})
export class GameplayModule { }
