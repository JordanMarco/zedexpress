import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomNavigationService {
  constructor(private router: Router) {}

  goTo(url: string) {
    this.router.navigate([url]);
  }

  goToWithId(url: string, id: string) {
    const extra: NavigationExtras = {
      queryParams: {
        id: id,
      },
    };
    this.router.navigate([url], extra);
  }

  goToWithData(url: string, data?: any) {
    const extra: NavigationExtras = {
      queryParams: {
        data: data ? JSON.stringify(data) : null,
      },
    };
    this.router.navigate([url], extra);
  }

  goToWithParams(url: string, params: any) {
    const extra: NavigationExtras = {
      queryParams: params,
    };
    this.router.navigate([url], extra);
  }

  goToWithState(url: string, state: any): void {
    this.router.navigate([url], { state: state });
  }
}
