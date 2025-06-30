import components from './components'
import {transform, initMap as rawInitMap} from './utils'

// 包装 initMap，确保它只被调用一次，并提供更好的错误提示
let mapInitialized = false
let minemapLoadedResolve
let minemapLoadedReject
const minemapReady = new Promise((resolve, reject) => {
	minemapLoadedResolve = resolve
	minemapLoadedReject = reject
})

const initMap = async (options = {}) => {
	if (mapInitialized) return minemapReady

	try {
		await rawInitMap(options)

		if (!window.minemap) {
			const err = new Error('地图 SDK 加载失败：minemap 未定义')
			minemapLoadedReject(err)
			throw err
		}

		minemapLoadedResolve()
		mapInitialized = true
	} catch (err) {
		minemapLoadedReject(err)
		throw err
	}
}
const install = function (Vue) {
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}
// 导出所有组件（支持按需引入）
export * from './components'
export {transform, initMap}
export default {
	install,
	initMap
}
