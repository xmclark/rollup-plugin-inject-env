import MagicString from 'magic-string';
import {createFilter} from 'rollup-pluginutils';

export default function injectEnv(options = {}) {
  const filter = createFilter(options.include, options.exclude);

  let maybeEnvironmentVariables = options.envFilePath
    ? require('dotenv').config({ path: options.envFilePath})
    : require('dotenv').config();
  if (maybeEnvironmentVariables.error) {
    return null;
  }
  const environmentVariables = maybeEnvironmentVariables.parsed;
  let lookupPairs = [];
  for (const key in environmentVariables) {
    if (environmentVariables.hasOwnProperty(key)) {
      const value = environmentVariables[key];
      lookupPairs.push(["process.env." + key, value]);
    }
  }
  return {
    name: 'inject-env',
    transform(code, id) {
      if (!filter(id)) return null;
      let newCode = code;
      let quote = '\'';
      for (const pairs of lookupPairs) {
        const [key, value] = pairs;
        newCode = newCode.replace(key, quote + value + quote);
      }
      const magicString = new MagicString(newCode);
      const result = { code: magicString.toString() };
      if (options.sourcemap !== false)
        result.map = magicString.generateMap({ hires: true });
      return result;
    }
  }
};
