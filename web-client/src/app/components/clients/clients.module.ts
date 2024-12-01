import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { ClientFormComponent } from './components/client-form/client-form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MaterialModuleModule,
    TranslateModule,
    SharedModule
  ]
})
export class ClientsModule { }
