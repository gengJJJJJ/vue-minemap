<template>
	<v-map
		class="home"
		:config="config"
		:map-options="mapOptions"
		@mapClick="mapClick">
		<v-line
			ref="line"
			:visible="show"
			:geo-data="jsonData"
			:option="option" />
		<div
			style="
				width: 200px;
				height: 200px;
				background-color: aqua;
				position: absolute;
				z-index: 999;
			"
			@click="clusterClick">
			切换
		</div>
	</v-map>
</template>

<script>
import {VMap, VLine} from '../../../packages/index'
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
				domainUrl: '//183.6.124.12:18101',
				dataDomainUrl: '//183.6.124.12:18101',
				key: '48b7ff7166a04024959bd0b76dcea95c'
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
