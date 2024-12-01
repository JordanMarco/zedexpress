import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsRoutingModule } from './incidents-routing.module';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { IncidentFormComponent } from './components/incident-form/incident-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentsComponent } from './incidents.component';


@NgModule({
  declarations: [
    IncidentsComponent,
    IncidentFormComponent
  ],
  imports: [
    CommonModule,
    IncidentsRoutingModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,

  ]
})
export class IncidentsModule { }
