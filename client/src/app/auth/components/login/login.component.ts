import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  @Input() err: string;
  @Input() msg: string;

  loginForm: FormGroup;

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
  }

  login() {
    this.authenticationService.login(this.loginForm.getRawValue()).then(
      user => {
        this.redirectLogged(user);
      },
      err => {
        console.log(err);
        this.err = err.status === 422 ? 'Błędne dane' : 'Błąd logowania';
      });
  }

  private redirectLogged(user) {
    if ( user.group && user.group === 'student') {
      this.router.navigate(['gameplay']);
    } else if (user.group && user.group === 'educator') {
      this.router.navigate(['control-panel']);
    }
  }

}
