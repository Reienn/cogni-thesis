import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../auth/services/auth-guard.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  selectedAuthForm = 0;
  err: string;
  msg: string;

  showAbout = false;
  showSignup = false;
  showLogin = false;

  showCookiesInfo = true;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
    if (this.authGuardService.getErr()) {
      this.err = this.authGuardService.getErr();
      // this.selectedAuthForm = 1;
      this.showLogin = true;
    }
    if (localStorage.getItem('confirmedCookies')) {
      this.showCookiesInfo = false;
    }
  }

  redirectToLogin(msg) {
    this.msg = msg;
    // this.selectedAuthForm = 1;
    this.showSignup = false;
    this.showLogin = true;
  }

  hideCookiesInfo() {
    this.showCookiesInfo = false;
    localStorage.setItem('confirmedCookies', 'true');
  }
}
