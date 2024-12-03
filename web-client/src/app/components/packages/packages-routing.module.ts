import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages.component';
import { ParcelPickupComponent } from './components/parcel-pickup/parcel-pickup.component';

const routes: Routes = [
  {
    path: 'packages',
    component: PackagesComponent,
    children: [
      {
        path: 'pickup',
        component: ParcelPickupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
