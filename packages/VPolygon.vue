<template>
	<div id="polygon">
		<slot />
	</div>
</template>

<script>
import {getPointData} from './utils.js'

export default {
	name: 'VPolygon',
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
			layerId: '',
			polygonData: null,
			init: false,
			defaultOption: {
				'layout': {
					'visibility': 'visible'
				},
				'paint': {
					'fill-color': '#0087FF',
					'fill-opacity': 0.7,
					'fill-outline-color': '#0067C2'
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
								this.polygonData
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
		this.initPolygon({
			type: 'FeatureCollection',
			features: []
		})
	},
	unmounted() {
		this.delPolygon()
	},
	methods: {
		initPolygon(geoData) {
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
				this.polygonData = data
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
						'type': 'fill',
						'source': sourceName,
						...this.defaultOption
					},
					this.option
				),
				beforeId
			)
		},
		// 删除面图层
		delPolygon() {
			if (this.map) {
				this.map.removeLayer(this.layerId)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
