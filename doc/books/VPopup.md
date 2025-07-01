### demo

```html
<template>
	<v-map class="home">
		<v-popup ref="popup" :visible="show" :position="position" :option="option">
			<div>
				自定义
				<div>{{ data.name }}</div>
				<div @click="show = false">关闭</div>
			</div>
		</v-popup>
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
	import VPopup from '../map/VPopup.vue'
	export default {
		components: {VMap, VPopup},
		data() {
			return {
				show: false,
				data: {},
				position: [],
				option: {
					closeOnClick: true,
					closeButton: true,
					offset: [0, -50]
				}
			}
		},
		mounted() {},
		methods: {
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
</style>
```

### 配置项

| props | 类型 | 描述 |
| --- | --- | --- |
| visible | Boolean | 是否可见 |
| option | Object | 额外配置项 |
| position | Array | 弹窗坐标 |
| transform | String | 坐标转换，可选（bd09togcj02，gcj02tobd09，wgs84togcj02，gcj02towgs84） |
