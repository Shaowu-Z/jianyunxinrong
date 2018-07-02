<template>
  <div id="app">
      <header class="mui-bar mui-bar-nav">
		<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
			<span class="mui-icon mui-icon-back"></span>返回
		</button>
		<h1 class="mui-title">推荐给好友</h1>
		<a id="menu" class="mui-icon iconfont icon-more mui-pull-right" @click="popver_more"></a>
	</header>
	<section id="code_card" class="mui-content">
		<div class="mui-card my-codecard">
			<div class="mui-card-header">App下载码</div>
			<div class="mui-card-content">
				<!--<img v-bind:src ="card.imageHost + card.userIcon" class="hpic"  />
				<h4 v-text="card.nickName"></h4>
				<p id="area" v-text="card.areaInfo"></p>-->
				<!-- <div id="code" ref="code"></div> -->
				<div id="code"></div>
				<img id="img-buffer" src="static/images/company_logo.png" style="display:none">
				<!--<img class="cpic" v-bind:src ="card.imageHost + card.qrUrl"/>-->
			</div>
		</div>
		<p class="share" @click="goShare()">点击分享</p>
	</section>
	<!-- 遮罩 -->
	<div class="mask" :class="prover ? 'addmask' : '' "></div>
	<!--右上角弹出菜单-->
	<div id="popover-more" class="mui-popover top-menu" :class="prover ? 'addprover' : '' ">
		<div class="mui-popover-arrow" :class="prover ? 'addpopover_arrow' : '' "></div>
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
// import QRCode from 'qrcodejs2'
import qrcode from '../../../playform/qrcode'
import setting from '../../../playform/config'

// import xyqrcode from '../../../playform//xyqrcode'
export default {
    data(){
        return{
            card:{
				imageHost: "",
				userIcon: "",
				nickName: "未设置",
				areaInfo: "中国",
				qrUrl: "",
			},
			prover:false
        }
	},
	created(){
		var _self=this
		this.$http.post("/user_api/user_code_card").then(function (response) {
			console.log(response)
			var info = response.data.result;
			_self.card = info;
			_self.showQrcode()
			/*var img = document.createElement("img")
			img.setAttribute("class","cpic");
			img.setAttribute("src",_self.$data.card.imageHost + _self.$data.card.qrUrl +"?t=" +new Date().getTime());
			document.getElementById("con").insertBefore(img,document.getElementById("area"))
			console.info(response.data.result);*/
		}).catch(function (error) {
			console.info(error);
		});
			// this.showQrcode()

		console.log("________"+this.$refs.code)
	},
    methods:{
		goShare: function() {
			var url = "http://java.winfreeinfo.com/static/webstatic/mycenter/ext/share_detail.html";
			var logo ="http://java.winfreeinfo.com/static/images/app-logo.jpg";
			appApi.share(-1, "蜘筑侠APP", "工程人员都在用蜘筑侠，项目沟通找人都非常方便，赶紧用起来", url, logo, null);
		},
        goBack(){
			this.$router.go(-1)
			console.log(setting);
		},
		showQrcode(){
			var options={};
			console.log(setting.SUNLINE_SERVER_ADDRESS+"/static/webstatic/mycenter/ext/share_detail.html")
			options.url= setting.SUNLINE_SERVER_ADDRESS+"/static/webstatic/mycenter/ext/share_detail.html"; //二维码的链接
			// options.url= "http://localhost:8080/static/webstatic/mycenter/ext/share_detail.html";
			options.dom="#code";//二维码生成的位置
			options.image=options.image=$('#img-buffer')[0];//图片id
			options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
			// console.log("PPPPPPPP:"+options.url)
			this.xyqrcode(options);

		},
		popver_more(){
			this.prover=!this.prover
			// document.getElementsByClassName("mui-popover")[0].classList.add("addprover")
			// document.getElementsByClassName("mui-popover-arrow")[0].classList.add("addpopover_arrow")
			document.getElementsByClassName("mui-popover-arrow")[0].style.left="auto"
			document.getElementsByClassName("mask")[0].style.display="block"
		},
		xyqrcode(options){
			 var settings = {
				dom:'',
				render: 'canvas',   //生成二维码的格式还有image、div
				ecLevel:"H",
				text:"",
				background:"#ffffff",
				fill:"#333333", //二维码纹路的颜色
				fontcolor:"#ff9818",
				fontname:"Ubuntu",
				image:{},
				label:"",
				mPosX:0.5,   //图片在X轴的位置
				mPosY:0.5,    //图片在X轴的位置
				mSize:0.17,   //图片大小
				minVersion:10,
				mode:4,
				quiet:1,
				radius:1,
				size:250
			};
			console.log(options)
				if (options) {
					$.extend(settings, options);//options对象跟settings比较，相同的就替换，没有的就添加
				}
				if(settings.dom.length==0){
					window.console.log("Error: dom empty!");
					return;
				}
				if(settings.url.length==0){
					window.console.log("Error: url empty!");
					return;
				}
				console.log(settings)
				settings.text=settings.url; //在qrcode生成二维码的地址是text。这里就把url赋值给text
				// document.getElementById(settings.dom)[.qrcode(settings);
				console.log(settings)
				$(settings.dom).qrcode(settings);
		}
    },
    mounted(){
		// this.showQrcode()
    }
}
</script>

<style type="text/css" scoped>
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
		#img-buffer{
			width: 52px;
			height: 52px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -26px;
			margin-top:-30px;
		 }
		.addprover{
			display: block;
			opacity: 1;
			top: 55px;
			right: 5px;
		}
		.addpopover_arrow{
			right: 3px;
		}
		.addmask{
			display: block;
			top: 0;
			left: 0;
			opacity: 0.6;
			z-index: 99
		}
</style>
