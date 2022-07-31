module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended",
  "plugin:@typescript-eslint/recommended"],
  plugins: ["react", "@typescript-eslint", "jest"],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
};
