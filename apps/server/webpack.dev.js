const path = require("path");

const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval",
  plugins: [
    new NodemonPlugin({
      script: "./dist/bundle.js",
      watch: path.resolve("dist"),
    }),
  ],
};
