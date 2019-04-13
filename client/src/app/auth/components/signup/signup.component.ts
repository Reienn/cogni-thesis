import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  @Output() signedUp = new EventEmitter<string>();

  signupForm: FormGroup;

  err: string;

  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.authenticationService.getUser()) {
      this.router.navigate(['gameplay']);
    }

    this.signupForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      psw: ['', [Validators.required, Validators.minLength(7)]],
      psw2: ['', [Validators.required, Validators.minLength(7)]],
      group: ['', Validators.required],
      educator: ['', []]
    }, {validator: this.passwordMatchValidator});
  }

  signup() {
    this.loading = true;
    this.authenticationService.signup(this.signupForm.getRawValue()).then(
      userName => {
        this.err = '';
        this.signupForm.reset();
        this.signedUp.emit(`Witaj ${userName}, możesz się zalogować`);
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.err = err.status === 409 ? 'Nazwa użytkownika jest już zajęta' : 'Błąd rejestracji';
    });
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.get('psw').value === frm.get('psw2').value ? null : {'mismatch': true};
  }

}
