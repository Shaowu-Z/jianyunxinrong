<template>
    <div>
        <header class="mui-bar mui-bar-nav">
        <button @click="goBack" id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left ">
			<span class="mui-icon mui-icon-back"></span>返回
		</button>
		<h1 class="mui-title">我的二维码名片</h1>
		<a id="menu" class="mui-icon iconfont icon-more mui-pull-right" href="#popover-more"></a>
	</header>
	<section id="code_card" class="mui-content">
		<div class="mui-card my-codecard"  v-show="shows==1">
			<div class="mui-card-header">二维码名片</div>
			<div class="mui-card-content">
				<img  v-bind:src =" card.userIcon" class="hpic"  />
				<h4 v-text="card.nickName"></h4>
				<p id="area" v-text="card.areaInfo"></p>
				<!--<img id="qrImg" class="cpic" v-bind:src =" card.qrUrl"/>-->
				<div id="code" ></div>
				<img id="img-buffer" src="/static/images/company_logo.png" style="display: none;" >
				<p>扫一扫加我</p>
			</div>
		</div>
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
    </div>
</template>
<script>
import qrcode from '../../../playform/qrcode'
import setting from '../../../playform/config'
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
            isLoad:true,
            shows:0
        }
    },
    created: function () {
		var _self = this;
		this.$http.post("/user_api/user_code_card").then(function (response) {
			console.log(response)
			var info = response.data.result;
            _self.card = info;
            // _self.checkImg()
        // _self.CreateNode()
        _self.showQrcode()
			/*var img = document.createElement("img")
			img.setAttribute("class","cpic");
			img.setAttribute("src",_self.card.imageHost + _self.card.qrUrl +"?t=" +new Date().getTime());
			document.getElementById("con").insertBefore(img,document.getElementById("area"))
			console.info(response.data.result);*/
		}).catch(function (error) {
			console.info(error);
        });
        // _self.checkImg()
        // _self.CreateNode()
        // _self.AppBefore()
        // _self.AppAfter()
    },
    name:"trans2",
	methods: {
        goBack(){
            this.$router.go(-1)
		},
        checkImg:function(){
            var _self=this
            var checkImg = setInterval(function() {
                console.log("check")
                if (_self.isLoad) {
                    clearInterval(checkImg)
                } else {
                    $("#qrImg").setAttribute("src",_self.card.qrUrl)
                    console.log("///",_self.card.qrUrl)
                }
            }, 1000)
        },
        showQrcode:function(){
             var options={};
            options.url="http://java.winfreeinfo.com/static/webstatic/contacts/eg_details.html?userId="+setting.getCookie("userid"); //二维码的链接
            options.dom="#code";//二维码生成的位置
            options.image=$('#img-buffer')[0];//图片id
            options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
            this.xyqrcode(options);
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
        CreateNode:function(str){
            //创建新div
            var NewDiv = document.createElement("div");
            //对div设置 id属性
            NewDiv.id = "dd";
            //创建div内加入的内容
            var NewText = document.createTextNode(str);
            //追加一个新的子结点
            NewDiv.appendChild(NewText);
            //返回新创建结点数据
            return NewDiv;
        },
        // AppBefore:function(nodeId, str){
        //     var _self=this
        //     var node = document.getElementById(nodeId);
        //     var newNode = _self.CreateNode(str);
        //     //如果存在双亲结点
        //     if(node.parentNode)
        //     {
        //         //insertBefore(newchild,refchild)  说明：newchild(插入的新结点) refchild(将新结点插入到此结点前)
        //         node.parentNode.insertBefore(newNode, node);
        //     }
        // },
        // AppAfter:function(nodeId, str){
        //     var node = document.getElementById(nodeId);
        //     var newNode = _self.CreateNode(str);
        //     //如果存在上一级结点
        //     if(node.parentNode)
        //     {
        //         //如果存在下一子结点
        //         if(node.nextSibling)
        //         {
        //             // 在下一子结点前插入子结点
        //             node.parentNode.insertBefore(newNode, node.nextSibling);
        //         }else{
        //             // 如果没有下一子结点向后追加子结点
        //             node.parentNode.appendChild(newNode);
        //         }
        //     }
        // }
    },
    mounted(){
        // var options={};
        // options.url="http://java.winfreeinfo.com/static/webstatic/contacts/eg_details.html?userId="+setting.getCookie("userid"); //二维码的链接
        // options.dom="#code";//二维码生成的位置
        // options.image=$('#img-buffer')[0];//图片id
        // options.render="image";//设置生成的二维码是canvas格式，也有image、div格式
        // this.xyqrcode(options);
        function checkImg(){
            alert(184454)
            var _self=this
            var checkImg = setInterval(function() {
                console.log("check")
                if (isLoad) {
                    clearInterval(checkImg)
                } else {
                    $("#qrImg").setAttribute("src",_self.card.qrUrl)
                    console.log("///",_self.card.qrUrl)
                }
            }, 1000)
        }
        function CreateNode(str){
            //创建新div
            var NewDiv = document.createElement("div");
            //对div设置 id属性
            NewDiv.id = "dd";
            //创建div内加入的内容
            var NewText = document.createTextNode(str);
            //追加一个新的子结点
            NewDiv.appendChild(NewText);
            //返回新创建结点数据
            return NewDiv;
        }
        function AppBefore(nodeId, str){
            var _self=this
            var node = document.getElementById(nodeId);
            var newNode = _self.CreateNode(str);
            //如果存在双亲结点
            if(node.parentNode)
            {
                //insertBefore(newchild,refchild)  说明：newchild(插入的新结点) refchild(将新结点插入到此结点前)
                node.parentNode.insertBefore(newNode, node);
            }
        }
        function AppAfter(nodeId, str){
            var node = document.getElementById(nodeId);
            var newNode = _self.CreateNode(str);
            //如果存在上一级结点
            if(node.parentNode)
            {
                //如果存在下一子结点
                if(node.nextSibling)
                {
                    // 在下一子结点前插入子结点
                    node.parentNode.insertBefore(newNode, node.nextSibling);
                }else{
                    // 如果没有下一子结点向后追加子结点
                    node.parentNode.appendChild(newNode);
                }
            }
        }
    }
}
</script>
<style scoped>
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
        #code{
            height: 256px;
            width: 256px;
            margin: 0 auto;
        }
</style>
