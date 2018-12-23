<template>
    <ul v-if="newsinger.length==27">
        <li v-for="(item,index) in newsinger" :key="index">
            {{item.title}}
        </li>
    </ul>
</template>
<script>
import {getSingerList} from '@/api/singer';
import {ERR_OK} from '@/api/config.js';
const  HOT_NAME = "热门";

export default {
    data(){
        return{
            singers:[],
            alphabet:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            newsinger:[]
        }
    },
    created(){
        this._getSingerList(-100);

        for(let i=1;i<=26;i++){
            this._getSingerList(i);
        }

    },
    watch:{
        singers(maps){
          this.newsinger = this.ArraySort(maps);
        }
    },
    methods:{
        _getSingerList(indexkey){ //热门数据

            getSingerList(indexkey).then((res)=>{
                if(res.code === ERR_OK){
                    if(indexkey == -100){
                        this.singers.push({
                            title:HOT_NAME,
                            item: this._normallizeSinger(res.singerList.data.singerlist,false)
                        })
                    }else{
                        let letter = this.alphabet[indexkey-1];
                        this.singers.push({
                            title: letter,
                            item: this._normallizeSinger(res.singerList.data.singerlist,true)
                        })
                    }
                    // this.singers = res.singerList.data.singerlist
                }
            }).catch((err)=>{
                console.log(err);
            })
        },

        _normallizeSinger(list,flag){
            let itemlist = [];
            list.forEach((item,index) => {
                if(index < 10){
                    itemlist.push({
                        id:item.singer_id,
                        name:item.singer_name,
                        avatar:flag?" ":`https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.singer_mid}.jpg?max_age=2592000`
                    })
                }
            });
            return itemlist;
        },
        // 数组排序
        ArraySort(maps){
            let hot = [];
            let ret = [];
            
            for(var key in maps){

                let val = maps[key];
                // console.log(val);

                if(val.title.match(/[a-zA-Z]/)){
                    ret.push(val);
                }else{
                    hot.push(val);
                }
            }

            ret.sort((a,b)=>{
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            })

            return hot.concat(ret);
        }
        
    }
}
</script>
<style>

</style>
