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

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
    if (this.authGuardService.getErr()) {
      this.err = this.authGuardService.getErr();
      // this.selectedAuthForm = 1;
      this.showLogin = true;
    }
  }

  redirectToLogin(msg) {
    this.msg = msg;
    // this.selectedAuthForm = 1;
    this.showSignup = false;
    this.showLogin = true;
  }

}
