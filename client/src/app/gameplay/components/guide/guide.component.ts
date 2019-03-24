import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html'
})
export class GuideComponent implements OnInit {

  @Input() currentTask: number;

  constructor() { }

  ngOnInit() {
  }

}
