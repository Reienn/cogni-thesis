import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  err: string;
  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      this.err = '';
      return true;
    }
    this.router.navigate(['/']);
    this.err = 'Nie jesteś zalogowany';
    return false;
  }

  getErr() {
    return this.err;
  }
}
