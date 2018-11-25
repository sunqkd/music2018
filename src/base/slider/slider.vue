<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <!-- 插槽 -->
            <slot></slot>
        </div>
        <div class="dots">

        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom.js'
export default {
    data(){
        return{
			// children:''
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
			this._initSlide();
		},20)
	},
	methods:{
		_setSlideWidth(){ // 设置横向宽度
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

		    if( this.loop){
				width += 2*slideWidth;
			}
			this.$refs.sliderGroup.style.width = width + 'px'
		},
		_initSlide(){ // 初始化slide

		}
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
