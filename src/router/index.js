import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Recommend from 'components/recommend/recommend.vue';
import Singer from 'components/singer/singer.vue';
import Rank from 'components/rank/rank.vue';
import Search from 'components/search/search.vue';

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			name: 'Recommend',
			component: Recommend
		},
		{
			path: '/singer',
			name: 'Singer',
			component: Singer
		},
		{
			path: '/rank',
			name: 'Rank',
			component: Rank
		},
		{
			path: '/search',
			name: 'Search',
			component: Search
		},
	]
})
