import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';
import { HomeComponent } from './components/home/home';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      loadRemote<typeof import('auth/Routes')>('auth/Routes').then(
        (m) => m!.remoteRoutes,
      ),
  },
  {
    path: 'playground',
    loadChildren: () =>
      loadRemote<typeof import('playground/Routes')>('playground/Routes').then(
        (m) => m!.remoteRoutes,
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      loadRemote<typeof import('settings/Routes')>('settings/Routes').then(
        (m) => m!.remoteRoutes,
      ),
  },
  {
    path: '',
    component: HomeComponent,
  },
];
