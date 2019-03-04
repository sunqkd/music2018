<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>

import BScroll from 'better-scroll';

export default {
    props:{
        /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
        probeType:{
            type:Number,
            default:1
        },
        /**
       * 点击列表是否派发click事件
       */
        click:{
            type:Boolean,
            default:true
        },
         /**
       * 列表的数据
       */
        data:{
            type:Array,
            default: null
        }
    },
    mounted(){
        setTimeout(()=>{ // 延时20ms 
            this._initScroll();
        },20)
    },
    methods:{
        _initScroll(){ // 初始化
            if(!this.$refs.wrapper){
                return;
            }else{
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    click:this.click
                })
            }
        },
        enable(){
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable();
        },
        disable(){
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable();
        },
        refresh(){
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo(){
            // 移动到
            this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
        },
        scrollToElement(){
            // 移动到某个节点
            this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments) // arguments 是参数 在this.scroll环境下
        }
    },
    watch:{ 
        data(){ // 观察data的变化
            setTimeout( () => {
                this.refresh();
            },20)
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
