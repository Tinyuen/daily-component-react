const webpack = require('webpack');
const path = require('path');
const moduleRules = require('./loaders');
const plugins = require('./plugins');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const cwd = process.cwd();

module.exports = () => {
  return {
    devtool: '#source-map',
    mode: "production",
    entry: {
      "tinyuen-ui": path.resolve(cwd, 'components/index'),
      "tinyuen-ui.min": path.resolve(cwd, 'components/index'),
      "tinyuen-ui-style": path.resolve(cwd, 'components/styles/entry')
    },
    output: {
      path: path.resolve(cwd, 'dist'),
      filename: '[name].js',
      library: 'tinyuenUI',
      libraryExport: 'umd',
      publicPath: '/'
    },
    resolve: {
      extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss'],
      alias: {},
    },
    externals: [
      Object.assign({ react: 'react', 'react-dom': 'react-dom' }, {}),
      nodeExternals()
    ],
    optimization: {
      minimize: true,
      minimizer: [
        // open optimization only for '.min.js'
        new TerserPlugin({
          include: /\.min/
        })
      ]
    },
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
