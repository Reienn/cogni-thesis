import { Component, OnInit, Input } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { FourthTaskData } from '../../models/TaskContent.data';

@Component({
  selector: 'app-fourth-task',
  templateUrl: './fourth-task.component.html'
})
export class FourthTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: FourthTaskData;

  isCompleted = false;

  constructor() {
    super();
    this.taskId = 4;
  }

  ngOnInit() {
  }

  selectAnswer() {
    this.isCompleted = this.taskData.exercises.filter(item => item.correct !== item.selected).length ? false : true;
  }

}
