<template>
  <div id="app" v-show="sharetrue">
      <header class="mui-bar mui-bar-nav">
		<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
			<span class="mui-icon mui-icon-back"></span>返回
		</button>
		<h1 class="mui-title">推荐给好友</h1>
		<a id="menu" class="mui-icon iconfont icon-more mui-pull-right" href="#popover-more"></a>
	</header>
	<section id="code_card" class="mui-content">
		<div class="mui-card my-codecard">
			<div class="mui-card-header">App下载码</div>
			<div class="mui-card-content">
				<!--<img v-bind:src ="card.imageHost + card.userIcon" class="hpic"  />
				<h4 v-text="card.nickName"></h4>
				<p id="area" v-text="card.areaInfo"></p>-->
				<div id="code"></div>
				<img id="img-buffer" src="../../../assets/images/company_logo.png">
				<!--<img class="cpic" v-bind:src ="card.imageHost + card.qrUrl"/>-->
			</div>
		</div>
		<p class="share" onclick="mycenter.goShare()">点击分享</p>
	</section>
	<!--右上角弹出菜单-->
	<div id="popover-more" class="mui-popover top-menu">
		<div class="mui-popover-arrow"></div>
		<ul class="mui-table-view">
			<!--<li class="mui-table-view-cell">保存到手机</li>
			<li class="mui-table-view-cell" >分享</li>-->
			<li class="mui-table-view-cell" onclick="appApi.sweepQrCode()">扫描二维码</li>
		</ul>
	</div>
	<!--右上角弹出菜单-->
  </div>
</template>

<script>
export default {
    props:['sharetrue'],
    data(){
        return{
            
        }
    },
    methods:{
        goBack(){
            this.sharetrue = !this.sharetrue
        }
    },
    mounted(){
    }
}
</script>

<style>
    #app{
        background: #efeff4;
        width:100%;
        height:100%;
        position: absolute;
        top: 0;
        z-index: 999
    }
    .mui-backdrop{z-index: 8;}
		.share{
			width: 90%;
			height: 50px;
			line-height: 50px;
			background: #4ba9e9;
			margin: 0 auto;
			margin-bottom: 0;
			margin-top: 56px;
			color:#fff;
			text-align: center;
			font-size: 16px;
		}
</style>
