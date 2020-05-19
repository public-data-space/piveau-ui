// Produces an overriding configuration for consumption in a productive environment

import merge from 'merge-anything';
// The configuration object that contains symbols for overwriting during runtime
import config from './runtime-config-template';
import { glueConfig as baseConfig } from '@/../config/user-configs';

const opts = {
  debug: process.env.NODE_ENV === 'development',
  baseConfig,
};

// Custom merge rule to ignore values that start with $VUE_APP_
// i.e., use this.$env property when environment variable is not set
const ignoreUnusedVariables = (originVal, newVal) => {
  const result = newVal;
  // Take originVal when env variable is not set
  if (originVal !== undefined && typeof newVal === 'string') {
    // Environment variable not set (e.g., development env)
    if (newVal.startsWith('$VUE_APP_')) {
      return originVal;
    }
  }
  return result;
};

const mergeOptions = {
  extensions: [ignoreUnusedVariables],
};

const merged = merge(mergeOptions, opts.baseConfig, config);
if (opts.debug) {
  // eslint-disable-next-line no-console
  console.log(`Runtime configuration = ${JSON.stringify(merged)}`);
}

export default merged;