const path = require("path");

const nodeExternals = require("webpack-node-externals");

const Dotenv = require("dotenv-webpack");

module.exports = ({ env }) => {
  return {
    target: "node",
    externals: [nodeExternals(), { express: "express" }],
    externalsPresets: {
      node: true,
    },
    entry: "./index.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "dist",
      library: {
        name: "app",
        type: "umd",
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    plugins: [new Dotenv({ path: `./.env.${env}` })],
    optimization: {
      nodeEnv: false,
    },
  };
};
