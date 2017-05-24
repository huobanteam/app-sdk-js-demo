module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'import/no-dynamic-require': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "comma-dangle": [1, "never"],
    "no-unused-vars": [1, { "vars": "all", "args": "none" }],
    "semi": [0, "always"],
    "semi-spacing": 1,
    "object-curly-spacing": [1, "always"],
    "arrow-parens": [0, 'always'],
    "prefer-const": 1,
    "eqeqeq": 0,
    "prefer-template": 1,
    "consistent-return": 1,
    "global-require": 0,
    "no-alert": 1,
    "no-undef": 1,
    "space-before-function-paren": [1, "never"],
    "object-property-newline": [0, { "allowMultiplePropertiesPerLine": true }],
    "no-else-return": 0,
    "template-curly-spacing": 0,
    "prefer-const": 1,
    "func-names": [1, "as-needed"],
    "object-shorthand": [1, "always", { "avoidQuotes": false }],
    "no-plusplus": 0
  }
}
