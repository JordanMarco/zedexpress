import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';

const breakpoints = {
  xs: 475,
  md: 815,
  lg: 1024,
  xl: 1576,
  '2xl': 1536,
};

@Injectable({
  providedIn: 'root',
})
export class BreakpointMatcherService {
  public reached = new BehaviorSubject<boolean>(false);
  currentBreakpoint: keyof typeof breakpoints = 'md';
  constructor(private breakpointObserver: BreakpointObserver) {}

  initObserver(breakpoint: keyof typeof breakpoints): Observable<any> {
    this.currentBreakpoint = breakpoint;
    return this.breakpointObserver.observe([
      `(min-width: ${breakpoints[breakpoint]}px)`,
    ]);
  }
}
