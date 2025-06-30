const {defineConfig} = require('@vue/cli-service')
const {resolve} = require('path')

module.exports = defineConfig({
	lintOnSave: false,
	transpileDependencies: true,

	configureWebpack: config => {
		// 外部化依赖
		config.externals = {
			// vue: 'Vue',
			// 'vue-router': 'VueRouter',
			// vuex: 'Vuex',
			// axios: 'axios',
			// 'element-ui': 'ElementUI',
			// coordtransform: 'coordtransform',
			// mitt: 'mitt',
			minemap: 'minemap'
		}
		// 构建库配置
		if (process.env.VUE_CLI_BUILD_MODE === 'lib') {
			config.output = {
				library: 'VMinemap',
				libraryTarget: 'umd',
				libraryExport: 'default',
				filename: 'v-minemap.js',
				globalObject: 'this'
			}
			config.entry = {
				app: resolve(__dirname, 'packages/index.js')
			}
			config.optimization = {
				minimize: false
			}
		}
	}
})
