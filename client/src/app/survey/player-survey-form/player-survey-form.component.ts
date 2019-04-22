import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../auth/services/authentication.service';
import { SurveyService } from '../services/survey.service';

const SURVEY_QUESTIONS = [
  {id: 'likePlaying', label: 'Czy lubisz grać w tę grę?'},
  {id: 'interestingSubject', label: 'Czy gra jest ciekawa?'},
  {id: 'visuallyAppealing', label: 'Czy podoba Ci się grafika?'},
  {id: 'gameEasyInUse', label: 'Czy gra jest prosta w użyciu?'},
  {id: 'recommend', label: 'Czy poleciłbyś/poleciłabyś tę grę kolegom i koleżankom?'}
];

@Component({
  selector: 'app-player-survey-form',
  templateUrl: './player-survey-form.component.html'
})
export class PlayerSurveyFormComponent implements OnInit {

  @Input() user: User;

  @Output() surveySent = new EventEmitter<boolean>();

  surveyForm: FormGroup;
  surveyQuestions = SURVEY_QUESTIONS;
  maxCommentLength = 2000;
  err: string;
  isSent = false;

  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    const questions = this.surveyQuestions.reduce((obj, item) => {
      obj[item.id] = ['', Validators.required];
      return obj;
    }, {});
    this.surveyForm = this.formBuilder.group({
      likert: this.formBuilder.group(questions),
      comments: ['', Validators.maxLength(this.maxCommentLength)]
    });
  }

  submit() {
    if (this.surveyForm.valid) {
      this.surveyService.send(this.surveyForm.getRawValue()).then(
        res => {
          this.isSent = true;
        },
        err => {
          this.err = 'Wystąpił błąd podczas wysyłania ankiety.';
        }
      );
    }
  }

}
