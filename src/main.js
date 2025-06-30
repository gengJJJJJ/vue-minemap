import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, {Table} from 'element-ui'
// import {initMap} from 'v-minemap'
import {initMap} from '../packages'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/normalize.css'

Vue.config.productionTip = false

const fixElTableErr = table => {
	const oldResizeListener = table.methods.resizeListener
	table.methods.resizeListener = function () {
		window.requestAnimationFrame(oldResizeListener.bind(this))
	}
}
initMap({})
	.then(() => {
		if (!window.minemap) {
			throw new Error('地图 SDK 加载失败')
		}
		console.log(111)

		// import('v-minemap').then(({default: VMinemap}) => {
		// 	Vue.use(VMinemap)
		// })
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	})
	.catch(e => {
		console.error(e, '初始化失败')
	})
fixElTableErr(Table)

Vue.use(ElementUI)
