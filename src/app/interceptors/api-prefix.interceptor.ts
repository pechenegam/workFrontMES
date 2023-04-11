import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({
      url: request.url.startsWith('http') ? request.url : environment.apiUrl + ApiPrefixInterceptor.update(request.url)
    }));
  }

  private static update(url: string): string {
    const pattern = /^\/?([0-9a-zA-Z\\-]+)([?].*)?$/;
    if (url.match(pattern)) {
      return url.replace(pattern, '$1/$2');
    }
    return url;
  }
}
