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
    if (this.taskData && this.taskData.exercises) {
      this.taskData.exercises.map(item => {
        item.done = false;
        item.options.sort(() => 0.5 - Math.random());
        return item;
      });
      this.taskData.exercises.sort(() => 0.5 - Math.random());
    }
  }

  selectAnswer(selected, correct, id) {
    this.taskData.exercises.find(item => item.id === id).done = selected === correct ? true : false;
    this.isCompleted = this.taskData.exercises.filter(item => !item.done).length ? false : true;
  }

}
