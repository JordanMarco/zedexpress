import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('../../components/users/users.module').then((m) => m.UsersModule),
  },
];
