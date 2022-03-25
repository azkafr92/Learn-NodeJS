module.exports = {
  parser: '@babel/eslint-parser',
  rules: {
    semi: [2, 'always' ],
    'no-trailing-spaces': [2 ],
    'linebreak-style': [2, 'unix' ],
    'block-spacing': [2, 'always' ],
    'brace-style': [2, '1tbs' ],
    'arrow-spacing': [2, { 'before': true, 'after':true } ],
    'indent': [2, 2],
    'max-len': [2, {
      'code': 120,
    }],
    'comma-spacing': [2],
    'comma-dangle': [2, "always-multiline"],
  },
};