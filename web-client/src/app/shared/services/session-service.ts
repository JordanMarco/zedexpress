import { Injectable } from '@angular/core';
import { CustomNavigationService } from './custom-navigation.service';
import {
  ACCESS_TOKEN_KEY,
  CURRENT_ROLE,
  USER_KEY,
  LANG,
} from 'src/app/shared/utils/constants';
import { IAccountType, IUser } from '../models/User';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AccountCode } from '../enums/enums';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    public navigationService: CustomNavigationService,
    private eventService: EventService,
    private authService: AuthService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    private customNavigationService: CustomNavigationService,
  ) {}

  public storeUser(user: IUser): void {
    this.eventService.publish('user:updated', user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IUser {
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  }

  public deleteUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  public storeAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_KEY)!;
  }

  public storeCurrentRole(role: IAccountType): void {
    localStorage.setItem(CURRENT_ROLE, JSON.stringify(role));
  }

  public getCurrentRole(): IAccountType {
    return JSON.parse(localStorage.getItem(CURRENT_ROLE)!);
  }

  public deleteCurrentRole(): void {
    return localStorage.removeItem(CURRENT_ROLE)!;
  }

  public deleteAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  public localLogin(user: IUser, token: string): void {
    this.storeUser(user);
    this.storeAccessToken(token);
    this.storeCurrentRole(user.account!);
  }

  public storeLanguage(lang: string): void {
    localStorage.setItem(LANG, lang);
  }

  public getLanguage(): string {
    return localStorage.getItem(LANG)!;
  }

  public deleteLanguage(): string {
    return localStorage.removeItem(LANG)!;
  }

  public logout(redirect = true): void {
    this.authService.logout().subscribe({
      next: () => {
        this.clearStorage(redirect);
      },
      error: () => {
        this.clearStorage(redirect);
      },
    });
  }

  clearStorage(redirect = false): void {
    this.deleteUser();
    this.deleteAccessToken();
    this.deleteCurrentRole();
    if (redirect) this.customNavigationService.goTo('/login');
  }

  public isLoggedIn(): boolean {
    const user: IUser = this.getUser();
    const token: string = this.getAccessToken();
    return user !== null && token !== null;
  }

  hasAccounType(accountCode: AccountCode, country?: string): boolean {
    const accountType = this.getUser().account;
    if (country)
      return (
        country === accountType!.country && accountCode === accountType!.code
      );

    return accountCode === accountType!.code;
  }
}
