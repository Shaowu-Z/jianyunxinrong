<template>
  <div id="app">
		<header class="mui-bar mui-bar-nav">
			<button class="mui-action-back mui-btn mui-btn-link mui-pull-left" @click="goBack"><span class="mui-icon iconfont icon-back"></span>返回</button>
			<div>
				<h1 class="mui-title">{{this.type === 1 ? '添加办公室成员':'添加项目成员'}}</h1>
			</div>
		</header>
		<section class="mui-content">
			<div class="add-style add-kouling">
				<div class="title">口令邀请</div>
				<p class="sub-title">点击复制口令发送给被邀请人</p>
				<div style="display: none;"></div>
				<button class="mui-btn mui-btn-primary"   @click="popupstatus='block'">分享口令</button>
			</div>
			<div class="add-style add-code">
				<div class="title">二维码邀请</div>
				<p class="sub-title">打开建云信融，扫一扫加入项目办公室</p>
				<div class="cpic" id="qrcode"></div>
				<img id="img-buffer" src="../../assets/images/company_logo.png" style="display: none;" ref="images">
				<p class="title mui-text-center"></p>
				<p class="sub-title mui-text-center"></p>
				<div class="btn-box">
					<button class="mui-btn mui-btn-block mui-btn-primary" @click="qrcodeShare">分享二维码</button>
				</div>
			</div>
            <!--遮罩层-->
			<div class="mui-backdrop"  :style="{display : popupstatus}" style="display: none; z-index: 999;" @click="popupstatus='none'"></div>

			<!--口令张贴弹框-->
			<div class="mui-popup popup-pure mui-popup-in pup-sure" :style="{display : popupstatus}"  style="display: none">
				<div class="mui-popup-content">
					<div class="password-contain">
						<div class="p-title">已为您生成邀请口令</div>
						<div class="p-con" v-text="codeinfo"></div>
					</div>
				</div>
				<div class="mui-popup-btn no-sppd border">
					<div class="mui-table v-line">
						<div class="mui-table-cell"><button class="mui-btn mui-btn-link mui-btn-gray" @click="popupstatus='none'">不分享了</button></div>
						<div class="mui-table-cell"><button class="mui-btn mui-btn-link" @click="codeClick">去粘贴</button></div>
					</div>
				</div>
			</div>
		</section>
		</div>
</template>

<script>
// import QRCode from 'qrcodejs2'
// import xyqrcode from '../../playform/xyqrcode'
import qrcode from '../../playform/qrcode'
import setting from '../../playform/config'
export default {
    data(){
        return{
            sites: {},
            type:"",
            popupstatus: "none",
            codeinfo: ''
        }
    },
    methods:{
    goBack(){
        this.$router.go(-1)
    },
    xyqrcode(options){
            var _self=this
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
                _self.shows=1
				$(settings.dom).qrcode(settings);
		},
    initData() {
        //获取数据
        this.type = this.$route.query.dataType;
        var _self = this;
        if(this.$route.query.dataType==1 && !this.$route.query.roomId  &&  !this.$route.query.isRoomId){
            alert("房间id为空，不能生成邀请码");
            return;
        }else if(this.$route.query.dataType==2 && (!this.$route.query.projectSn || this.$route.query.projectSn=="null" || this.$route.query.projectSn=="NULL")){
            alert("项目id为空，不能生成邀请码");
            return;
        }

        var param = new FormData()
        if(this.$route.query.place && this.$route.query.place==1){
            param.append("roomId", this.$route.query.isRoomId ? this.$route.query.isRoomId : '');
        }else {
            param.append("roomId", this.$route.query.roomId ? this.$route.query.roomId : '');
        }

        param.append("type", this.$route.query.dataType)
        param.append("projectSn",  this.$route.query.projectSn ? this.$route.query.projectSn : "")
        param.append("memberType",'2')
//                      var par = new FormData()
//                      par.append("roomId", paramMap.roomId ? paramMap.roomId : '0');
//                      if(paramMap.roomId!=null){
//                      	alert("精准")
//	                        axios.post(getUrl()+"pcontact_api/getroominfo", par).then(function(response) {
//								if(response.data.code == 0) {
//									alert(response.data.result.projectSn)
//									
//	//								alert(response.data.result.inviteQrcode)
//								} else {
//									//							msg("获取云盘目录信息失败")
//								}
//							})
//                      }
        this.$http.post("/pcontact_api/createinviteinfo", param).then(function(response) {
            if(response.data.code == 0) {
                
                var inviteCodeAndType = response.data.result.inviteCode;
                var ic_t = inviteCodeAndType.split(",");
                var inviteCode = ic_t[0];
                var type = null;
                if(ic_t.length == 2){
                    type = ic_t[1];
                }
                var options={};
                _self.sites.projectName=response.data.result.projectName
//                                options.url=getUrl()+"/q/aw?t="+type+"&c="+ic_t; //二维码的链接
                options.url="http://java.winfreeinfo.com/static/newwebstatic/ext/app-weixin.html?type="+type+"&inviteCode="+inviteCode
                options.dom="#qrcode";//二维码生成的位置
                options.image=$('#img-buffer')[0];//图片id
                options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
                _self.codeinfo = "#快来加入“建云项目协作群”，协作最方便#复制此信息，打开“建云信融”app即可加入"+_self.sites.projectName+"项目！" + inviteCode;
                console.log(options.image);
                _self.xyqrcode(options);
                _self.sites = response.data.result;
                _self.type=_self.$route.query.dataType
//								alert(response.data.result.inviteQrcode)
            } else {
                //							msg("获取云盘目录信息失败")
                alert(response.data.message);
            }
        }).catch(function(error){
            console.info(error)
        })
    },
    codeClick() {
        appApi.share(6, "", "#快来加入“建云项目协作群”，协作最方便#复制此信息，打开“建云信融”app即可加入"+this.sites.projectName+"项目！" + this.sites.inviteCode);
    },
    qrcodeShare () {
        var url = "http://java.winfreeinfo.com/static/webstatic/mycenter/ext/share_detail.html";
        var logo = "http://java.winfreeinfo.com/static/images/app-logo.jpg";
        var title = "";
        // 邀请加入办公室
        if(app.type == 1){
            title = this.sites.title1+"邀请您加入"+this.sites.projectName+"办公室";
        // 邀请加入项目组
        }else{
            title = this.sites.currRoomName+"公司("+this.sites.currRoomClassName+")邀请您加入"+this.sites.projectName;
        }
        appApi.share(-1, title, "工程人员都在用建云信融，项目沟通找人都非常方便，赶紧用起来", url, logo, null);
    //    appApi.share(7, "", "", "", "https://cli.im/qrcode/code?text=https://www.baidu.com");
    }
    },
    created(){
        appApi.hideMenu()
        this.initData();
    },
}
</script>

<style scoped>
    body,
    .mui-content {
        background: #fff;
    }
    .add-code .cpic{
        height: 236px;
        width: 236px;
        border:1px dashed #f0ad4e;
    }
    .add-code .cpic img{
        width: 100%;
    }
    .title{
        text-align: left
    }
    .sub-title{
        text-align: left
    }
</style>
