<template>
    <div>
        搜索界面
        <!-- <pagination :btn-click="listen"></pagination> -->
    </div>
</template>
<script>
import pagination from "@/base/pagenation/page"
export default {
    data(){
        return{
            cur:1,
            all:100
        }
    },
    components:{
        pagination
    },
    methods:{
        listen(data){
            console.log(data)
        }
    }
}
</script>
<style>

</style>
