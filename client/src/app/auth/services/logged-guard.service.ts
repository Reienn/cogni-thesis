import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if ( user.group && user.group === 'student') {
        this.router.navigate(['gameplay']);
        return false;
      } else if (user.group && user.group === 'educator') {
        this.router.navigate(['control-panel']);
        return false;
      }
    } else {
      return true;
    }
  }
}
