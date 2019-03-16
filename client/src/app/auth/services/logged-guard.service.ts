import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    const user = this.authenticationService.getUser();
    if (user) {
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
