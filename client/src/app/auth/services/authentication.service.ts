import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(signupData): Promise<any> {
    return this.http.post<any>('http://localhost:3000/signup', { ...signupData })
      .pipe(map((user: any) => {
        return user;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }

  login(loginData): Promise<any> {
    return this.http.post<any>('http://localhost:3000/login', { ...loginData })
      .pipe(map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }

  authUser(): Promise<any> {
    return this.http.get<any>('http://localhost:3000/auth-user')
      .pipe(map((user: any) => {
        if (user) {
          return user;
        } else {
          return false;
        }
      })).toPromise();
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['']);
    }
  }

}
