module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  globals: {
    GameGlobal: 'readonly',
    wx: 'readonly',
    canvas: 'readonly'
  },
  rules: {
    'no-console': 'off'
  }
};
