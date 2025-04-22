module.exports = {
  extends: ["react-app"],
  root: true,
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/react-in-jsx-scope": "off",
  },
};
