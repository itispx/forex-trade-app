module.exports = {
  ...require("eslint-config-custom/eslint-server"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
