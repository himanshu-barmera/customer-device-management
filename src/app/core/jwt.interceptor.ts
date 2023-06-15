import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authS: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    let user = this.authS.userValue;
    let isLoggedIn = user && user.token;
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`
        }
      })
    }

    return next.handle(request);
  }
}
