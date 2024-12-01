import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { IncidentsComponent } from './incidents.component';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';


@NgModule({
  declarations: [
    IncidentsComponent
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    MaterialModuleModule,
    TranslateModule,
    SharedModule,

  ]
})
export class IncidentsModule { }
