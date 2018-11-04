import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-abstract-task',
  templateUrl: './abstract-task.component.html',
  styleUrls: ['./abstract-task.component.scss']
})
export class AbstractTaskComponent implements OnInit {

  taskId: number;
  @Output() nextTask = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
