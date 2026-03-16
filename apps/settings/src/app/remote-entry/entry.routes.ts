import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      {
        path: 'info',
        loadChildren: () =>
          import('../pages/info/info.routes').then((m) => m.infoRoutes),
      },
    ],
  },
];
