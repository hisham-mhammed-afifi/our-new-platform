/**
 * Route tests for the Shell (host) application.
 * Covers: route structure, lazy loading of remote MFE entries,
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

// Dummy component used as a stand-in for remote modules
@Component({ template: '' })
class DummyComponent {}

const dummyRemoteRoutes: Route[] = [{ path: '', component: DummyComponent }];

// Mock loadRemote so it returns dummy routes instead of fetching real remotes
vi.mock('@module-federation/enhanced/runtime', () => ({
  loadRemote: vi.fn(() => Promise.resolve({ remoteRoutes: dummyRemoteRoutes })),
}));

// Import routes AFTER the mock is in place
const { appRoutes } = await import('./app.routes');

describe('Shell appRoutes', () => {
  // --- 1. Route structure validation ---
  it('should match the route tree snapshot', () => {
    const paths = flattenRoutePaths(appRoutes);
    expect(paths).toMatchSnapshot();
  });

  it('should contain expected top-level paths', () => {
    const paths = appRoutes.map((r) => r.path);
    expect(paths).toContain('auth');
    expect(paths).toContain('playground');
    expect(paths).toContain('settings');
    expect(paths).toContain('');
  });

  it('should have no duplicate paths at the top level', () => {
    assertNoDuplicatePaths(appRoutes);
  });

  // --- 2. Lazy loading verification ---
  it('should have loadChildren functions for all remote routes', () => {
    assertLazyLoadsAreDefined(appRoutes);
  });

  it('auth route should have a loadChildren function', () => {
    const route = findRouteByPath(appRoutes, 'auth');
    expect(route).toBeDefined();
    expect(typeof route!.loadChildren).toBe('function');
  });

  it('playground route should have a loadChildren function', () => {
    const route = findRouteByPath(appRoutes, 'playground');
    expect(route).toBeDefined();
    expect(typeof route!.loadChildren).toBe('function');
  });

  it('settings route should have a loadChildren function', () => {
    const route = findRouteByPath(appRoutes, 'settings');
    expect(route).toBeDefined();
    expect(typeof route!.loadChildren).toBe('function');
  });

  // --- 3. Guard and resolver presence ---
  it('should not have guards or resolvers (none configured)', () => {
    for (const route of appRoutes) {
      expect(route.canActivate).toBeUndefined();
      expect(route.canDeactivate).toBeUndefined();
      expect(route.canMatch).toBeUndefined();
      expect(route.resolve).toBeUndefined();
    }
  });

  // --- 4. Fallback route ---
  it('should have a catch-all default route (empty path)', () => {
    const fallback = findRouteByPath(appRoutes, '');
    expect(fallback).toBeDefined();
    expect(fallback!.component).toBeDefined();
  });

  // --- 6. Router integration tests ---
  describe('router integration', () => {
    let router: Router;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter(appRoutes)],
      });
      router = TestBed.inject(Router);
    });

    it('should navigate to the home route', async () => {
      const ok = await router.navigate(['']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/');
    });

    it('should navigate to /auth', async () => {
      const ok = await router.navigate(['auth']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/auth');
    });

    it('should navigate to /playground', async () => {
      const ok = await router.navigate(['playground']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/playground');
    });

    it('should navigate to /settings', async () => {
      const ok = await router.navigate(['settings']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/settings');
    });
  });
});
