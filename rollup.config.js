import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/Validator.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({
      sourceMaps: true,
      exclude: 'node_modules/**'
    })
  ]
}
