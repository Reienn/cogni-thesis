import { Component, OnInit, Input } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { SecondTaskData } from '../../models/TaskContent.data';
@Component({
  selector: 'app-second-task',
  templateUrl: './second-task.component.html',
  styleUrls: ['./second-task.component.scss']
})
export class SecondTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: SecondTaskData;

  constructor() {
    super();
    this.taskId = 2;
   }

  ngOnInit() {
  }

}
