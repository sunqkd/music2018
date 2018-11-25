<template>
	<div id="app">
		<MHeader></MHeader>
		<!-- 路由显示区域 -->
		<!-- tab切换 -->
		<tab></tab>
		<router-view></router-view>
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
