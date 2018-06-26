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
            allLoaded:false
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
    }
}
</script>

<style scoped>

</style>
