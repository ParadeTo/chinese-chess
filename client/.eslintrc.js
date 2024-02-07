module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['prettier', 'plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  plugins: ['prettier'],
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
