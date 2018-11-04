import { Component, OnInit, Input } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { FirstTaskData } from '../../models/TaskContent.data';

@Component({
  selector: 'app-first-task',
  templateUrl: './first-task.component.html',
  styleUrls: ['./first-task.component.scss']
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
}
