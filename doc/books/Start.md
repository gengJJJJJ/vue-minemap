### 快速开始

### 安装使用

组件使用了coordtransform去转换经纬度，所以也要下载

```shell
npm i v-minemap  coordtransform
```

### 全局注册

```js
import Vue from 'vue'
import {initMap} from 'v-minemap'
// 初始化地图，要在new Vue之前
initMap({}).then(() => {
	if (!window.minemap) {
		throw new Error('地图 SDK 加载失败')
	}
	new Vue({
		router,
		store,
		render: h => h(App)
	}).$mount('#app')
	import('v-minemap').then(({default: VMinemap}) => {
		Vue.use(VMinemap)
	})
})
```

### 按需引入

```js
import {VMap, VMarker} from 'v-minemap'

export default {
	components: {VMap, VMarker}
}
```

### 注意

- 如果控制台没有报错，但是地图没有显示，请检查宽高是否设置正确，可参考：

```js
// App.vue
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}
html,
body {
	margin: 0;
	padding: 0;
}</style>

```

- 使用组件的页面设置宽高为100% 可参考：

```js
<template>
	<v-map
		class="home"
		:config="config"
		:map-options="mapOptions"
		@mapClick="mapClick"
	>
		<v-line
			ref="line"
			:visible="show"
			:geo-data="jsonData"
			:option="option"
		/>
		<div
			style="
				width: 200px;
				height: 200px;
				background-color: aqua;
				position: absolute;
				z-index: 999;
			"
			@click="clusterClick"
		>
			切换
		</div>
	</v-map>
</template>

<script>
import {VMap, VLine} from 'v-minemap'
export default {
	components: {VMap, VLine},
	data() {
		return {
			show: false,
			data: {},
			jsonData: {
				'type': 'FeatureCollection',
				'features': [
					{
						'type': 'Feature',
						'geometry': {
							'type': 'LineString',
							'coordinates': [
								[113.02447 - 1.005, 23.06947 + 1.005],
								[113.02447 - 1.005, 23.06947 - 1.005]
							]
						},
						'properties': {
							'title': '路线一',
							'kind': 1
						}
					},
					{
						'type': 'Feature',
						'geometry': {
							'type': 'LineString',
							'coordinates': [
								[113.02447 - 0.004, 23.06947],
								[113.02447, 23.06947],
								[113.02447 + 0.008, 23.06947]
							]
						},
						'properties': {
							'title': '路线二',
							'kind': 2
						}
					}
				]
			},
			option: {
				sourceName: 'polygonSource'
			},
			config: {
				key: 'your-key' // 必填
			},
			mapOptions: {
				style: 'https://service.minedata.cn/map/solu/style/11003',
				center: [118.12447, 23.06947]
			}
		}
	},
	mounted() {},
	methods: {
		mapClick(e, features, feature) {
			console.log('🚀 ~ mapClick ~ e:', e)
			console.log('🚀 ~ mapClick ~ features:', features)
			console.log('🚀 ~ mapClick ~ feature:', feature)
		},
		clusterClick() {
			this.$refs.line.initLine(this.jsonData)
			this.show = !this.show
		}
	}
}
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	height: 100%;
}
</style>

```
