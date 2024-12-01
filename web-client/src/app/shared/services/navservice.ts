import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  children2?: Menu[];
  Menusub?: boolean;
  target?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth,
  );

  // Search Box
  public search = false;

  // Language
  public language = false;

  // Mega Menu
  public megaMenu = false;
  public levelMenu = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen = false;
  active: any;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    // Dashboard
    { headTitle: 'MAIN' },
    {
      title: 'Dashboards',
      icon: 'home-8-line',
      type: 'sub',
      selected: false,
      active: false,
      children: [{ path: '/dashboard', title: 'Sales', type: 'link' }],
    },
    //Users
    {
      title: 'Users managment',
      icon: 'group-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/users',
      selected: false,
      type: 'link',
    },
    //Messages
    {
      title: 'Messages managment',
      icon: 'chat-4-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/messages',
      selected: false,
      type: 'link',
    },
    //Clients
    {
      title: 'Clients managment',
      icon: 'service-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/clients',
      selected: false,
      type: 'link',
    },
    //Pack
    {
      title: 'Packages managment',
      icon: 'red-packet-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/packages',
      selected: false,
      type: 'link',
    },
     //Categories
     {
      title: 'Categories managment',
      icon: 'apps-2-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/categories',
      selected: false,
      type: 'link',
    },
     //Incidents
     {
      title: 'Incidents managment',
      icon: 'fire-line',
      active: false,
      badgeClass: 'badge badge-sm bg-secondary badge-hide',
      badgeValue: 'new',
      path: '/incidents',
      selected: false,
      type: 'link',
    },
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
