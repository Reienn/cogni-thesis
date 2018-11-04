import { Component, OnInit, Input } from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { FourthTaskData } from '../../models/TaskContent.data';

@Component({
  selector: 'app-fourth-task',
  templateUrl: './fourth-task.component.html',
  styleUrls: ['./fourth-task.component.scss']
})
export class FourthTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: FourthTaskData;

  constructor() {
    super();
    this.taskId = 4;
  }

  ngOnInit() {
  }

}
