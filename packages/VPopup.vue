<template>
	<div id="popup">
		<slot ref="popup" />
	</div>
</template>

<script>
import {transform} from './utils.js'
export default {
	name: 'VPopup',
	inject: ['map'],
	props: {
		option: {
			type: Object,
			default: () => {
				return {}
			}
		},
		visible: {
			type: Boolean,
			default: false
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
		}
	},
	data() {
		return {
			popup: null
		}
	},
	watch: {
		visible: {
			handler(val) {
				if (this.map && val) {
					this.initPopup()
				} else {
					this.delPopup()
				}
			},
			immediate: true
		}
	},
	mounted() {},
	unmounted() {
		this.delPopup()
	},
	methods: {
		initPopup() {
			let el = null
			this.$nextTick(() => {
				el = this.$slots.default ? this.$slots.default[0].elm : null
				this.popup = this.map.addPopup(
					el,
					Object.assign(
						{
							closeOnClick: false,
							closeButton: false,
							offset: [0, -50]
						},
						this.option
					),
					transform(this.position, this.transform)
				)
			})
		},
		// 删除信息窗体
		delPopup() {
			if (this.map && this.popup) {
				this.popup.remove()
				this.popup = null
			}
		}
	}
}
</script>

<style lang="scss" scoped></style>
