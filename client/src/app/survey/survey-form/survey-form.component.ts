import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../auth/services/authentication.service';
import { SurveyService } from '../services/survey.service';

const SURVEY_QUESTIONS = [
  {id: 'interestingSubject', label: 'Czy tematyka gry jest ciekawa?'},
  {id: 'visuallyAppealing', label: 'Czy gra jest atrakcyjna wizualnie?'},
  {id: 'gameEasyInUse', label: 'Czy gra jest łatwa w użytkowaniu?'},
  {id: 'controlPanelEasyInUse', label: 'Czy panel nauczyciela jest prosty w obsłudze?'},
  {id: 'difficulty', label: 'Czy trudność zadań jest odpowiednia?'},
  {id: 'educational', label: 'Czy gra jest użyteczna w ćwiczeniu czytania ze zrozumieniem?'},
  {id: 'recommend', label: 'Czy poleciłby/aby Pan/i tę grę jako pomoc edukacyjną?'}
];

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html'
})
export class SurveyFormComponent implements OnInit {

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
