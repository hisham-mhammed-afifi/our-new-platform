import { Route } from '@angular/router';
import { InfoComponent } from './info';

export const infoRoutes: Route[] = [
  {
    path: '',
    component: InfoComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./overview').then((m) => m.OverviewComponent),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('./team').then((m) => m.TeamComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact').then((m) => m.ContactComponent),
      },
    ],
  },
];
