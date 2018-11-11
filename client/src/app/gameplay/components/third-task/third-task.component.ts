import { Component, OnInit, Input} from '@angular/core';
import { AbstractTaskComponent } from '../abstract-task/abstract-task.component';
import { ThirdTaskData } from '../../models/TaskContent.data';

@Component({
  selector: 'app-third-task',
  templateUrl: './third-task.component.html'
})
export class ThirdTaskComponent extends AbstractTaskComponent implements OnInit {

  @Input() taskData: ThirdTaskData;

  isCompleted = false;
  mistake = false;

  constructor() {
    super();
    this.taskId = 3;
   }

  ngOnInit() {
  }

  decide(isCulprit) {
    if (isCulprit) {
      this.isCompleted = true;
      this.mistake = false;
    } else {
      this.mistake = true;
    }
  }
}
