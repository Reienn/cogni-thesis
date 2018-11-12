import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../../auth/services/auth-guard.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  selectedAuthForm = 0;
  err: string;
  msg: string;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit() {
    if (this.authGuardService.getErr()) {
      this.err = this.authGuardService.getErr();
      this.selectedAuthForm = 1;
    }
  }

  redirectToLogin(msg) {
    this.msg = msg;
    this.selectedAuthForm = 1;

  }

}
