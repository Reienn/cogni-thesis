import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.getUser();
    if (user && user.token) {
      const tokenReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + user.token)
      });
      return next.handle(tokenReq);
    } else {
      return next.handle(req);
    }
  }
}
