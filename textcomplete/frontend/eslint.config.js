import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  // standard,
  ...compat.extends('eslint-config-standard'),
  // prettier,
  ...compat.plugins('jsdoc', 'import'),
  ...compat.extends('plugin:prettier/recommended'),
  ...compat.config({
    ignorePatterns: ['build', 'node_modules'],
  }),
];
