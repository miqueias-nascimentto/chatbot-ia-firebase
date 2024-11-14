// eslint.config.cjs

const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node, // globais para Node.js
        // Inclua outros globais necessários aqui, se houver
      },
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
      },
    },
    rules: {
      "quotes": ["error", "double", { allowTemplateLiterals: true }],
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
    },
  },
  {
    files: ["**/*.spec.*"],
    languageOptions: {
      globals: {
        mocha: true,
      },
    },
    rules: {},
  },
];
