module.exports = {
  ...require("eslint-config-custom/eslint-react"),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
