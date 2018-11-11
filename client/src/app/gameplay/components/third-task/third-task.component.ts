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
    if (this.taskData && this.taskData.people && this.taskData.people) {
      this.taskData.clues.sort(() => 0.5 - Math.random());
      this.taskData.people.sort(() => 0.5 - Math.random());
    }
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
