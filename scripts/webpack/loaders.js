const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sassLoader = {
  loader: 'sass-loader',
  options: {
    /** 用来确定要使用的 Sass 实现，比如 node-sass 或者 sass（具体使用哪个根据package.json中安装了哪个包来决定） */
    /** 如在 package.json 中同时安装了 sass 和 node-sass，则默认会使用 sass，如需指定，则可以配置为 require('node-sass') */
    implementation: require("sass"),
    /** 如配置，会将它拼接在入口文件的内容之前。当需要统一导入css变量或者css函数的时候非常有用 */
    data: '',
  }
};

const genCssLoaders = (isDev) => {
  return isDev ? [
    'css-hot-loader',
    'style-loader',
    'css-loader',
    'postcss-loader',
  ] : [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
  ];
};

const genSassLoaders = (isDev) => {
  return isDev ? [
    'css-hot-loader',
    'style-loader',
    'css-loader',
    'postcss-loader',
    sassLoader,
  ] : [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    sassLoader,
  ];
};

module.exports = (isDev) => {
  const options = {
    plugins: [['transform-react-jsx'], ['class']]
  };

  return [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader?cacheDirectory=true',
          options
        }
      ],
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader?cacheDirectory=true',
          options
        },
        'ts-loader?transpileOnly=true'
      ],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: genSassLoaders(isDev),
      sideEffects: true,
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: genCssLoaders(isDev),
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      exclude: /node_modules/,
      options: {
        limit: 1000,
        name: '[name].[ext]',
        output: 'static',
      },
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      exclude: /node_modules/,
      options: {
        limit: 10000,
        name: '[name].[ext]',
        output: 'static',
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      exclude: /node_modules/,
      options: {
        limit: 10000,
        name: '[name].[ext]',
        outputPath: 'static',
      },
    },
  ]
};
