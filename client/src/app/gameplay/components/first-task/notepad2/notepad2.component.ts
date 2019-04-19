import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notes } from '../../../models/task-content.data';

@Component({
  selector: 'app-notepad2',
  templateUrl: './notepad2.component.html'
})
export class Notepad2Component implements OnInit {

  @Input() taskData: Notes[];
  @Output() taskCompleted = new EventEmitter<boolean>();
  @Output() pointsChange = new EventEmitter<number>();

  randomizedTaskData: Notes[];
  questions: Notes[];
  currentQuestion = 0;

  constructor() { }

  ngOnInit() {
    this.taskData.map(item => { item.correct = false; item.empty = true; return item; });
    this.randomizedTaskData = Array.from(this.taskData).sort(() => 0.5 - Math.random());
    this.questions = this.taskData.filter(el => !!el.question);
  }

  chooseAnswer(answerId) {
    if (answerId === this.questions[this.currentQuestion].id) {
      this.pointsChange.emit(1);
      if (this.questions[this.currentQuestion + 1]) {
        this.currentQuestion++;
      } else {
        this.taskCompleted.emit(true);
      }
    } else {
      this.pointsChange.emit(-1);
    }
  }

}
