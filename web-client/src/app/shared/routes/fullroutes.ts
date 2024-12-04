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

  {
    path: '',
    loadChildren: () =>
      import('../../components/messages/messages.module').then((m) => m.MessagesModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('../../components/clients/clients.module').then((m) => m.ClientsModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('../../components/packages/packages.module').then((m) => m.PackagesModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('../../components/categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../components/incidents/incidents.module').then((m) => m.IncidentsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../../components/tracking/tracking.module').then((m) => m.TrackingModule),
  },
];
