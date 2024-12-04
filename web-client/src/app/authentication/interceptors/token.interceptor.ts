import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public sessionService: SessionService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.sessionService.getUser();

    if (this.sessionService.getAccessToken()) {
      request = this.addToken(request, this.sessionService.getAccessToken());
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
