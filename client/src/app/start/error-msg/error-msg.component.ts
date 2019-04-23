import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-error-msg',
  template: `
    <div *ngIf="msg && link" class="error-container">
      <div class="error-msg">
        <h2><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Błąd</h2>{{msg}}
        <button *ngIf="!reportSent" mat-flat-button color="primary" class="report-bug-button" (click)="report()">
          <i class="fa fa-bell" aria-hidden="true"></i> Zgłoś</button>
        <p *ngIf="reportSent">Błąd został zgłoszony</p>
        <a mat-flat-button color="primary" [href]="link"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i> Powrót</a>
      </div>
    </div>
  `
})
export class ErrorMsgComponent implements OnInit {

  @Input() link: string;
  @Input() msg: string;

  reportSent = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  report() {
    const report = {message: this.msg, url: this.router.url};
    this.http.post<any>(environment.baseUrl + '/api/report-bug', report).subscribe( response => {
      this.reportSent = !!response;
    });
  }

}
