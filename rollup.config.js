import resolve from 'rollup-plugin-node-resolve';

module.exports = {
    input: 'js/main.js',
    output: {
      file: 'js/bundle.js',
      format: 'iife',
    },
    plugins: [
        resolve({})
      ]
  };