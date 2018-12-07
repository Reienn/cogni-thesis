import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="page-not-found">
      <h2>Strona nie istnieje</h2>
      <a mat-raised-button href="/">Powrót</a>
    </div>
  `
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
