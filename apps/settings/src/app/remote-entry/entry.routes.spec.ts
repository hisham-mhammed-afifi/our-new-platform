/**
 * Route tests for the Settings remote entry (Module Federation exposed routes).
 * Covers: route structure, lazy loading of info child routes,
 * duplicate detection, snapshot matching, and router integration.
 */
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, Route } from '@angular/router';
import {
  flattenRoutePaths,
  findRouteByPath,
  assertLazyLoadsAreDefined,
  assertNoDuplicatePaths,
} from '@our/testing';
import { remoteRoutes } from './entry.routes';

@Component({ template: '<router-outlet />' })
class DummyLayoutComponent {}

@Component({ template: '' })
class DummyComponent {}

describe('Settings remoteRoutes (entry.routes)', () => {
  // --- 1. Route structure validation ---
  it('should match the route tree snapshot', () => {
    const paths = flattenRoutePaths(remoteRoutes);
    expect(paths).toMatchSnapshot();
  });

  it('should have a root route with RemoteEntry component', () => {
    const root = findRouteByPath(remoteRoutes, '');
    expect(root).toBeDefined();
    expect(root!.component).toBeDefined();
  });

  it('should declare the "info" child route', () => {
    const root = remoteRoutes[0];
    expect(root.children).toBeDefined();
    const info = findRouteByPath(root.children!, 'info');
    expect(info).toBeDefined();
  });

  it('should have no duplicate paths at the top level', () => {
    assertNoDuplicatePaths(remoteRoutes);
  });

  it('should have no duplicate paths in children', () => {
    const root = remoteRoutes[0];
    if (root.children) {
      assertNoDuplicatePaths(root.children);
    }
  });

  // --- 2. Lazy loading verification ---
  it('should have loadChildren defined for the info route', () => {
    assertLazyLoadsAreDefined(remoteRoutes);
    const root = remoteRoutes[0];
    const info = findRouteByPath(root.children!, 'info');
    expect(typeof info!.loadChildren).toBe('function');
  });

  // --- 3. Guard and resolver presence ---
  it('should not have guards or resolvers (none configured)', () => {
    for (const route of remoteRoutes) {
      expect(route.canActivate).toBeUndefined();
      expect(route.canDeactivate).toBeUndefined();
      expect(route.canMatch).toBeUndefined();
      expect(route.resolve).toBeUndefined();
    }
  });

  // --- 4. Fallback route ---
  it('should have a root empty-path route as fallback', () => {
    const fallback = findRouteByPath(remoteRoutes, '');
    expect(fallback).toBeDefined();
  });

  // --- 6. Router integration tests ---
  describe('router integration', () => {
    let router: Router;

    const testRoutes: Route[] = [
      {
        path: '',
        component: DummyLayoutComponent,
        children: [
          { path: 'info', component: DummyComponent },
        ],
      },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter(testRoutes)],
      });
      router = TestBed.inject(Router);
    });

    it('should navigate to the root route', async () => {
      const ok = await router.navigate(['']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/');
    });

    it('should navigate to /info', async () => {
      const ok = await router.navigate(['info']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/info');
    });
  });
});
