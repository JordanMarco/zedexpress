import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatePriceComponent } from './calculate-price.component';

const routes: Routes = [{path: '', component: CalculatePriceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculatePriceRoutingModule { }
