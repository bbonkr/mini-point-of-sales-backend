module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [
    'standard',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
   
  'rules': {
    "indent": ["error", 4],
    'semi':'off',
    'comma-dangle': 'off',
    'no-unused-vars':'warn',
    'new-cap': 'off',
    'linebreak-style': 'off'
  },
};
