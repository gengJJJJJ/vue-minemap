<template>
	<div id="line">
		<slot />
	</div>
</template>

<script>
import {getLineData, getPolylineData, getGeometryData} from './utils.js'

export default {
	name: 'VLine',
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
		layerType: {
			type: String,
			default: 'line'
		},
		dataType: {
			type: String,
			default: 'line'
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
			lineData: null,
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
								this.lineData
							)
						: this.map.setSourcesData(
								this.option.sourceName,
								getLineData({list: []})
							)
				})
			},
			immediate: true
		}
	},
	mounted() {
		this.initLine({
			type: 'FeatureCollection',
			features: []
		})
	},
	unmounted() {
		this.delLine()
	},
	methods: {
		initLine(geoData) {
			const {sourceName} = this.option
			let data = Array.isArray(geoData) ? this.getData(geoData) : geoData
			if (!data.features.length) return
			if (this.init) {
				this.lineData = data
				!this.visible && (data = getLineData([]))
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
		getData(geoData) {
			switch (this.dataType) {
				case 'Polyline':
					return getPolylineData({
						list: geoData,
						params: this.extData,
						type: this.transformType
					})
				case 'line':
					return getLineData({
						list: geoData,
						params: this.extData,
						type: this.transformType
					})
				case 'geometry':
					return getGeometryData({
						list: geoData,
						params: this.extData,
						type: this.transformType
					})
			}
		},
		addLayers() {
			const {
				sourceName,
				paint,
				layout,
				minzoom = 5,
				maxzoom = 17,
				beforeId = ''
			} = this.option
			this.layerId = `map-${sourceName}`
			switch (this.layerType) {
				case 'line': {
					this.map.addLayers(
						{
							'id': this.layerId,
							'type': 'line',
							'source': sourceName,
							'layout': Object.assign(
								{
									'line-join': 'round',
									'line-cap': 'round'
								},
								layout || {}
							),
							'paint': Object.assign(
								{
									'line-width': 12,
									'line-color': {
										'type': 'categorical',
										'property': 'kind',
										'stops': [
											[1, '#1FD2FF'],
											[2, '#1FD2FF']
										],
										'default': '#1FD2FF'
									}
								},
								paint || {}
							),
							'minzoom': minzoom,
							'maxzoom': maxzoom
						},
						beforeId
					)
					break
				}
				case 'symbol': {
					this.map.addLayers(
						{
							'id': this.layerId,
							'type': 'symbol',
							'source': sourceName,
							'layout': Object.assign(
								{
									'icon-allow-overlap': true,
									'icon-size': 0.18,
									'symbol-spacing': 20,
									'symbol-avoid-edges': true,
									'icon-image': {
										'type': 'categorical',
										'property': 'status',
										'stops': [[-1, 'direction-99']],
										'default': 'direction-99'
									},
									'symbol-placement': 'line'
								},
								layout || {}
							),
							'paint': Object.assign(
								{
									'icon-color': '#ffffff'
								},
								paint || {}
							),
							'minzoom': minzoom,
							'maxzoom': maxzoom
						},
						beforeId
					)
					break
				}
				default:
			}
		},
		// 删除线图层
		delLine() {
			if (this.map) {
				this.map.removeLayer(this.layerId)
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
