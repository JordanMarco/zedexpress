/* eslint-disable no-constant-condition */
import { Component, ElementRef } from '@angular/core';
import { NavService } from '../../services/navservice';
import { SessionService } from '../../services/session-service';
import { IUser } from '../../models/User';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user!: IUser;
  currentLang: string;

  constructor(
    public navServices: NavService,
    private elementRef: ElementRef,
    private sessionService: SessionService,
    private languageService: LanguageService,
    public translateService: TranslateService,
    private eventService: EventService
  ) {
    this.user = this.sessionService.getUser();
    this.currentLang = this.translateService.currentLang;
    this.eventService.subscribe('change:language', ()=>{
      this.currentLang = this.translateService.currentLang;
    })
  }

  themeChange(type: string, type1: string) {
    this.elementRef.nativeElement.ownerDocument.documentElement?.setAttribute(
      'class',
      type,
    );
    this.elementRef.nativeElement.ownerDocument.documentElement?.setAttribute(
      'style',
      '',
    );
    localStorage.removeItem('synto-background-mode-body');
    localStorage.removeItem('synto-background-mode-dark');
    localStorage.setItem('synto-theme-mode', type);
    this.elementRef.nativeElement.ownerDocument.documentElement?.setAttribute(
      'data-header-styles',
      type1,
    );
    localStorage.setItem('synto-header-mode', type1);

    if (type == 'dark') {
      const darkbtn = document.querySelector(
        '#switcher-dark-theme',
      ) as HTMLInputElement;
      darkbtn.checked = true;
    } else {
      const lightbtn = document.querySelector(
        '#switcher-light-theme',
      ) as HTMLInputElement;
      lightbtn.checked = true;
    }
  }

  toggleSidebar() {
    const html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (window.innerWidth <= 992) {
      html?.setAttribute(
        'toggled',
        html?.getAttribute('toggled') == 'open' ? 'close' : 'open',
      );
      if (html?.getAttribute('toggled') == 'open') {
        document.querySelector('#responsive-overlay')?.classList.add('active');
      } else {
        document
          .querySelector('#responsive-overlay')
          ?.classList.remove('active');
      }
    } else if (!localStorage.getItem('synto-menu-styles')) {
      html?.setAttribute(
        'toggled',
        html?.getAttribute('toggled') == 'icon-overlay-close'
          ? ''
          : 'icon-overlay-close',
      );
    } else {
      if (localStorage.getItem('synto-menu-styles') == 'menu-click') {
        html?.setAttribute(
          'toggled',
          html?.getAttribute('toggled') == 'menu-click-closed'
            ? ''
            : 'menu-click-closed',
        );
      }
      if (localStorage.getItem('synto-menu-styles') == 'menu-hover') {
        html?.setAttribute(
          'toggled',
          html?.getAttribute('toggled') == 'menu-hover-closed'
            ? ''
            : 'menu-hover-closed',
        );
      }
      if (localStorage.getItem('synto-menu-styles') == 'icon-click') {
        html?.setAttribute(
          'toggled',
          html?.getAttribute('toggled') == 'icon-click-closed'
            ? ''
            : 'icon-click-closed',
        );
      }
      if (localStorage.getItem('synto-menu-styles') == 'icon-hover') {
        html?.setAttribute(
          'toggled',
          html?.getAttribute('toggled') == 'icon-hover-closed'
            ? ''
            : 'icon-hover-closed',
        );
      }
    }
  }

  isShowDiv = false;

  removeRow(rowId: string) {
    const rowElement = document.getElementById(rowId);
    if (rowElement) {
      rowElement.remove();
    }
  }

  ngOnDestroy(): void {
    const windowObject: any = window;
    const html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (windowObject.innerWidth <= '991') {
      html?.setAttribute('toggled', 'open');
    }
    window.addEventListener('resize', () => {
      if (localStorage.getItem('synto-menu-style') != 'icon-text-close') {
        if (windowObject.innerWidth <= '991') {
          html?.setAttribute('toggled', 'open');
        } else {
          if (
            !(localStorage.getItem('synto-menu-style') == 'double-menu-open')
          ) {
            html?.removeAttribute('toggled');
          }
        }
      } else {
        document
          .querySelector('html')
          ?.setAttribute('toggled', 'icon-text-close');
      }
    });
  }

  handleCardClick(event: MouseEvent) {
    // Prevent the click event from propagating to the container
    event.stopPropagation();
  }
  removetheModal() {
    const element: any = document.querySelector('.serachmodal');
    element.click();
  }

  handleLanguageChange(lang: 'EN' | 'FR'): void {
    this.languageService.changeLanguage(lang.toLocaleLowerCase());
  }

  logout(): void {
    this.sessionService.logout();
  }
}
