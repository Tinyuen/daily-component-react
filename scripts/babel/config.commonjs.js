const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        loose: true,
        modules: "cjs",
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
      corejs: 3,
      useESModules: false
    }]
  ]
};
module.exports = config;
