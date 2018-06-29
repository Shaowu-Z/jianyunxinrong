<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
        </header>
        <div id="videoinfo" class="video_content">
            <video id="my_video_1" class="video-js vjs-default-skin video_info " autoplay="false" controls preload="auto" poster="" data-setup="{}" data-aa="2" :src="src">
            </video>
        </div>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data () {
        return {
            src:''
        }
    },
    created(){
        var map = getParam(window.location.href);
        if(map.url==null||map.url==""){
            this.src=BackCookie.getCookie("videoUrl");
        }else{
            this.src=map.url;
        }
    }
}
</script>

<style scopde>
    .video_content {
			position: fixed;
			z-index: 9999;
			width: 100%;
			height: 100%;
			background-color: #000;
		}
		.video_info {
			width: 100%;
			height: auto;
			position:absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			margin:auto

		}
</style>
