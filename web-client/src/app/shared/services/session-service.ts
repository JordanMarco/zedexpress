import { Injectable } from '@angular/core';

import { CustomNavigationService } from './custom-navigation.service';
import {
  ACCESS_TOKEN_KEY,
  CURRENT_ROLE,
  USER_KEY,
  LANG,
} from 'src/app/core/utils/constant';
import { AdminRole, DefaultRole, IRole, IUser } from '../models/User';
import { Country, Currency } from '../models/Common';
import {
  AdminRoleType,
  GroupType,
  PostLoginAtions,
  UserType,
} from '../enums/enums';
import {
  RestAuthentificationService,
  CurrencyService,
  UseCaseTotpService,
  UserService,
} from '../rest-services/rest-services';
import { EventService } from './event.service';
import { ServicesService } from './services.service';
import { PushNotificationService } from './push-notification.service';
import { ILoginResponse } from '../models/Login';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';
import { LoginPostActionParams } from '../utils/type';
import { PreLoginInfosComponent } from 'src/app/shared-components/login/pre-login-infos/pre-login-infos.component';
import { LoginModalComponent } from 'src/app/shared-components/login/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    public navigationService: CustomNavigationService,
    private currencyService: CurrencyService,
    private eventService: EventService,
    private services: ServicesService,
    private userService: UserService,
    private pushNotivationService: PushNotificationService,
    public authService: RestAuthentificationService,
    public notificationService: NotificationService,
    public translateService: TranslateService,
    public totpService: UseCaseTotpService
  ) {}

  public storeUser(user: IUser): void {
    this.services.eventService.publish('user:updated', user);
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

  public storeCurrentRole(role: IRole): void {
    localStorage.setItem(CURRENT_ROLE, JSON.stringify(role));
  }

  public getCurrentRole(): IRole {  
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

  clearStorage(): void {
    this.deleteUser();
    this.deleteAccessToken();
    this.deleteCurrentRole();
  }

  public isLoggedIn(): boolean {
    const user: IUser = this.getUser();
    const token: string = this.getAccessToken();
    return user !== null && token !== null;
  }

}
