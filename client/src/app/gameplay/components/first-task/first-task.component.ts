import { Component, OnInit, Input } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { FirstTaskData } from '../../models/task-content.data';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html'
})
export class FirstTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: FirstTaskData;

  isCompleted = false;

  constructor() {
    super();
    this.taskId = 1;
  }

  ngOnInit() { }

  taskCompleted(event) {
    this.isCompleted = event;
  }

  updatePoints(change) {
    this.pointsChange.emit(change);
  }
}
