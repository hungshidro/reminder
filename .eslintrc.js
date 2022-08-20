module.exports = {
	root: true,
	extends: [
		'@react-native-community/eslint-config',
		'eslint-config-prettier'
	],
	plugins: [
		'react',
		'react-native'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
	},
	'env': {
		'react-native/react-native': true
	},
	'rules': {
		'prettier/prettier': 0,
		'eqeqeq': 0,
		'indent': [2,'tab',{'SwitchCase': 1}],
		'quotes': [2,'single'],
		'semi': [2,'always'],
		'curly': [2,'all'],
		'one-var-declaration-per-line': [2,'always'],
		'no-case-declarations': 0,
		'no-useless-escape': 0,
		'no-control-regex': 0,
		'react-hooks/exhaustive-deps': 0,
		'new-cap': 0,
		'no-shadow': 0,
		'react-native/no-inline-styles': 0,
		'react/no-did-mount-set-state': 0,
		'linebreak-style': 0,
		'no-multi-spaces': ['error'],
		'object-curly-newline': 'off',
		'no-tabs': 0,
		'max-len': 0,
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/no-named-as-default': 0,
		'no-console': 'off',
		'no-param-reassign': [2,{'props': false}],
		'no-unused-vars': 0,
	}
};
