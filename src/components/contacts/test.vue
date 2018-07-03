<template>
    <div id="app">
        <!-- <h4>测试</h4>
        <mt-button type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
        <mt-button @click.native="handleClick" :disabled='disabled'>点击触发 handleClick</mt-button> -->
        <mt-loadmore :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul>
                <li v-for="(item,index) in list" :key="index">{{ item }}</li>
            </ul>
        </mt-loadmore>
        <div style="height:100px;background:red">
            <input type="text" style="height:30px;">
        </div>
        <div style="height:100px;background:blue" @change="aaa">

        </div>
    </div>
</template>

<script>
import { DatetimePicker,Button,Loadmore  } from 'mint-ui';
export default {
    data(){
        return{
            list:[],
            allLoaded:false,
            newlist:['C','D','H','Q','P','A','V','S','B','M','O','X','I','F','G','J','W','E','R','T','K','Y','U','L','Z','N','#']
        }
    },
    methods:{
        aaa(){
            console.log(111)
        },
        loadTop(){
            console.log('loadTop')
            this.allLoaded = true
        },
        loadBottom(){
            console.log('loadBottom')
        },
    },
    mounted(){
        for(let i=0;i<this.newlist.length;i++){
            for(let l=0;l<this.newlist.length-1;l++){
                if(this.newlist[i]<this.newlist[l]){
                    let c = this.newlist[i]
                    this.newlist[i] = this.newlist[l]
                    this.newlist[l] = c
                }
            }
        }
        console.log(this.newlist)
    },
}
</script>

<style type="text/css" scoped>

</style>
