module.exports = {
  ...require("eslint-config-custom/eslint-react.js"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
