import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SessionService } from 'src/app/shared/services/session-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private static showMessage = true;
  private static showForbiddenMessage = true;

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: false,
    });
    return next
      .handle(request)
      .pipe(
        map((data: HttpEvent<any>) => {
          return data;
        })
      )
      .pipe(
        catchError(err => {
          if (
            err &&
            (err.status === 401 || err.statusText === 'Unauthorized')
          ) {
            return this.forbidden();
          }
          if (err && (err.status === 403 || err.statusText === 'Forbidden')) {
            this.notificationService.warning(
              this.translateService.instant('errors.unauthorized-request')
            );
          }

          if (err && err.status === 406) {
            this.notificationService.danger(
              this.translateService.instant(
                err.error?.translate ?? 'errors.wrong-file-type'
              )
            );
          }

          if (err && err.status === 408) {
            this.notificationService.danger(
              this.translateService.instant(
                err.error?.translate ?? 'errors.max-file-size-per-day-wait'
              )
            );
          }
          return this.errorToMessage(err);
        })
      );
  }

  public forbidden(): any[] {
    if (ErrorInterceptor.showForbiddenMessage) {
      this.notificationService.warning(
        this.translateService.instant('errors.forbidden')
      );
      ErrorInterceptor.showForbiddenMessage = false;
      setTimeout(() => (ErrorInterceptor.showForbiddenMessage = true), 3000);
    }
    this.sessionService.clearStorage();
    return [];
  }

  public logout(): any[] {
    if (ErrorInterceptor.showMessage) {
      // notify warming
    } else {
      ErrorInterceptor.showMessage = true;
    }
    this.sessionService.clearStorage();
    return [];
  }

  public errorToMessage(err: any): Observable<any> {
    const error: Error = err.error;
    return throwError(error);
  }
}
