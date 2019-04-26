// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'src/entry.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true
      }
    }),
    buble()
  ]
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  '@fortawesome/fontawesome-svg-core',
  '@fortawesome/free-solid-svg-icons',
  '@fortawesome/vue-fontawesome',
  'vue-js-toggle-button',
  'moment'
];
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  '@fortawesome/fontawesome-svg-core': 'library',
  '@fortawesome/free-solid-svg-icons': 'faTimes',
  '@fortawesome/vue-fontawesome': 'FontAwesomeIcon',
  'vue-js-toggle-button': 'ToggleButton',
  moment: 'moment'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: 'dist/vue-business-hours.esm.js',
      format: 'esm',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'umd') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-business-hours.umd.js',
      format: 'umd',
      name: 'VueBusinessHours',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6
        }
      })
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-business-hours.min.js',
      format: 'iife',
      name: 'VueBusinessHours',
      exports: 'named',
      globals
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
