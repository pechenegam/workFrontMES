import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Urls} from "../utils/urls";
import {AuthStorageService} from "../services/auth-storage.service";
import {Router} from "@angular/router";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  constructor(private authService: AuthService,
              private authStorage: AuthStorageService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.authStorage.load();
    if (auth) {
      request = request.clone({setHeaders: {Authorization: `Bearer ${auth.token}`}});
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && !request.url.includes(Urls.LOGIN) && error.status === 401) {
          return this.handle401Error(request, next);
        }
        this.router.navigate([Urls.LOGIN]);
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.authService.isLoggedIn()) {
        return this.authService.refresh().pipe(
          switchMap(token => {
            this.isRefreshing = false;
            return next.handle(request);
          }),
          catchError(error => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => error);
          })
        );
      }
    }
    this.router.navigate([Urls.LOGIN]);
    return next.handle(request);
  }
}
