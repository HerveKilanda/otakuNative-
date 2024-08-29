module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint",
    ],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    "rules": {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"]
    }
  },
};
