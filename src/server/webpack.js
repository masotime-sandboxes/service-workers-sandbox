import { resolve } from 'path';
import webpack from 'webpack';

const { stringify, parse } = JSON;
const { env } = process;

const PLUGINS = [
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': stringify('development'),
    __DEV__: stringify(parse(env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

export const compiler = {
  env : env.NODE_ENV,
  entry: {
    app: ['babel-polyfill', resolve(process.cwd(), 'src/browser/index.js')],
    sw: resolve(process.cwd(), 'src/browser/sw.js'),
    vendor: ['react', 'react-dom', 'bluebird']
  },
  output: {
    path: resolve(process.cwd(), 'build'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: resolve(process.cwd(), 'src')
      }
    ]
  },
  plugins: PLUGINS,
  devtool: 'eval'  
}

export const middleware = {
  publicPath: '/'
};