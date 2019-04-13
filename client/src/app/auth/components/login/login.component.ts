import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @Input() err: string;
  @Input() msg: string;

  loginForm: FormGroup;

  requestResetControl: FormControl;
  resetErr: string;
  resetMsg: string;
  requestResetVisible = false;

  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      psw: ['', Validators.required]
    });
    this.requestResetControl = new FormControl('', [
      Validators.required, Validators.email
    ]);
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.getRawValue()).then(
      user => {
        this.redirectLogged(user);
      },
      err => {
        this.loading = false;
        this.err = err.status === 422 ? 'Błędne dane' : 'Błąd logowania';
      });
  }

  showRequestReset() {
    this.requestResetVisible = true;
    this.resetErr = null;
    this.resetMsg = null;
  }

  requestReset() {
    if (this.requestResetControl.valid) {
      this.authenticationService.requestReset(this.requestResetControl.value).then(
        user => {
          this.resetErr = null;
          this.resetMsg = 'Wysłano wiadomość na podany adres e-mail.';
          this.requestResetVisible = false;
        },
        err => {
          this.resetErr = err.status === 422 ? 'Nie znaleziono podanego adresu e-mail.' : 'Błąd wysyłania wiadomości.';
        });
    }
  }

  private redirectLogged(user) {
    if ( user.group && user.group === 'student') {
      this.router.navigate(['gameplay']);
      const elem = document.documentElement;
      if (elem && elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else if (user.group && user.group === 'educator') {
      this.router.navigate(['control-panel']);
    }
  }

}
