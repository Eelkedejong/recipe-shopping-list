import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  importPlugin.flatConfigs.errors,
  react.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat['recommended-latest'],
  prettier,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './jsconfig.json',
          extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
        },
      },
    },
    rules: {
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
    },
  },
];
