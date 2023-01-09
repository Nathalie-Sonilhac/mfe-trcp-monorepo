const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'development',
  devServer: {
      port: 3000,
      historyApiFallback: {
          index: 'index.html',
      },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  cache: false,

  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      library: { type: 'var', name: 'shell' },
      filename: 'remoteEntry.js',
      remotes: {
        mfe_client: 'mfe_client',
      },
      exposes: {},
      shared: [
        {
            ...deps,
        },]
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};
