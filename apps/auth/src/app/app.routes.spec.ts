/**
 * Route tests for the Auth app top-level routes.
 * Covers: route structure, lazy loading of remote entry,
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
import { appRoutes } from './app.routes';

@Component({ template: '' })
class DummyComponent {}

describe('Auth appRoutes', () => {
  // --- 1. Route structure validation ---
  it('should match the route tree snapshot', () => {
    const paths = flattenRoutePaths(appRoutes);
    expect(paths).toMatchSnapshot();
  });

  it('should have the root route', () => {
    const root = findRouteByPath(appRoutes, '');
    expect(root).toBeDefined();
  });

  it('should have no duplicate paths at the top level', () => {
    assertNoDuplicatePaths(appRoutes);
  });

  // --- 2. Lazy loading verification ---
  it('should lazily load remote-entry routes', () => {
    assertLazyLoadsAreDefined(appRoutes);
  });

  it('root route should have a loadChildren function', () => {
    const root = findRouteByPath(appRoutes, '');
    expect(root).toBeDefined();
    expect(typeof root!.loadChildren).toBe('function');
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
  it('should have a root empty-path route as fallback', () => {
    const fallback = findRouteByPath(appRoutes, '');
    expect(fallback).toBeDefined();
  });

  // --- 6. Router integration tests ---
  describe('router integration', () => {
    let router: Router;

    const resolvedRoutes: Route[] = [
      { path: '', component: DummyComponent },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter(resolvedRoutes)],
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
