const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

module.exports = ({ env }) => {
  switch (env) {
    case "dev":
      return merge(commonConfig({ env }), devConfig);
    case "prod":
      return merge(commonConfig({ env }), prodConfig);
  }
};
