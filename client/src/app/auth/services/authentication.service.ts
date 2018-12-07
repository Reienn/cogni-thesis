import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(signupData): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/signup', { ...signupData })
      .pipe(map((user: any) => {
        return user;
      }), catchError((err) => {
        throw(err);
      })
    ).toPromise();
  }

  login(loginData): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/login', { ...loginData })
      .pipe(map((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
      }), catchError((err) => {
        throw(err);
      })
    ).toPromise();
  }

  authUser(): Promise<any> {
    return this.http.get<any>(environment.baseUrl + '/auth-user')
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
