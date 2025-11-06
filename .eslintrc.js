module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: "detect" },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier" // must be last
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // not needed for React 17+
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-console": "warn",
  },
};
