/* eslint-disable camelcase */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './shared/layout-components/full-layout/full-layout.component';
import { content } from './shared/routes/fullroutes';
import { guestGuard } from './authentication/guards/guest.guard';
import { loginGuard } from './authentication/guards/login.guards';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: content,
    canActivate: [loginGuard()]
  },
  {
    path: 'auth/login',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    canActivate: [guestGuard()]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
