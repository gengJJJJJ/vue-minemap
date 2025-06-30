<template>
	<div id="marker">
		<slot ref="marker" />
	</div>
</template>

<script>
import {transform as _transform} from './utils.js'

export default {
	name: 'VMarker',
	inject: ['map'],
	props: {
		extData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		option: {
			type: Object,
			default: () => {
				return {}
			}
		},
		keys: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			default: ''
		},
		position: {
			type: Array,
			default: () => {
				return []
			}
		},
		transform: {
			type: String,
			default: ''
		},
		width: {
			type: String,
			default: '40px'
		},
		height: {
			type: String,
			default: '40px'
		}
	},
	data() {
		return {
			marker: null
		}
	},
	watch: {
		position: {
			handler(val) {
				if (this.map && val.length) {
					this.delMarker()
					this.initMarker()
				}
			},
			immediate: true
		}
	},
	mounted() {},
	unmounted() {
		this.delMarker()
	},
	methods: {
		initMarker() {
			let el = null
			this.$nextTick(() => {
				el = this.$slots.default ? this.$slots.default[0].elm : null
				if (!el) {
					el = document.createElement('div')
					el.id = `marker-${this.keys}`
					el.style['background-image'] = `url( '${this.url}')`
					el.style['background-size'] = '100% 100%'
					el.style['background-repeat'] = 'no-repeat'
					el.style.width = this.width
					el.style.height = this.height
				}
				this.marker = this.map.addMarkers(
					el,
					Object.assign(
						{
							draggable: false,
							offset: [-25, -50]
						},
						this.option
					),
					_transform(this.position, this.transform)
				)
				el.addEventListener('click', () => {
					this.$emit('click', this.extData)
				})
			})
		},
		// 删除点标记
		delMarker() {
			if (this.map && this.marker) {
				this.marker.remove()
				this.marker = null
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
