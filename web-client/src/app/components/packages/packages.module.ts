import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { ParcelFormComponent } from './components/parcel-form/parcel-form.component';
import { ParcelPickupComponent } from './components/parcel-pickup/parcel-pickup.component';
import { ParcelComponent } from './parcel/parcel.component';


@NgModule({
  declarations: [
    PackagesComponent,
    ParcelFormComponent,
    ParcelPickupComponent,
    ParcelComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
  ]
})
export class PackagesModule { }
