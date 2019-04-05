import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../../auth/services/authentication.service';

@Component({
  selector: 'app-completed',
  template: `
    <div class="modal task-completed-modal">
      <div class="modal-content" *ngIf="taskId">
        <h2>Brawo, dobra robota!</h2>
        <p *ngIf="taskId === 1">Teraz musisz poszukać wskazówek, które pomogą znaleźć złodzieja!</p>
        <p *ngIf="taskId === 2">Teraz musisz wskazać złodzieja!</p>
        <p *ngIf="taskId === 3">Pora udać się do kryjówki złodzieja, by odzyskać skradziony przedmiot!</p>
        <p *ngIf="taskId === 4">Udało Ci się znaleźć złodzieja i odzyskać skradziony przedmiot!</p>
        <div *ngIf="pointsSum" class="completed-points">
          Twój {{isBestScore ? 'nowy rekord' : 'wynik'}} to:
          <div>
            <span class="fa-stack fa-1x">
              <i class="fa fa-star fa-stack-2x"></i>
              <i class="fa fa-star fa-stack-2x fa-rotate-180"></i>
              <span class="fa fa-stack-1x points-number">{{pointsSum}}</span>
            </span>
          </div>
        </div>
        <button class="next-task-button" mat-flat-button color="primary" (click)="next()" [disabled]="freezeButton">
          <ng-container *ngIf="taskId !== 4">Dalej</ng-container>
          <ng-container *ngIf="taskId === 4">Zakończ</ng-container>
        </button>
        <img *ngIf="character" src="assets/img/characters/faces/face_{{character}}.png" class="completed-character">
      </div>
    </div>
  `
})
export class CompletedComponent implements OnInit {

  @Input() taskId: number;
  @Input() character: string;
  @Input() pointsSum: number;
  @Input() caseId: number;

  @Output() nextTask = new EventEmitter<boolean>();

  isBestScore: boolean;
  freezeButton = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    this.isBestScore = !(user.bestScores && user.bestScores[this.caseId - 1] !== null &&
                        user.bestScores[this.caseId - 1] > this.pointsSum);
  }

  next() {
    this.freezeButton = true;
    this.nextTask.emit(true);
  }
}
