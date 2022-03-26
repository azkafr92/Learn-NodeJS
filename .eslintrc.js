module.exports = {
  parser: '@babel/eslint-parser',
  rules: {
    semi: [2, 'always'],
    'no-trailing-spaces': [1],
    'linebreak-style': [1, 'unix'],
    'block-spacing': [1, 'always'],
    'brace-style': [1, '1tbs'],
    'arrow-spacing': [1, { 'before': true, 'after':true }],
    'indent': [1, 2],
    'max-len': [1, {
      'code': 120,
    }],
    'comma-spacing': [1],
    'comma-dangle': [1, "always-multiline"],
    'camelcase': [1],
  },
};