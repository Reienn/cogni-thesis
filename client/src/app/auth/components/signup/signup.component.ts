import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {

  @Output() signedUp = new EventEmitter<string>();

  err: string;
  msg: string;
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

  signup() {
    if (this.user.name && this.user.psw && this.user.psw2 && this.user.mail) {
      if (!/[^\s]{5,}/.test(this.user.name) ) {
        this.err = 'Nazwa musi mieć min. 5 znaków i nie zawierać spacji';
        return false;
      }

      if (!/[^\s]{7,}/.test(this.user.psw)) {
        this.err = 'Hasło musi mieć min. 7 znaków';
        return false;
      }

      if (this.user.psw !== this.user.psw2) {
        this.err = 'Hasła się różnią';
        return false;
      }

      this.authSubscription = this.authenticationService.signup(this.user.name, this.user.psw, this.user.mail).subscribe(
        user => {
          this.err = '';
          this.signedUp.emit('Utworzono konto, możesz się zalogować');
        },
        err => {
          this.err = err;
        });
    }
  }

}
