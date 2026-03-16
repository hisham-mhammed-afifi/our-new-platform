import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Routes': 'apps/auth/src/app/remote-entry/entry.routes.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (
      libraryName === '@ngx-translate/core' ||
      libraryName === '@ngx-translate/http-loader'
    ) {
      return {
        ...sharedConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: '17.0.0',
      };
    }
    return sharedConfig;
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
