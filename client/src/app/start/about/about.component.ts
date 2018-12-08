import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {

  @Output() modalClose = new EventEmitter<boolean>();

  constructor() { }

}
