const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-redeclare": [
        "error",
        { ignoreDeclarationMerge: false }
      ],
    },
  },
];

// npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin