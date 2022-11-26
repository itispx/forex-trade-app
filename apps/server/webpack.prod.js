const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
