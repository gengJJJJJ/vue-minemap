<template>
	<div id="rangeCircle">
		<slot />
	</div>
</template>

<script>
import {getPointData} from './utils.js'

export default {
	name: 'VRangeCircle',
	inject: ['map'],
	props: {
		extData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		geoData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		transformType: {
			type: String,
			default: ''
		},
		visible: {
			type: Boolean,
			default: false
		},
		option: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			layersData: [],
			circleData: null,
			init: false
		}
	},
	watch: {
		visible: {
			handler(val) {
				if (!this.map && !this.init) return
				this.$nextTick(() => {
					val
						? this.map.setSourcesData(
								this.option.sourceName,
								this.circleData
							)
						: this.map.setSourcesData(
								this.option.sourceName,
								getPointData({list: []})
							)
				})
			},
			immediate: true
		}
	},
	mounted() {
		this.initCircle({
			type: 'FeatureCollection',
			features: []
		})
	},
	unmounted() {
		this.delCircle()
	},
	methods: {
		initCircle(geoData) {
			const {
				sourceName,
				lngName = 'longitude',
				latName = 'latitude'
			} = this.option
			let data = Array.isArray(geoData)
				? getPointData({
						list: geoData,
						lngName,
						latName,
						params: this.extData,
						type: this.transformType
					})
				: geoData
			if (!data.features.length) return
			if (this.init) {
				this.circleData = data
				!this.visible && (data = getPointData([]))
				this.map.setSourcesData(sourceName, data)
			} else {
				this.$nextTick(() => {
					this.map.addSources(sourceName, {
						'type': 'geojson',
						'data': data
					})
					this.init = true
					this.addLayers()
				})
			}
		},
		addLayers() {
			const {
				sourceName,
				paint,
				minzoom = 3,
				maxzoom = 17,
				beforeId = ''
			} = this.option
			paint.forEach((e, i) => {
				const id = `map-${sourceName}-${i}`
				this.layersData.push(id)
				this.map.addLayers(
					{
						'id': id,
						'type': 'circle',
						'source': sourceName,
						'layout': {
							'visibility': 'visible'
						},
						'paint': {
							'circle-radius': e.radius,
							'circle-color': e.color,
							'circle-opacity': e.opacity
						},
						'minzoom': minzoom,
						'maxzoom': maxzoom
					},
					beforeId
				)
			})
		},
		// 删除圆点图层
		delCircle() {
			if (this.map) {
				this.layersData.forEach(e => {
					this.map.removeLayer(e)
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
