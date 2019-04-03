import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="error-container"><div class="error-msg">
      <h2><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Błąd</h2>Strona nie istnieje
      <a mat-flat-button color="primary" href="/"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Powrót</a>
    </div></div>
  `
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
