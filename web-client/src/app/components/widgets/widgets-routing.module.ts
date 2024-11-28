import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetComponent } from './widget/widget.component';

const routes: Routes = [
  {
    path: 'widgets',
    children: [
      { path: '', title: 'Synto - Tailwind Angular Admin Template', component: WidgetComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
