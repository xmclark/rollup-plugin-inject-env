# rollup-plugin-inject-env

Statically inject variables from the dotenv file. Reuse the familiar `process.env.MY_VAR` substitution token. Environment variables are inserted as strings.

```
// .env
MY_API_KEY=12345

// source
const x = process.env.MY_API_KEY;

// generated code
const x = '12345';
```

## usage

Add it to your rollup config plugins list. 

Optionally pass `include`, `exclude`, and/or `envFilePath` minimatch patterns in the `options` parameter. 

`node_modules/**` is always ignored.

```js
import injectEnv from 'rollup-plugin-inject-env';
export default {
  input: 'src/index.ts',
  output: {
    file: 'bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    injectEnv({
      // include: "include/sources/minimatch",
      // exclude: "exclude/sources/minimatch",
      // envFilePath: "path/to/.env",
    }),
  ]
};
```

## motivation

Code and configuration should be separate. Servers can store configuration in environment variables, but clients (like web browsers) do not always get that luxury. One way to solve the problem is statically injecting configuration into the bundle at compile-time with Rollup. 