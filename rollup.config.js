import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';

var pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: pkg['main']
    }
  ],
  plugins: [
    nodeResolve({ preferBuiltins: false }), // or `true`
    commonjs(),
    autoExternal(),
  ]

};
