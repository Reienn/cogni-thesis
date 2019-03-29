import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EducatorAuthGuardService implements CanActivate {
  err: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate() {
    return this.authenticationService.authUser().then(
      data => {
        if (data && data.user.group === 'educator') {
          this.err = '';
          return true;
        } else {
          this.router.navigate(['gameplay']);
          return false;
        }
      },
      error => {
        this.router.navigate(['/']);
        this.err = 'Nie jesteś zalogowany';
        return false;
      }
    );
  }

  getErr() {
    return this.err;
  }
}
