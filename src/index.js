import MagicString from 'magic-string';
import {createFilter} from 'rollup-pluginutils';

const defaultExcludes = ['node_modules/**'];

export default function injectEnv(options = {}) {
  const exclude = defaultExcludes;
  if (Array.isArray(options.exclude)) {
    exclude.concat(options.exclude);
  }
  else if (typeof options.exclude === 'string' || options.exclude instanceof String) {
    exclude.push(options.exclude);
  }
  const filter = createFilter(options.include, exclude);
  let maybeEnvironmentVariables = options.envFilePath
    ? require('dotenv').config({ path: options.envFilePath})
    : require('dotenv').config();
  if (maybeEnvironmentVariables.error) {
    return null;
  }
  const environmentVariables = maybeEnvironmentVariables.parsed;
  let lookupPairs = [];
  const quote = '\'';
  for (const key in environmentVariables) {
    if (environmentVariables.hasOwnProperty(key)) {
      const value = environmentVariables[key];
      lookupPairs.push(["process.env." + key, quote + value + quote]);
    }
  }
  return {
    name: 'inject-env',
    transform(code, id) {
      if (!filter(id)) return null;
      let newCode = code;
      for (const pairs of lookupPairs) {
        const [key, value] = pairs;
        newCode = newCode.replace(key, value);
      }
      const magicString = new MagicString(newCode);
      const result = { code: newCode };
      if (options.sourcemap !== false)
        result.map = magicString.generateMap({ hires: true });
      return result;
    }
  }
};
