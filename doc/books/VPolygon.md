### 面图层

### demo

```html
<template>
	<v-map class="home">
		<v-polygon
			ref="polygon"
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
			标点数据： {{data}} 切换
		</div>
	</v-map>
</template>

<script>
	import {VMap, VPolygon} from 'v-minemap'
	export default {
		components: {VMap, VPolygon},
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
								'type': 'Polygon',
								'coordinates': [
									[
										[113.02447, 23.06947],
										[113.02447, 23.06947 + 0.105],
										[113.02447 - 0.106, 23.06947 + 0.105],
										[113.02447 - 0.106, 23.06947],
										[113.02447, 23.06947]
									]
								]
							}
						}
					]
				},
				option: {
					sourceName: 'polygonSource',
					'paint': {
						'fill-color': '#0087FF',
						'fill-opacity': 0.7,
						'fill-outline-color': '#0067C2'
					}
				}
			}
		},
		mounted() {},
		methods: {
			clusterClick() {
				this.$refs.polygon.initPolygon(this.jsonData)
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

### 配置项

| props | 类型 | 描述 |
| --- | --- | --- |
| visible | Boolean | 是否可见 |
| option | Object | 额外配置项，见下方详细 |
| extData | Object | 额外信息 |
| geoData | Object\|Array | 坐标数据，对象则为标准坐标数据，数组则为接口数据，详细见下方geoData |
| transform | String | 坐标转换，可选（bd09togcj02，gcj02tobd09，wgs84togcj02，gcj02towgs84） |

**option**

| props | 类型 | 描述 |
| --- | --- | --- |
| sourceName | String | 图层数据源名称 |
| paint | Object | 图层绘制样式 |
| layout | Object | 图层布局样式 |
| minzoom | String | 图层的最小缩放等级（0-24） |
| maxzoom | String | 图层的最大缩放等级（0-24） |
| beforeId | String | 坐标转换，可选（bd09togcj02，gcj02tobd09，wgs84togcj02，gcj02towgs84） |
| lngName | String | 当geoData为接口数据而不是标准geoJson格式时，经度对应的字段名称 |
| latName | String | 当geoData为接口数据而不是标准geoJson格式时，纬度对应的字段名称 |

**geoData**

```json
// 标准数据格式
{
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'geometry': {
				'type': 'Polygon',
				'coordinates': [[
									[113.02447, 23.06947],
									[113.02447, 23.06947 + 0.105],
									[113.02447 - 0.106, 23.06947 + 0.105],
									[113.02447 - 0.106, 23.06947],
									[113.02447, 23.06947]
								]]
			},
			'properties': { // 额外信息
				'title': '大学',
				'kind': 'school'
			}
		}
	]
},
// 接口数据格式
[
    {
        id:1,
        name:'xxx',
        lon:113.12447,
        lat:23.16947,
        ...
    },
    {
        id:2,
        name:'xxx',
        lon:113.22447,
        lat:23.26947,
        ...
    }
]
// 会将接口数据格式化生成标准数据格式
{
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'geometry': {
				'type': 'Polygon',
				'coordinates': [[
									[113.02447, 23.06947],
									[113.02447, 23.06947 + 0.105],
									[113.02447 - 0.106, 23.06947 + 0.105],
									[113.02447 - 0.106, 23.06947],
									[113.02447, 23.06947]
								]]
			},
			'properties': { // 额外信息
				id:1,
        		name:'xxx',
        		lon:113.12447,
        		lat:23.16947,
                ...
			}
		},
	]
},
```
