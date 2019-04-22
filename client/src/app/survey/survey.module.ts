import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule } from '@angular/material';

import { SurveyFormComponent } from './survey-form/survey-form.component';
import { PlayerSurveyFormComponent } from './player-survey-form/player-survey-form.component';

@NgModule({
  declarations: [SurveyFormComponent, PlayerSurveyFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  exports: [
    SurveyFormComponent,
    PlayerSurveyFormComponent
  ]
})
export class SurveyModule { }
