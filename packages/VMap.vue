<template>
	<div id="mapId">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'VMap',
	provide() {
		return {
			map: this
		}
	},
	props: {
		mapOptions: {
			type: Object,
			default: () => {
				return {}
			}
		},
		config: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			map: null,
			init: false,
			sourcesData: []
		}
	},
	async mounted() {
		await this.initMap(this.config, this.mapOptions)
		this.onLoad()
	},
	unmounted() {
		this.map.remove()
		this.map = null
	},
	methods: {
		/**初始化地图 */
		initMap(config = {}, mapOptions = {}) {
			let minemap = window.minemap

			// 默认值兜底
			const defaultConfig = {
				domainUrl: 'https://minedata.cn',
				dataDomainUrl: 'https://minedata.cn',
				serverDomainUrl: 'https://ol-data.minedata.cn',
				spriteUrl:
					'https://minedata.cn/minemapapi/v2.1.1/sprite/sprite',
				serviceUrl: 'https://service.minedata.cn/service',
				key: ''
			}
			const finalConfig = {...defaultConfig, ...config}
			console.log(finalConfig)

			// 设置 minemap 全局配置
			minemap.domainUrl = finalConfig.domainUrl
			minemap.dataDomainUrl = finalConfig.dataDomainUrl
			minemap.serverDomainUrl = finalConfig.serverDomainUrl
			minemap.spriteUrl = finalConfig.spriteUrl
			minemap.serviceUrl = finalConfig.serviceUrl
			minemap.key = finalConfig.key
			this.map = new minemap.Map(
				Object.assign(
					{},
					{
						container: 'mapId',
						style: 'https://service.minedata.cn/map/solu/style/11001',
						center: [113.02447, 23.06947],
						zoom: 6.5,
						pitch: 0,
						maxZoom: 17,
						minZoom: 3,
						projection: 'MERCATOR',
						transformRequest: function (url, resourceType) {
							if (resourceType === 'Tile') {
								if (url.includes('{tileMatrixSet}')) {
									url = url.replace(
										'{tileMatrixSet}',
										'MERCATOR'
									)
									return {
										url: url
									}
								}
							}
						}
					},
					mapOptions
				)
			)
		},
		/** 加载地图，增加自定义数据源、自定义图层 */
		onLoad() {
			this.map.on(
				'load',
				function () {
					this.init = true
				}.bind(this)
			)
			this.map.on('click', this.mapClick)
		},
		/** 地图点击事件 */
		mapClick(e) {
			let features = this.map.queryRenderedFeatures(e.point)
			features = features.filter(f => {
				return f.layer.id.startsWith('map-')
			})
			let feature = null
			features.forEach(function (f) {
				feature = f
			})
			this.$emit('mapClick', e, features, feature)
		},
		/**添加标记点Markers */
		addMarkers(el, option = {}, center) {
			return new minemap.Marker(el, option)
				.setLngLat(center)
				.addTo(this.map)
		},
		/**添加信息窗体Popup */
		addPopup(el, option = {}, center) {
			return new minemap.Popup(option)
				.setLngLat(center)
				.setDOMContent(el)
				.addTo(this.map)
		},
		/**添加自定义数据源 */
		addSources(name, option) {
			if (this.sourcesData.indexOf(name) !== -1) return
			this.$nextTick(() => {
				this.map.addSource(name, option)
				this.sourcesData.push(name)
			})
		},
		/** 通过名字设置数据 */
		setSourcesData(name, geojson) {
			if (this.sourcesData.indexOf(name) === -1) return
			this.$nextTick(() => {
				this.map.getSource(name).setData(geojson)
			})
		},
		/**添加自定义图层 */
		addLayers(option, beforeId) {
			this.$nextTick(() => {
				this.map.addLayer(option, beforeId)
			})
		},
		/**删除图层 */
		removeLayer(name) {
			this.$nextTick(() => {
				if (this.map.getLayer(name)) this.map.removeLayer(name)
			})
		},
		/**添加图片 */
		addImage(name, url, option = {}) {
			this.$nextTick(() => {
				this.map.loadImage(url, (error, image) => {
					if (error) throw error
					if (!this.map.hasImage(name))
						this.map.addImage(name, image, option)
				})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
html,
body,
#mapId {
	width: 100%;
	height: 100%;
}
html,
body {
	margin: 0;
	padding: 0;
}
</style>
