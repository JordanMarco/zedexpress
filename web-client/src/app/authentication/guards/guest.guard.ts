import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SessionService } from 'src/app/shared/services/session-service';
import { Observable } from 'rxjs';
import { CustomNavigationService } from 'src/app/shared/services/custom-navigation.service';

export function guestGuard(): CanActivateFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean => {
    const authService: SessionService = inject(SessionService);
    const navigationService: CustomNavigationService = inject(CustomNavigationService);

    if(authService.isLoggedIn())
      navigationService.goTo('')
    return !authService.isLoggedIn();
    
  };
}
