// // @ts-check
// import eslint from '@eslint/js';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import eslintConfigPrettier from 'eslint-config-prettier';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },
//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   eslintPluginPrettierRecommended,
//   eslintConfigPrettier,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       // Desactivar reglas de formato que Prettier maneja
//       'prettier/prettier': 'warn',
//       'arrow-body-style': 'off',
//       'prefer-arrow-callback': 'off',
//       'max-len': 'off',
//       'object-curly-spacing': 'off',
//       'comma-dangle': 'off',
//       'quotes': 'off',
//       'semi': 'off',
//     },
//   },
// );