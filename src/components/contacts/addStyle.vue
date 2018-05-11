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
				<button class="mui-btn mui-btn-primary" @click="codeClick">分享口令</button>
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
		</section>
		</div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{
            sites: {},
			type:"",
        }
    },
    methods:{
    goBack(){
        this.$router.go(-1)
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
        this.$http.post("/api/pcontact_api/createinviteinfo", param).then(function(response) {
            if(response.data.code == 0) {
                
                var inviteCodeAndType = response.data.result.inviteCode;
                var ic_t = inviteCodeAndType.split(",");
                var inviteCode = ic_t[0];
                var type = null;
                if(ic_t.length == 2){
                    type = ic_t[1];
                }
                var options={};
//                                options.url=getUrl()+"/q/aw?t="+type+"&c="+ic_t; //二维码的链接
                options.url="/api/static/newwebstatic/ext/app-weixin.html?type="+type+"&inviteCode="+inviteCode
                options.dom="#qrcode";//二维码生成的位置
                options.image=_self.$refs.image;//图片id
                options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
            function qrcode(options) {  
                console.log(1111);
                let qrcode = new QRCode('qrcode', {  
                    width: 100,  
                    height: 100, // 高度  
                    text: "/api/static/newwebstatic/ext/app-weixin.html?type="+type+"&inviteCode="+inviteCode, // 二维码内容
                    image: '',  
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                    // background: '#f0f',  
                    // foreground: '#ff0'  
                })  
                console.log(qrcode,11111111111111111)  
                }
                qrcode();
                console.log(options);
                _self.sites = response.data.result;
                _self.$data.type=_self.$route.query.dataType
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
    //    appApi.share(7, "", "", "", "https://cli.im/api/qrcode/code?text=https://www.baidu.com");
    }
    },
    created(){
        this.initData();
    },
}
</script>

<style>
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
