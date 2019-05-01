import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { FourthTaskData } from '../../models/task-content.data';

@Component({
  selector: 'app-fourth-task',
  templateUrl: './fourth-task.component.html'
})
export class FourthTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: FourthTaskData;
  @Input() pointsSum: number;
  @Input() caseId: number;

  hasCode = false;
  isOpen = false;
  isCompleted = false;

  currentQuestion = 0;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.taskId = 4;
  }

  ngOnInit() { }

  selectAnswer(selected, correct, id) {
    this.taskData.exercises.find(item => item.id === id).done = selected === correct ? true : false;
    this.pointsChange.emit(selected === correct ? 1 : -1);
    this.hasCode = this.taskData.exercises.filter(item => !item.done).length ? false : true;
    if (selected === correct && !this.hasCode) {
      this.currentQuestion++;
      this.changeDetectorRef.detectChanges();
    }
  }

}
