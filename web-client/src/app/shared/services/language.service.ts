import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../models/Common';
import { ServicesService } from './services.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session-service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public deviceLanguage: string = '';

  constructor(
    private translateService: TranslateService,
    public sessionServices: SessionService,
    public eventService: EventService,
    private http: HttpClient
  ) {}

  public changeLanguage(lang: string): void {
    this.deviceLanguage = lang;
    this.translateService.use(this.deviceLanguage);
    this.eventService.publish('change:language');
  }

  public get(key: string[], options?: any) {
    if (options) return this.translateService.get(key, options);
    return this.translateService.get(key);
  }

  public getTextOnLanguages(languages: Language[]) {
    if (languages == null) {
      return '/!\\ Translation error, null';
    }

    var lang = this.translateService.currentLang;
    for (const element of languages) {
      if (element.code == lang) {
        if (element.pivot.data != null) {
          return element.pivot.data;
        } else {
          return '-';
        }
      }
    }
    return '/!\\ Translation error';
  }
}
