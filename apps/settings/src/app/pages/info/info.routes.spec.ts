/**
 * Route tests for the Settings > Info section nested routes.
 * Covers: route structure, lazy loading of overview/team/contact,
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
import { infoRoutes } from './info.routes';

@Component({ template: '<router-outlet />' })
class DummyLayoutComponent {}

@Component({ template: '' })
class DummyComponent {}

describe('Settings infoRoutes (info.routes)', () => {
  const rootRoute = infoRoutes[0];

  // --- 1. Route structure validation ---
  it('should match the route tree snapshot', () => {
    const paths = flattenRoutePaths(infoRoutes);
    expect(paths).toMatchSnapshot();
  });

  it('should have a root route with InfoComponent', () => {
    const root = findRouteByPath(infoRoutes, '');
    expect(root).toBeDefined();
    expect(root!.component).toBeDefined();
  });

  it('should declare overview (empty path), team, and contact children', () => {
    expect(rootRoute.children).toBeDefined();
    const childPaths = rootRoute.children!.map((r) => r.path);
    expect(childPaths).toContain('');
    expect(childPaths).toContain('team');
    expect(childPaths).toContain('contact');
  });

  it('should have no duplicate paths in children', () => {
    assertNoDuplicatePaths(rootRoute.children!);
  });

  // --- 2. Lazy loading verification ---
  it('should have loadComponent defined for all child routes', () => {
    assertLazyLoadsAreDefined(infoRoutes);

    for (const child of rootRoute.children!) {
      expect(typeof child.loadComponent).toBe('function');
    }
  });

  it('overview child should use loadComponent', () => {
    const overview = findRouteByPath(rootRoute.children!, '');
    expect(overview).toBeDefined();
    expect(typeof overview!.loadComponent).toBe('function');
  });

  it('team child should use loadComponent', () => {
    const team = findRouteByPath(rootRoute.children!, 'team');
    expect(team).toBeDefined();
    expect(typeof team!.loadComponent).toBe('function');
  });

  it('contact child should use loadComponent', () => {
    const contact = findRouteByPath(rootRoute.children!, 'contact');
    expect(contact).toBeDefined();
    expect(typeof contact!.loadComponent).toBe('function');
  });

  // --- 3. Guard and resolver presence ---
  it('should not have guards or resolvers (none configured)', () => {
    for (const route of infoRoutes) {
      expect(route.canActivate).toBeUndefined();
      expect(route.canDeactivate).toBeUndefined();
      expect(route.canMatch).toBeUndefined();
      expect(route.resolve).toBeUndefined();
    }
  });

  // --- 4. Fallback route ---
  it('should have a default empty-path child for overview', () => {
    const fallback = findRouteByPath(rootRoute.children!, '');
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
          { path: '', component: DummyComponent },
          { path: 'team', component: DummyComponent },
          { path: 'contact', component: DummyComponent },
        ],
      },
    ];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideRouter(testRoutes)],
      });
      router = TestBed.inject(Router);
    });

    it('should navigate to overview (root)', async () => {
      const ok = await router.navigate(['']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/');
    });

    it('should navigate to /team', async () => {
      const ok = await router.navigate(['team']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/team');
    });

    it('should navigate to /contact', async () => {
      const ok = await router.navigate(['contact']);
      expect(ok).toBe(true);
      expect(router.url).toBe('/contact');
    });
  });
});
