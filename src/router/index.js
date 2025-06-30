import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store'
Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		redirect: '/home'
	},
	// {
	// 	path: '/map',
	// 	name: 'map',
	// 	component: () => import('@/views/map')
	// },
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login')
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home')
		// component: () => import('@/layout'),
		// children: [
		// 	{
		// 		path: '/home',
		// 		name: 'name',
		// 		meta: {
		// 			title: '首页'
		// 		},
		// 	}
		// ]
	}
]
const router = new VueRouter({
	routes
})
if (localStorage.getItem('token')) {
	store.dispatch('getMenuList')
}
export default router
