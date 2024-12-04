import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking.component';
import { ParcelFormComponent } from '../packages/components/parcel-form/parcel-form.component';
import { PackagesRoutingModule } from '../packages/packages-routing.module';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tracking',
    children: [
      { path: '', component: TrackingComponent },
    ],
  },
];

@NgModule({
  declarations: [
    TrackingComponent
  ],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    MaterialModuleModule,
    TranslateModule,
    SharedModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [RouterModule]
})
export class TrackingModule { }
