module.exports = {
  root: true,
  extends: '@react-native',
  rules: {},
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false, // <== ADD THIS
    ecmaVersion: 2018,
    sourceType: 'module', // Allows for the use of imports
  },
};
