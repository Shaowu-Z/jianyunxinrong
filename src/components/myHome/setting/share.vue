<template>
  <div id="app">
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
				<div id="code" ref="code"></div>
				<img id="img-buffer" ref="buffer" src="../../../assets/images/company_logo.png">
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
import setting from '../../../playform/config'
import xyqrcode from '../../../playform//xyqrcode'
export default {
    data(){
        return{
            card:{
				imageHost: "",
				userIcon: "",
				nickName: "未设置",
				areaInfo: "中国",
				qrUrl: ""
			}
        }
	},
	created(){
		var _self=this
		this.$http.post("/api/user_api/user_code_card").then(function (response) {
			console.log(response)
			var info = response.data.result;
			_self.card = info;
			/*var img = document.createElement("img")
			img.setAttribute("class","cpic");
			img.setAttribute("src",_self.$data.card.imageHost + _self.$data.card.qrUrl +"?t=" +new Date().getTime());
			document.getElementById("con").insertBefore(img,document.getElementById("area"))
			console.info(response.data.result);*/
		}).catch(function (error) {
			console.info(error);
		});
			this.showQrcode()
		
		console.log("________"+this.$refs.code)
	},
    methods:{
        goBack(){
			// this.$router.go(-1)
			console.log(setting);
		},
		showQrcode(){
			var options={};
			options.url= setting.HAOSI_SERVER_ADDRESS+"/static/webstatic/mycenter/ext/share_detail.html"; //二维码的链接
			// options.url= "http://localhost:8080/static/webstatic/mycenter/ext/share_detail.html";
			options.dom="#code";//二维码生成的位置
			options.image=document.getElementById("img-buffer");//图片id
			options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
			// console.log("PPPPPPPP:"+options.url)
			xyqrcode(options);
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
	img{
		width: 100%;
		height: 100%;
	}
</style>
