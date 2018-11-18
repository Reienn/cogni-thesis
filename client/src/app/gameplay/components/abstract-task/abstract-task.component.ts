import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-abstract-task',
  templateUrl: './abstract-task.component.html'
})
export class AbstractTaskComponent implements OnInit {

  taskId: number;
  @Output() nextTask = new EventEmitter<number>();
  @Output() pointsChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
