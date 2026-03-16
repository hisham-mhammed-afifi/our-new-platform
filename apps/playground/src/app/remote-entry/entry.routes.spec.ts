/**
 * Route tests for the Playground remote entry (Module Federation exposed routes).
 * Covers: route structure, duplicate detection, snapshot matching,
 * and router integration.
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

@Component({ template: '' })
class DummyComponent {}

describe('Playground remoteRoutes (entry.routes)', () => {
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

  it('should have no duplicate paths at the top level', () => {
    assertNoDuplicatePaths(remoteRoutes);
  });

  // --- 2. Lazy loading verification ---
  it('should pass lazy-load assertions (no lazy routes expected)', () => {
    assertLazyLoadsAreDefined(remoteRoutes);
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

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter(remoteRoutes)],
      });
      router = TestBed.inject(Router);
    });

    it('should navigate to the root route', async () => {
      const ok = await router.navigate(['']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/');
    });
  });
});
