import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DEFAULT_IMAGE } from '../utils/constant';
import { Currency } from '../models/Common';
import { BROWSER_ENUM } from '../utils/type';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getServerUrl(url: string | null): string {
    return url ? environment.basePath + '/' + url : DEFAULT_IMAGE;
  }

  isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (<any>window).navigator.standalone ||
    document.referrer.includes('android-app://');

  getMobileOperatingSystem() {
    const userAgent =
      navigator.userAgent || navigator.vendor || (<any>window).opr;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !(<any>window).MSStream) {
      return 'iOS';
    }

    return 'unknown';
  }

  testUserAgent = (regexp: RegExp): boolean =>
    regexp.test(window.navigator.userAgent);

  detectBrowser_v2(): BROWSER_ENUM {
    switch (true) {
      case this.testUserAgent(/edg/i):
        return BROWSER_ENUM.EDGE;
      case this.testUserAgent(/chrome|chromium|crios/i) &&
        this.testUserAgent(/edg/i):
        return BROWSER_ENUM.EDGE_CHROMIUM;
      case this.testUserAgent(/trident/i):
        return BROWSER_ENUM.INTERNET_EXPLORER;
      case this.testUserAgent(/firefox|fxios/i):
        return BROWSER_ENUM.FIRE_FOX;
      case this.testUserAgent(/opr\//i):
        return BROWSER_ENUM.OPERA;
      case this.testUserAgent(/ucbrowser/i):
        return BROWSER_ENUM.UC_BROWSER;
      case this.testUserAgent(/samsungbrowser/i):
        return BROWSER_ENUM.SAMSUNG_BROWSER;
      case this.testUserAgent(/chrome|chromium|crios/i):
        return BROWSER_ENUM.CHROME;
      case this.testUserAgent(/safari/i):
        return BROWSER_ENUM.SAFARI;
      default:
        return BROWSER_ENUM.UNKNOWN;
    }
  }

  detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  isAdBlockerEnabled(): boolean {
    const testElement = document.createElement('div');
    testElement.innerHTML = '&nbsp;';
    testElement.className = 'adsbox';

    document.body.appendChild(testElement);
    const isBlocked = testElement.offsetHeight === 0;
    document.body.removeChild(testElement);

    return isBlocked;
  }

  detectBrowserVersion() {
    let userAgent = navigator.userAgent,
      tem,
      matchTest =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];

    if (/trident/i.test(matchTest[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
      return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
      tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    matchTest = matchTest[2]
      ? [matchTest[1], matchTest[2]]
      : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = userAgent.match(/version\/(\d+)/i)) != null)
      matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
  }

  getIfValidMobilepaiement(country?: string): boolean {
    return true;
  }

  getIsXAForXOF(currency: Currency): boolean {
    return ['XOF', 'XAF'].includes(currency.code);
  }

  getIsKES(currency: Currency) {
    return currency.code === 'KES';
  }

  giveRangeOfPeriod(
    period: 'week' | 'month' | 'year' | 'sevent_day' | 'day' | 'custom'
  ): {
    startDate: Date;
    endDate: Date;
  } {
    let startDate, endDate;

    switch (period) {
      case 'week':
        startDate = moment().startOf('week').toDate();
        endDate = moment().endOf('week').toDate();
        break;
      case 'sevent_day':
        startDate = moment().startOf('week').toDate();
        endDate = moment().endOf('week').toDate();
        break;
      case 'month':
        startDate = moment().startOf('month').toDate();
        endDate = moment().endOf('month').toDate();
        break;
      case 'year':
        startDate = moment().startOf('year').toDate();
        endDate = moment().endOf('year').toDate();
        break;
      default:
        throw new Error('Invalid period specified.');
    }

    return { startDate, endDate };
  }

  parseTokNotion(token: number): string {
    if (token === 0) return '0';
    const count = token + '';
    let counter = token + '';
    if (token >= 1000 && token < 10000) {
      counter = count.substring(0, 1) + '.' + count.substring(1, 2) + 'k';
      if (count.substring(1, 2) === '0') counter = count.substring(0, 1) + 'k';
    } else if (token >= 10000 && token < 100000) {
      counter = count.substring(0, 2) + '.' + count.substring(2, 3) + 'k';
      if (count.substring(2, 3) === '0') counter = count.substring(0, 2) + 'k';
    } else if (token >= 100000 && token < 1000000) {
      counter = count.substring(0, 3) + '.' + count.substring(3, 4) + 'k';
      if (count.substring(3, 4) === '0') counter = count.substring(0, 3) + 'k';
    } else if (token >= 1000000) {
      counter = count.substring(0, 1) + '.' + count.substring(1, 2) + 'M';
      if (count.substring(1, 2) === '0') counter = count.substring(0, 1) + 'M';
    }
    return counter;
  }
}
