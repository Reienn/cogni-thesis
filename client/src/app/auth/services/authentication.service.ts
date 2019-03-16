import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface User {
  token: string;
  group: string;
  name: string;
  currentCase: number;
  educator?: string;
  mail: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  signup(signupData): Promise<string> {
    return this.http.post<any>(environment.baseUrl + '/api/signup', { ...signupData })
      .pipe(map((user: any) => {
        return user.name;
      }), catchError((err) => {
        throw(err);
      })
    ).toPromise();
  }

  login(loginData): Promise<User> {
    return this.http.post<any>(environment.baseUrl + '/api/login', { ...loginData })
      .pipe(map((user: User) => {
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
    return this.http.get<any>(environment.baseUrl + '/api/auth-user')
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
    }
    this.router.navigate(['']);
  }

  updateUser(userUpdate): Promise<any> {
    return this.http.post<any>(environment.baseUrl + '/api/update-user', {userUpdate: userUpdate})
      .pipe(map((response: any) => {
        return response;
      }), catchError((err) => {
        throw(err.error);
      })
    ).toPromise();
  }
}
