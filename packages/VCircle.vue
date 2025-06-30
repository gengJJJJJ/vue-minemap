<template>
	<div id="circle">
		<slot />
	</div>
</template>

<script>
import {getPointData} from './utils.js'

export default {
	name: 'VCircle',
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
			circle: null,
			layerId: '',
			circleData: null,
			init: false,
			defaultOption: {
				'layout': {
					'visibility': 'visible'
				},
				'paint': {
					'circle-radius': 10,
					'circle-color': '#ff0000',
					'circle-opacity': 0.8
				},
				'minzoom': 3,
				'maxzoom': 17
			}
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
			const {sourceName, beforeId = ''} = this.option
			this.layerId = `map-${sourceName}`
			this.map.addLayers(
				Object.assign(
					{
						'id': this.layerId,
						'type': 'circle',
						'source': sourceName,
						...this.defaultOption
					},
					this.option
				),
				beforeId
			)
		},
		// 删除圆点图层
		delCircle() {
			if (this.map) {
				this.map.removeLayer(this.layerId)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
