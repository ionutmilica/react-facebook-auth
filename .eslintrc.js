const [DISABLE, WARN, ERROR] = [0, 1, 2];

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  plugins: [
    'react',
    'import',
    'babel',
  ],
  rules: {
    'react/jsx-filename-extension': DISABLE,
    'react/no-unused-prop-types': DISABLE,
    'react/prop-types': DISABLE,
    'react/prefer-stateless-function': DISABLE,
    'react/no-children-prop': DISABLE,
    'linebreak-style': DISABLE,
  }
};
