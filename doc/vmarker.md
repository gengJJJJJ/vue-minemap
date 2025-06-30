### 两种用法

1. 自定义图标
2. 自定义样式

```html
<template>
	<v-map class="home">
		<v-marker
			ref="marker"
			:position="position"
			:option="markerOption"
			width="40px"
			height="40px"
			keys="car"
			:url="require('@/assets/car_icon.png')"
			:ext-data="{
				id: '1',
				name: 'marker1'
			}"
			@click="handleClick" />
		<v-marker :position="[113.32447, 23.36947]">
			<div style="z-index: 120">
				<div class="ring-point-marker" />
				<div class="ring-point-inner1" />
				<div class="ring-point-inner2" />
				<div class="ring-point-inner3" />
			</div>
		</v-marker>
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
	import VMap from '../map/VMap.vue'
	import VMarker from '../map/VMarker.vue'
	export default {
		components: {VMap, VMarker},
		data() {
			return {
				show: false,
				data: {},
				position: [],
				markerOption: {
					draggable: true,
					offset: [-25, -50]
				}
			}
		},
		mounted() {},
		methods: {
			handleClick(e) {
				console.log('点击地图', e)
				this.show = !this.show
				this.data = e
			},
			clusterClick() {
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
	@keyframes ring_bound3 {
		from {
			left: 20px;
			top: 20px;
			width: 20px;
			height: 20px;
		}
		to {
			left: 0;
			top: 0;
			width: 60px;
			height: 60px;
		}
	}

	@keyframes ring_bound2 {
		from {
			left: 25px;
			top: 25px;
			width: 10px;
			height: 10px;
		}
		to {
			left: 10px;
			top: 10px;
			width: 40px;
			height: 40px;
		}
	}

	.ring-point-marker {
		width: 60px;
		height: 60px;
		cursor: pointer;
		background-color: transparent;
	}

	.ring-point-inner3 {
		position: absolute;
		left: 20px;
		top: 20px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		/* box-shadow: 0 0 10px #ff0000; */
		background-color: transparent;
		background-image: radial-gradient(
			circle at center,
			transparent,
			#ff2b2b 90%
		);
		border: solid 1px rgba(255, 0, 0, 0.6);
		animation: ring_bound3 1s infinite linear;
		z-index: 3;
	}

	.ring-point-inner2 {
		position: absolute;
		left: 25px;
		top: 25px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		/* box-shadow: 0 0 10px #ff0000; */
		background-color: transparent;
		background-image: radial-gradient(
			circle at center,
			transparent,
			rgba(255, 43, 43, 0.5) 45%
		);
		border: solid 1px rgba(255, 0, 0, 0.6);
		animation: ring_bound2 1s infinite linear;
		z-index: 3;
	}

	.ring-point-inner1 {
		position: absolute;
		left: 25px;
		top: 25px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		/* box-shadow: 0 0 10px #ff0000; */
		background-image: radial-gradient(
			circle at center,
			rgba(255, 43, 43, 0) 0%,
			#ff2b2b 100%
		);
		z-index: 1;
	}
</style>
```

### 配置项

| props     | 类型   | 描述                                                         |
| --- | --- | --- |
| extData | Object | 标点额外信息 |
| option | Object | 额外配置项(图标形式) |
| position | Array | 标点坐标 |
| transform | String | 坐标转换，可选（bd09togcj02，gcj02tobd09，wgs84togcj02，gcj02towgs84） |
| width | String | 图标宽度(图标形式) |
| height | String | 图标高度(图标形式) |
| keys | String | 图标div id(marker-${keys})(图标形式) |
| url | String | 图标图片url(图标形式) |
