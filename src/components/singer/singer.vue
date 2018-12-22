<template>
    
</template>
<script>
import {getSingerList} from '@/api/singer';
import {ERR_OK} from '@/api/config.js';
const  HOT_NAME = "热门";

export default {
    data(){
        return{
            singers:[],
            alphabet:['A','B','C','B','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        }
    },
    created(){
        this._getSingerList(-100);
        for(var i=1;i<=26;i++){
            this._getSingerList(i);
        }
    },
    methods:{
        _getSingerList(indexkey){ //热门数据

            getSingerList(indexkey).then((res)=>{
                if(res.code === ERR_OK){
                    if(indexkey == -100){
                        this.singers.hot = {
                            title:HOT_NAME,
                            item: this._normallizeSinger(res.singerList.data.singerlist,false)
                        }
                    }else{
                        let letter = this.alphabet[indexkey-1];
                        this.singers[letter] = {
                            title: letter,
                            item: this._normallizeSinger(res.singerList.data.singerlist,true)
                        }
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
        }
        
    }
}
</script>
<style>

</style>
