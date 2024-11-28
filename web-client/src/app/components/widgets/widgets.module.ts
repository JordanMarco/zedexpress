import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetComponent } from './widget/widget.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/sharedmodule';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    NgApexchartsModule,
    SharedModule,
    LeafletModule,
  ],
})
export class WidgetsModule {}
