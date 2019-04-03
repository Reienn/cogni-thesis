import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="error-container"><div class="error-msg">
      <h2><i class="fa fa-exclamation-triangle"></i> Błąd</h2>Strona nie istnieje
      <a mat-flat-button color="primary" [routerLink]="['/']"><i class="fa fa-arrow-circle-left"></i> Powrót</a>
    </div></div>
  `
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
