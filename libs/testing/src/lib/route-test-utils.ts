import { Route } from '@angular/router';

/**
 * Recursively flattens an Angular Routes array into a string[] of full paths.
 * E.g. [{ path: 'a', children: [{ path: 'b' }] }] → ['a', 'a/b']
 */
export function flattenRoutePaths(routes: Route[], prefix = ''): string[] {
  const paths: string[] = [];

  for (const route of routes) {
    const segment = route.path ?? '';
    const fullPath = prefix && segment ? `${prefix}/${segment}` : prefix + segment;

    paths.push(fullPath);

    if (route.children) {
      paths.push(...flattenRoutePaths(route.children, fullPath));
    }
  }

  return paths;
}

/**
 * Finds a route by path at any depth in the route tree.
 * Supports both exact segment match and full-path match.
 */
export function findRouteByPath(routes: Route[], targetPath: string): Route | undefined {
  for (const route of routes) {
    if (route.path === targetPath) {
      return route;
    }
    if (route.children) {
      const found = findRouteByPath(route.children, targetPath);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Asserts that every route with `loadChildren` or `loadComponent` has a
 * defined loader function. Does NOT invoke the loader — only checks presence.
 */
export function assertLazyLoadsAreDefined(routes: Route[], prefix = ''): void {
  for (const route of routes) {
    const segment = route.path ?? '';
    const fullPath = prefix && segment ? `${prefix}/${segment}` : prefix + segment;
    const label = fullPath || '(root)';

    if (route.loadChildren !== undefined) {
      expect(route.loadChildren).toBeDefined();
      expect(typeof route.loadChildren).toBe('function');
    }

    if (route.loadComponent !== undefined) {
      expect(route.loadComponent).toBeDefined();
      expect(typeof route.loadComponent).toBe('function');
    }

    if (route.children) {
      assertLazyLoadsAreDefined(route.children, fullPath);
    }
  }
}

/**
 * Collects all declared paths from a Routes array (non-recursive, top-level only).
 */
export function getTopLevelPaths(routes: Route[]): string[] {
  return routes.map((r) => r.path ?? '');
}

/**
 * Returns true if a wildcard ('**') route exists at the top level.
 */
export function hasWildcardRoute(routes: Route[]): boolean {
  return routes.some((r) => r.path === '**');
}

/**
 * Returns all redirect routes from the config.
 */
export function getRedirectRoutes(routes: Route[]): Route[] {
  return routes.filter((r) => r.redirectTo !== undefined);
}

/**
 * Asserts that each redirectTo target exists as a path in the same config.
 */
export function assertRedirectsAreValid(routes: Route[]): void {
  const allPaths = new Set(flattenRoutePaths(routes));
  const redirects = getRedirectRoutes(routes);

  for (const route of redirects) {
    const target = route.redirectTo!;
    // redirectTo can be relative or absolute; check both forms
    const isValid =
      allPaths.has(target) ||
      allPaths.has(target.replace(/^\//, ''));
    expect(isValid).toBe(true);
  }
}

/**
 * Asserts no duplicate paths exist at the same level.
 */
export function assertNoDuplicatePaths(routes: Route[]): void {
  const paths = routes.map((r) => r.path ?? '');
  const unique = new Set(paths);
  expect(paths.length).toBe(unique.size);
}
