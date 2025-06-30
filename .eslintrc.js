module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended'],
	rules: {
		'no-console': 'off', // 允许console
		'no-unused-vars': 'warn', // 警告未使⽤的变量
		'vue/multi-word-component-names': 'off',
		'vue/html-indent': ['error', 'tab'] // 允许使用制表符进行缩进
	}
}
