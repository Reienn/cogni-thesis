import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() err: string;
  @Input() msg: string;

  user: any = {};

  authSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['gameplay']);
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  login() {
    this.authSubscription = this.authenticationService.login(this.user.name, this.user.psw).subscribe(
      user => {
        this.router.navigate(['gameplay']);
      },
      err => {
        this.err = err;
      });
  }

}
