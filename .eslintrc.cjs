/** @type {import("eslint").Linter.Config} */
const config = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true,
	},
	plugins: ['@typescript-eslint', 'drizzle'],
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'prettier',
		'next',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
	],
	rules: {
		"react/self-closing-comp": ["error", {
			"component": true,
			"html": true
		}],
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/array-type': 'off',
		'@typescript-eslint/consistent-type-definitions': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/require-await': 'off',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		'drizzle/enforce-delete-with-where': [
			'error',
			{
				drizzleObjectName: ['db', 'ctx.db'],
			},
		],
		'drizzle/enforce-update-with-where': [
			'error',
			{
				drizzleObjectName: ['db', 'ctx.db'],
			},
		],
	},
};
module.exports = config;
