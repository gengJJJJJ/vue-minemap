### 点聚合

### demo

```html
<template>
	<v-map class="home">
		<v-cluster
			ref="cluster"
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
	import {VMap, VCluster} from 'v-minemap'
	export default {
		components: {VMap, VCluster},
		data() {
			return {
				show: false,
				data: {},
				jsonData: {},
				option: {
					sourceName: 'cluster',
					lngName: 'lng',
					latName: 'lat',
					images: [
						{
							name: 'car_icon',
							url: require('@/assets/car_icon.png'),
							filter: ['==', 'risk_level', '20904']
						}
					],
					params: {
						risk_level: '20905'
					}
				}
			}
		},
		mounted() {},
		methods: {
			clusterClick() {
				this.jsonData = {
					'type': 'FeatureCollection',
					'features': [
						{
							'geometry': {
								'type': 'Point',
								'coordinates': [121.90154, 29.46968]
							},
							'type': 'Feature'
						},
						{
							'geometry': {
								'type': 'Point',
								'coordinates': [121.90236, 29.46919]
							},
							'type': 'Feature'
						},
						{
							'geometry': {
								'type': 'Point',
								'coordinates': [121.90141, 29.46884]
							},
							'type': 'Feature'
						},
						{
							'geometry': {
								'type': 'Point',
								'coordinates': [121.90192, 29.46775]
							},
							'type': 'Feature'
						},
						{
							'geometry': {
								'type': 'Point',
								'coordinates': [121.90192, 29.46775]
							},
							'type': 'Feature'
						}
					]
				}
				this.$refs.cluster.initCluster(this.jsonData)
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
| clusterMaxZoom | Number | 最大聚合层级 |
| clusterRadius | Number | 聚合半径 |
| outerRadius | String | 外层图层半径 |
| innerRadius | String | 内层图层半径 |
| textColor | String | 聚合文字颜色 |
| textSize | Number | 聚合文字大小 |
| lngName | String | 当geoData为接口数据而不是标准geoJson格式时，经度对应的字段名称 |
| latName | String | 当geoData为接口数据而不是标准geoJson格式时，纬度对应的字段名称 |
| outerColors | Array | 外层数量及颜色 |
| innerColors | Array | 内层数量及颜色 |
| images | Array | 图标，见下方详细 |

**images**

| props  | 类型   | 描述     |
| ------ | ------ | -------- |
| name   | String | 图片名称 |
| url    | String | 图片url  |
| filter | Array  | 过滤条件 |

**geoData**

```json
// 标准数据格式
{
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': [113.12447, 23.16947]
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
				'type': 'Point',
				'coordinates': [113.12447, 23.16947]
			},
			'properties': { // 额外信息
				id:1,
        		name:'xxx',
        		lon:113.12447,
        		lat:23.16947,
                ...
			}
		},
        {
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': [113.12447, 23.16947]
			},
			'properties': { // 额外信息
				id:2,
        		name:'xxx',
        		lon:113.22447,
        		lat:23.26947,
                ...
			}
		}
	]
},
```
