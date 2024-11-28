import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from './shared/services/session-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private renderer: Renderer2,
    private translateService: TranslateService,
    private sessionService: SessionService,
  ) {
    translateService.addLangs(['en', 'fr']);
    translateService.setDefaultLang('en');
    const lang = this.sessionService.getLanguage();
    if (lang) {
      translateService.use(lang.match(/en|fr/) ? lang : 'en');
    } else {
      const browserLang = translateService.getBrowserLang();
      if (browserLang)
        translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
  }

  ngOnInit() {
    // Use Renderer2 to append an element to the html element
    const newElement = this.renderer.createElement('html');
    this.renderer.appendChild(document.body, newElement);
  }

  title = 'synto';
}
