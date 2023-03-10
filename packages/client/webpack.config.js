const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require('webpack');

const deps = require("./package.json").dependencies;


module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  cache: false,
  mode: 'development',
  optimization: {
    minimize: false,
  },

  devServer: {
    port: 3001
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
      name: "mfe_client",
      filename: "remoteEntry.js",
      library: { type: 'var', name: 'mfe_client' },
      remotes: {},
      exposes: {
        mfe_client:'./src/App.tsx'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      inject: "body"
    }),
  ],
};
