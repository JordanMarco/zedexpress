import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatePriceRoutingModule } from './calculate-price-routing.module';
import { MaterialModuleModule } from 'src/app/materialModule/material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { CalculatePriceComponent } from './calculate-price.component';

@NgModule({
  declarations: [CalculatePriceComponent],
  imports: [
    CommonModule,
    CalculatePriceRoutingModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
  ],
})
export class CalculatePriceModule {}
