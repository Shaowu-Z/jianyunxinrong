<template>
    <div id="app">
        <h4>测试</h4>
        <mt-button type="default">default</mt-button>
        <mt-button type="primary">primary</mt-button>
        <mt-button type="danger">danger</mt-button>
        <mt-button @click.native="handleClick" :disabled='disabled'>点击触发 handleClick</mt-button>
    </div>
</template>

<script>
import { DatetimePicker,Button } from 'mint-ui';
export default {
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>

<style>

</style>
