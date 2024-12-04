import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { takeUntil, debounceTime, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from './session-service';
import { AccountCode } from '../enums/enums';
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
  showable?: boolean;
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
  public hasAdminAccount = false;
  public hasAgentAccount = false;
  public hasClientAccount = false;

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
  public MENUITEMS!: Menu[];
  items: BehaviorSubject<Menu[]>;

  constructor(private router: Router, private translateService: TranslateService, private sessionService: SessionService) {
    this.translateService.onLangChange.subscribe(() => {
      this.items.next(this.items.value);
    });
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

    this.hasAdminAccount = this.sessionService.hasAccounType(AccountCode.ADMIN);
    this.hasAgentAccount = this.sessionService.hasAccounType(AccountCode.AGENT);
    this.hasClientAccount = this.sessionService.hasAccounType(AccountCode.CLIENT);

    this.MENUITEMS = [
      // Dashboard
      { title: 'MENU.MAIN', headTitle: 'MAIN' },
      {
        title: 'MENU.DASHBOARD',
        icon: 'home-8-line',
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        type: 'link',
        path: '/dashboard',
        selected: false,
        active: false,
        showable: true
      },
      //Users
      {
        title: 'MENU.USERS',
        icon: 'group-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/users',
        selected: false,
        type: 'link',
        showable: this.hasAdminAccount
      },
      //Messages
      {
        title: 'MENU.MESSAGES',
        icon: 'chat-4-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/messages',
        selected: false,
        type: 'link',
        showable: this.hasAdminAccount
      },
      //Clients
      {
        title: 'MENU.CLIENTS',
        icon: 'service-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/clients',
        selected: false,
        type: 'link',
        showable: this.hasAgentAccount || this.hasAdminAccount
      },
      //Tracking
      {
        title: 'MENU.TRACKING',
        icon: 'red-packet-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/tracking',
        selected: false,
        type: 'link',
        showable: this.hasClientAccount || this.hasAgentAccount
      },
      //Pack
      {
        title: 'MENU.PACKAGES',
        icon: 'red-packet-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/packages',
        selected: false,
        type: 'link',
        showable: this.hasAgentAccount || this.hasAdminAccount
      },
       //Categories
       {
        title: 'MENU.CATEGORIES',
        icon: 'apps-2-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/categories',
        selected: false,
        type: 'link',
        showable: this.hasAdminAccount
      },
       //Incidents
       {
        title: 'MENU.INCIDENTS',
        icon: 'fire-line',
        active: false,
        badgeClass: 'badge badge-sm bg-secondary badge-hide',
        badgeValue: 'new',
        path: '/incidents',
        selected: false,
        type: 'link',
        showable: true
      }
    ];

    this.items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  }


  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  getMenuItems(): Observable<Menu[]> {
    return this.items.asObservable().pipe(
      map(items => items.map(item => ({
        ...item,
        title: this.translateService.instant(item.title!)
      })))
    );
  }
}
