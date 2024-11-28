/* eslint-disable camelcase */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './shared/layout-components/full-layout/full-layout.component';
import { content } from './shared/routes/fullroutes';
import { COUNTENT_ROUTES } from './shared/routes/custom-routes';
import { CustomLayoutComponent } from './shared/layout-components/custom-layout/custom-layout.component';
import { ContentLayoutComponent } from './shared/layout-components/content-layout/content-layout.component';
import { Pages } from './shared/routes/content-routes';
import { loginGuard } from './authentication/guards/login.guards';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: content,
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
