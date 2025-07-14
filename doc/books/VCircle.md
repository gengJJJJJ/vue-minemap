### 圆点图层

### demo

```html
<template>
	<v-map class="home">
		<v-circle
			ref="circle"
			:visible="show"
			:ext-data="{
				id: '1',
				name: 'circle1'
			}"
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
			标点数据： {{data}} 切换
		</div>
	</v-map>
</template>

<script>
	import {VMap, VCircle} from 'v-minemap'
	export default {
		components: {VMap, VCircle},
		data() {
			return {
				show: false,
				data: {},
				option: {
					sourceName: 'pointSource',
					'paint': {
						'circle-radius': 40,
						'circle-color': '#f43112',
						'circle-opacity': 0.8
					}
				},
				jsonData: {
					'type': 'FeatureCollection',
					'features': [
						{
							'type': 'Feature',
							'geometry': {
								'type': 'Point',
								'coordinates': [113.02447, 23.06947]
							},
							'properties': {
								'title': '大学',
								'kind': 'school'
							}
						}
					]
				}
			}
		},
		mounted() {},
		methods: {
			clusterClick() {
				this.$refs.circle.initCircle(this.jsonData)
				this.show = !this.show
				this.position = [113.52447 + Math.random(10), 23.06947]
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

### 配置项

| props | 类型 | 描述 |
| --- | --- | --- |
| visible | Boolean | 是否可见 |
| option | Object | 额外配置项 |
| extData | Object | 额外信息 |
| geoData | Object | 坐标数据 |
| transform | String | 坐标转换，可选（bd09togcj02，gcj02tobd09，wgs84togcj02，gcj02towgs84） |
