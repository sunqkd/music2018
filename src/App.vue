<template>
	<div id="app">
		<MHeader></MHeader>
		<!-- 路由显示区域 -->
		<!-- tab切换 -->
		<tab></tab>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>

	</div>
</template>

<script>
	import MHeader from './components/m-header/m-header.vue';
    import tab from 'components/tab/tab.vue'
	export default {
		name: 'App',
		components:{
			'MHeader':MHeader,
			'tab':tab
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>
