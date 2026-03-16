import { withModuleFederation } from '@nx/module-federation/angular';
import { Configuration } from 'webpack';

import config from './module-federation.config';

/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default withModuleFederation(config, { dts: false }).then((mfConfig) => {
  return (baseConfig: Configuration): Configuration => {
    const result = mfConfig(baseConfig);
    return {
      ...result,
      output: {
        ...result.output,
        publicPath: '/',
      },
    };
  };
});
