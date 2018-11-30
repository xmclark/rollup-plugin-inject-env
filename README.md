# rollup-plugin-inject-env

Statically inject variables from the dotenv file. Reuse the familiar `process.env.MY_VAR` substitution token. Environment variables are inserted as strings.

before:
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

Optionally pass `include` and `exclude` minimatch patterns. 

`node_modules/**` is always ignored.

```js
import injectEnv from 'rollup-plugin-inject-env';
export default {
  input: 'src/index.ts',
  output: {
    file: 'bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    injectEnv(),
  ]
};
```

## motivation

Statically injecting variables is useful for keeping source code separate from insensitive data and configuration. It is not best practice to store sensitive data in source control. It is also not best practice to expose sensitive data on clients (for obvious reasons). Some kinds of data is not sensitive, so we can expose it in our client code. We still do not want it store in version control, so instead use environment variables. We can inject the environment variables at build-time (also called inlining). This rollup plugin solves that problem.