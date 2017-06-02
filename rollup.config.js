import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'lib/index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  moduleName: 'Validator',
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
