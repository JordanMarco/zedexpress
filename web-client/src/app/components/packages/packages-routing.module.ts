import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages.component';
import { ParcelPickupComponent } from './components/parcel-pickup/parcel-pickup.component';
import { ParcelComponent } from './parcel/parcel.component';

const routes: Routes = [
  {
    path: 'packages',
    component: PackagesComponent,
    children: [
      {
        path: '',
        component: ParcelComponent 
      },
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
