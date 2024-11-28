import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/sharedmodule';
import { CustomLayoutComponent } from './shared/layout-components/custom-layout/custom-layout.component';
import { ContentLayoutComponent } from './shared/layout-components/content-layout/content-layout.component';
import { StoreModule } from '@ngrx/store';
import { dataReaducer } from './shared/ngrx/e-commerce/shop.reducers';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { environment } from 'src/environments/environment';
import { ColorPickerModule } from 'ngx-color-picker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient} from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'/assets/i18n', '');
}
@NgModule({
  declarations: [AppComponent, CustomLayoutComponent, ContentLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ data: dataReaducer }),
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    LeafletModule,
    AngularFireModule.initializeApp(environment.firebase),
    ColorPickerModule
  ],
  
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {} 
