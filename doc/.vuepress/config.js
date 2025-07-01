module.exports = {
	title: 'v-minemap', // 网站标题
	description: 'v-minemap文档',
	head: [
		['link', {rel: 'icon', href: '/favicon.ico'}] // 增加网页标签图标)
	],
	base: '/vue-minemap/',
	lang: 'zh-CN',
	themeConfig: {
		nav: [
			// 导航栏配置
			{text: '文档', link: '/books/VCircle'},
			{text: 'Github', link: 'https://github.com/gengJJJJJ/vue-minemap'}
		],
		sidebar: {
			'/books/': [
				{
					text: 'books',
					collapsable: false,
					children: [
						'VCircle.md',
						'VCluster.md',
						'VMarkers.md',
						'VPolygon.md',
						'VPopup.md',
						'VRangeCircle.md'
					]
				}
			]
		}
	}
}
