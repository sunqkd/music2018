<template>
    <!--传入data监听变化  更新BScroll  -->
    <scroll class="listview" :data="data" v-if="this.data.length == 27" ref="listview">
        <!-- 左侧内容列表 -->
        <ul>
            <li v-for="(items,indexs) in data" :key="indexs" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{items.title}}</h2>
                <ul>
                    <li v-for="(item,index) in items.item" :key="index" class="list-group-item">
                        <img v-lazy="item.avatar" alt="" class="avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右侧字母列表 -->
        <div class="list-shortcut" @touchstart="onShortcut" @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item,index) in shortcutList" :key="index" class="item" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
</template>
<script>
import scroll from '@/base/scroll/scroll';
import {getData} from '@/common/js/dom.js'
const ANCHOR_HEIGHT = 18; // li 的高度
export default {
    data(){
        return {

        }
    },
    created(){
        this.touch = {}; // 函数之间共用 touch 

    },
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    methods:{
        onShortcut(e){
            // console.log(e.target.getAttribute("data-index"));
            let anchorIndex = getData(e.target,'index');
            // console.log(anchorIndex);
            this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex],0);
            let firstTouch = e.touches[0];
            this.touch.y1 = firstTouch.pageY;
            this.touch.anchorIndex = anchorIndex; // 记录当前点击索引
            console.log(this.touch)
        },
        onShortcutTouchMove(e){
            let firstTouch = e.touches[0];
            this.touch.y2 = firstTouch.pageY;
            // y轴偏移
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT  | 0; // 向下取整 移动了几个li
            console.log(delta);
            let  anchorIndex = this.touch.anchorIndex + delta; // move到的节点
            
        },

    },
    computed:{
        shortcutList(){
            return this.data.map((item)=>{
                return item.title.substring(0,1);
            })
        }
    },
    watch:{

    },
    components:{
        scroll
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
