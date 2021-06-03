const webpack = require('webpack');
const path = require('path');
const moduleRules = require('./loaders');
const plugins = require('./plugins');
const nodeExternals = require('webpack-node-externals');
const cwd = process.cwd();
const env = process.env.NODE_ENV;
const isProd = env === 'production';

module.exports = () => {
  return {
    devtool: '#source-map',
    mode: "production",
    entry: {
      "tinyuen-ui": path.resolve(cwd, 'src/index')
    },
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: isProd ? '[name].min.js' : '[name].js',
      library: 'tinyuenUI',
      libraryExport: 'umd',
      publicPath: '/'
    },
    resolve: {
      extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss'],
      alias: {},
    },
    externals: [
      Object.assign({ react: 'react', 'react-dom': 'react-dom'}, {}),
      nodeExternals()
    ],
    // close optimization for Development
    optimization: !isProd ? { minimize: false } : {},
    performance: {
      hints: false,
    },
    module: {
      rules: moduleRules(false)
    },
    plugins: [
      plugins.watchIgnorePlugin,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        },
      }),
      plugins.miniCssExtractPlugin,
    ]
  }
};
