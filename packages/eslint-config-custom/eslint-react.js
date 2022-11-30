module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "prettier"],
  plugins: ["@typescript-eslint", "react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/function-component-definition": [2, { namedComponents: "arrow-function" }],
    "react/jsx-props-no-spreading": 0,
  },
  overrides: [
    {
      env: { jest: true },
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react", "plugin:jest/recommended"],
    },

    {
      files: ["*.test.tsx"],
      rules: {
        "react/react-in-jsx-scope": 0,
      },
    },
  ],
  ignorePatterns: [
    "**/*.js",
    "**/*.jsx",
    "node_modules",
    "public",
    "styles",
    "coverage",
    "dist",
    ".turbo",
  ],
};
