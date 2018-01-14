const pkg = require('./package.json');
import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

module.exports = {
  input: 'index.ts',

  plugins: [
    typescript({clean: true}),
    uglify(),
  ],

  output: {
    file: pkg.main,
    format: 'cjs' //probably changing to es when node supports it
  },
  external: []
};
//promise-queue