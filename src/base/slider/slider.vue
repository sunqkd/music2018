<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <!-- 插槽 -->
            <slot></slot>
        </div>
        <div class="dots">
			<span class="dot" v-for="(item,index) in dots" :key="index" :class="{'active': currentPageIndex == index}" @click="dotscli(index)"></span>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom.js'
export default {
    data(){
        return{
			dots:[],
			currentPageIndex: 0 //默认是第零页
        }
	},
	props:{
		loop:{ // 可不可以循环轮播
			type:Boolean,
			default:true // 默认可以
		},
		autoPlay:{ // 自动轮播
			type:Boolean,
			default:true
		},
		interval:{ // 自动轮播间隔
			type:Number,
			default:4000
		}
	},
	mounted(){ // 初始化slide
	
		setTimeout(() => {
			this._setSlideWidth();
			this._initDots();
			this._initSlide();

			// 自动播放功能
			if(this.autoPlay){
				this._play() // 自动播放方法
			}

		},20)

		window.addEventListener('resize',()=>{
			if(!this.slider){
				return;
			}else{
				this._setSlideWidth(true);  // 重新计算宽度
				this.slider.refresh(); // 刷新
			}
		})
	},
	methods:{
		_initDots(){
			this.dots = new Array(this.children.length);
		},
		dotscli(index){
			// console.log(index)
			// console.log(this.children);
			let el = this.children[index];
			this.slider.scrollToElement(el,300);
		},
		_play(){ // 自动播放方法
		    clearTimeout(this.timer);
        	this.timer = setTimeout(() => {
				this.slider.next();
			}, this.interval)
		},
		_setSlideWidth(isResize){ // 设置横向宽度
			this.children = this.$refs.sliderGroup.children;
			// console.log(this.children);
			let width = 0;
			let slideWidth = this.$refs.slider.clientWidth; // 父容器的宽度

			for(let i=0;i<this.children.length;i++){
				let child = this.children[i]; // 子元素
				addClass(child,'slider-item');
				child.style.width = slideWidth + 'px'; // 
			    width+=slideWidth;
			}

		    if(this.loop && !isResize){ // 循环滚动宽度加上两个宽度  重新计算屏幕不需要重新计算宽度
				width += 2*slideWidth;
			}
			this.$refs.sliderGroup.style.width = width + 'px'
		},
		_initSlide(){ // 初始化slide
			this.slider = new BScroll(this.$refs.slider,{
				scrollX:true, // x 方向可以滚动
				scrollY:false,// y 方向禁止滚动
				momentum:false, // 惯性
				snap: {
					loop: this.loop, // 无缝滚动
					threshold: 0.3,
					speed: 400
				}
			}),

			this.slider.on('scrollEnd', ()=>{
				let pageIndex = this.slider.getCurrentPage().pageX;  // 第几个子元素
				this.currentPageIndex = pageIndex;

				if(this.autoPlay){
					clearTimeout(this.timer);
					this._play();
				}
			})
		}
	},
	destroyed(){ // 清除定时器
		clearTimeout(this.timer);
	}

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
