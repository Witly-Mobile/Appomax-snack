module.exports = {
	root: true,
	extends: '@react-native-community',
	env: {
		es6: true,
		node: true,
		browser: true
	},
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	ignorePatterns: ['/node_modules/**', '/build/**'],
	rules: {
		'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
		'prettier/prettier': ['error'],
		'comma-dangle': [
			'error',
			{
				arrays: 'never',
				objects: 'never',
				imports: 'never',
				exports: 'never',
				functions: 'never'
			}
		]
	},
	settings: {
		react: {
			version: 'detect'
		}
	}
};
