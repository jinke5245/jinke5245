import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    ...mdx.flat,
    files: ['**/*.mdx'],
    rules: {
      ...mdx.flat.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ...mdx.flatCodeBlocks,
    files: ['**/*.mdx/**'],
  },
  eslintConfigPrettier,
);
