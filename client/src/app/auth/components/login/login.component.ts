import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  @Input() err: string;
  @Input() msg: string;

  loginForm: FormGroup;

  authSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['gameplay']);
    }

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      psw: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  login() {
    this.authSubscription = this.authenticationService.login(this.loginForm.getRawValue()).subscribe(
      user => {
        this.router.navigate(['gameplay']);
      },
      err => {
        this.err = err;
      });
  }

}
