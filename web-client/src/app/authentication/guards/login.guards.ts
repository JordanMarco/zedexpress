import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SessionService } from 'src/app/shared/services/session-service';
import { Observable } from 'rxjs';

export function loginGuard(): CanActivateFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean => {
    const authService: SessionService = inject(SessionService);
      
    return authService.isLoggedIn();
    
  };
}
