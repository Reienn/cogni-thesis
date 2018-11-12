import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {

  @Output() signedUp = new EventEmitter<string>();

  signupForm: FormGroup;

  err: string;

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

    this.signupForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      psw: ['', [Validators.required, Validators.minLength(7)]],
      psw2: ['', [Validators.required, Validators.minLength(7)]],
      group: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  signup() {
    this.authSubscription = this.authenticationService.signup(this.signupForm.getRawValue()).subscribe(
      user => {
        this.err = '';
        this.signedUp.emit('Utworzono konto, możesz się zalogować');
      },
      err => {
        this.err = err;
    });
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.controls['psw'].value === frm.controls['psw2'].value ? null : {'mismatch': true};
  }

}
