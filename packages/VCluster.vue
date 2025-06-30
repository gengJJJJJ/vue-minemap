<template>
	<div id="cluster">
		<slot />
	</div>
</template>

<script>
import {getPointData} from './utils.js'

export default {
	name: 'VCluster',
	inject: ['map'],
	props: {
		extData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		geoData: {
			type: [Object, Array],
			default: () => ({}),
			validator(value) {
				return (
					(typeof value === 'object' && !Array.isArray(value)) ||
					Array.isArray(value)
				)
			}
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
		},
		transformType: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			layersData: [],
			clusterData: null,
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
								this.clusterData
							)
						: this.map.setSourcesData(
								this.option.sourceName,
								getPointData({list: []})
							)
				})
			},
			immediate: true
		},
		'option.images': {
			handler(list) {
				if (!this.map && !list.length) return
				this.$nextTick(() => {
					list.forEach(e => {
						this.map.addImage(e.name, e.url, e.option)
					})
				})
			},
			immediate: true
		}
	},
	mounted() {},
	unmounted() {
		this.delCluster()
	},
	methods: {
		initCluster(geoData) {
			const {
				sourceName,
				lngName = 'longitude',
				latName = 'latitude',
				clusterMaxZoom = 15,
				clusterRadius = 50
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
			if (geoData.type !== 'FeatureCollection') return
			if (this.init) {
				this.clusterData = data
				!this.visible && (data = getPointData([]))
				this.map.setSourcesData(sourceName, data)
			} else {
				this.$nextTick(() => {
					this.map.addSources(sourceName, {
						'type': 'geojson',
						'data': data,
						cluster: true,
						clusterMaxZoom: clusterMaxZoom /* 最大聚合层级 */,
						clusterRadius: clusterRadius /* 聚合半径 */
					})
					this.init = true
					this.addLayers()
				})
			}
		},
		addLayers() {
			const {
				sourceName,
				innerRadius = 10,
				outerRadius = 20,
				textColor = 'rgba(0,0,0,.75)',
				textSize = 10,
				images = [],
				outerColors = [
					[1000, 'rgba(253, 156, 115, 0.6)'],
					[100, 'rgba(241, 211, 87, 0.6)'],
					[0, 'rgba(181, 226, 140, 0.6)']
				],
				innerColors = [
					[1000, 'rgba(241, 128, 23, 0.6)'],
					[100, 'rgba(240, 194, 12, 0.6)'],
					[0, 'rgba(110, 204, 57, 0.6)']
				]
			} = this.option
			//添加非聚合图层,即聚合图层的子图层
			images.forEach((img, i) => {
				const id = `map-unClustered-points-${i}`
				this.layersData.push(id)
				this.map.addLayers({
					'id': id,
					'type': 'symbol',
					'source': sourceName,
					'layout': {
						'icon-allow-overlap': false,
						'text-allow-overlap': true,
						'icon-image': img.name
					}
				})
			})
			outerColors.forEach((color, i) => {
				const id = `map-point-outer-cluster-${i}`
				this.layersData.push(id)
				this.map.addLayers({
					'id': id,
					'type': 'circle',
					'source': sourceName,
					'paint': {
						'circle-color': color[1],
						'circle-radius': outerRadius
					},
					'filter':
						i === 0
							? ['>=', 'point_count', color[0]]
							: [
									'all',
									['>=', 'point_count', color[0]],
									['<', 'point_count', outerColors[i - 1][0]]
								]
				})
			})
			innerColors.forEach((color, i) => {
				const id = `map-point-inner-cluster-${i}`
				this.layersData.push(id)
				this.map.addLayers({
					'id': id,
					'type': 'circle',
					'source': sourceName,
					'paint': {
						'circle-color': color[1],
						'circle-radius': innerRadius
					},
					'filter':
						i === 0
							? ['>=', 'point_count', color[0]]
							: [
									'all',
									['>=', 'point_count', color[0]],
									['<', 'point_count', innerColors[i - 1][0]]
								]
				})
			})
			//添加数量图层
			const countId = 'map-cluster-count'
			this.layersData.push(countId)
			this.map.addLayers({
				'id': countId,
				'type': 'symbol',
				'source': sourceName,
				'layout': {
					'text-field': '{point_count}',
					'text-size': textSize
				},
				'paint': {
					'text-color': textColor
				},
				'filter': ['has', 'point_count']
			})
		},
		// 删除聚合图层
		delCluster() {
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
