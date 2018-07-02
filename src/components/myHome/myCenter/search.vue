<template>
    <div>
        <header>搜索</header>
        <mt-search v-model="value" cancel-text="取消" placeholder="搜索">
            <mt-cell  v-for="(item,index) in items" :key="index" :title="item.title" :value="item.value"></mt-cell>
        </mt-search>

    </div>
</template>
<script>
import { Search } from 'mint-ui';
import pinyin from "./pinyin.js"
export default {
    data(){
        return{
            value:'',
            result:[],
            items:[],
            FirstName:["赵","钱","孙","李","周","吴","郑","王","冯","陈","楚"],
            lastName:["速度","阿德","地方","是否","而我","他是","发呵","的人","问号","东方","官方","大概","是下","下","官方","风格"]
        }
    },
    created:function(){
        for(var i=0;i<1000;i++){
            var nu1=Math.round(Math.random()*10)
            var nu2=Math.round(Math.random()*10)
            this.result.push({
                "title":''+i,
                "value":this.FirstName[nu1]+this.lastName[nu2]
            })
            pinyin.codefans_net_CC2PY(this.result[i].value)
        }
    },
    watch:{
        value:{
                handler:function(val,oldval){
                    var nu1=Math.round(Math.random()*10)
                    var nu2=Math.round(Math.random()*10)
                    console.log(">>>>>>>>>",pinyin.codefans_net_CC2PY("知道了"))
                    





                    var news=0
                    this.items=[]
                    for(var i=0;i<this.result.length;i++){
                        if(this.result[i].title.indexOf(val)>-1 || this.result[i].value.indexOf(val)>-1){
                            this.items.push(this.result[i])
                        }else{
                            news=1
                        }
                    }
                    if(news==1){
                        this.items.push({
                            "value":"没有更多数据"
                        })
                    }
                },
                deep:true//对象内部的属性监听，也叫深度监听
            },   
    },
    methods:{
        fenzu:function(){

        }
    }
}
</script>
<style>
header{
    height: 44px;
}
    input[type='search']{
        width: 100%;
        height: 100%;
        margin: 0;
    }
    .mint-search-list{
        top: 44px
    }
    .mint-cell-wrapper .mint-cell-value{
        flex:5
    }
    .mint-search-list-warp{
        position: relative;
    overflow: scroll;
    height: 100%;
    }
</style>
