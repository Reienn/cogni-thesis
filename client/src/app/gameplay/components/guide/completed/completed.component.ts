import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

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
  @Output() nextTask = new EventEmitter<boolean>();

  freezeButton = false;

  constructor() { }

  ngOnInit() {
  }

  next() {
    this.freezeButton = true;
    this.nextTask.emit(true);
  }
}
