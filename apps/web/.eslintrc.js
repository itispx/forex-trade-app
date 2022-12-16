module.exports = {
  ...require("eslint-config-custom/eslint-next"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
