import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { provideTranslateService, provideChildTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Provides the root translation configuration for the shell (host) app.
 * Call this in the shell's `app.config.ts` providers array.
 *
 * Includes `provideHttpClient()` since TranslateHttpLoader needs HttpClient.
 */
export function provideAppTranslation(): (Provider | EnvironmentProviders)[] {
  return [
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    provideTranslateService({ defaultLanguage: 'en' }),
  ];
}

/**
 * Provides the child translation configuration for remote (microfrontend) apps.
 * Call this in each remote's `app.config.ts` providers array.
 *
 * Uses forChild equivalent so remotes reuse the shell's singleton
 * TranslateService (enforced via Module Federation shared config).
 */
export function provideChildTranslation(): (Provider | EnvironmentProviders)[] {
  return [
    provideChildTranslateService(),
  ];
}
