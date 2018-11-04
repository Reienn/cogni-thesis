import { Component, OnInit, Input} from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { ThirdTaskData } from '../../models/TaskContent.data';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.component.html',
  styleUrls: ['./third-task.component.scss']
})
export class ThirdTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: ThirdTaskData;

  constructor() {
    super();
    this.taskId = 3;
   }

  ngOnInit() {
  }

}
