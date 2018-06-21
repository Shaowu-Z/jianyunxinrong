    <template>
        <div>

       <header class="mui-bar mui-bar-nav">

	<h1  class="mui-title">上工打卡</h1>
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
</header>

   <section class="mui-content">

	<div class="module01">
		<div class="module01-body">
			<div id="warning" style="display:none;">

			<p class="tip-warning"><span class="mui-icon iconfont icon-warning"></span>
				<span class="con">您的位置与上次打卡的位置相距较远,请确认是这个工地</span>
			</p>
			<!--<p >-->
				<!--<span >立即切换到最近的项目</span>-->
			<!--</p>-->
			</div>
			<ul class="mui-table-view group-list " @click="project_sign.openProjectList()">
				<li class="mui-table-view-cell">
					<!--<a class="mui-navigate-right">-->
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<!-- <img v-if="form.img_url!=undefined && form.img_url!='undefined'" v-bind:src=form.img_url> -->
								<img :src="imgbase"/>
								<!-- <img v-if="form.img_url==undefined || form.img_url=='undefined'" src="../../images/defualt.png"> -->
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name" v-text="form.projectName"></h4>
								<p class="oa-contact-email"><span v-text="form.confirmName"></span>&nbsp;&nbsp;<span v-text="form.confirmPhone"></span></p>
								<p class="oa-contact-email mui-ellipsis" v-text="form.clockAddress"></p>
							</div>
						</div>
					<!--</a>-->
					<span class="mui-btn mui-btn-link">切换项目></span>
				</li>

			</ul>
		</div>
	</div>
	<p class="item-deal" id="remind" style="display: block">
		<a class="item" @click="delayRemind('hour')" >未到工地<span class="mui-icon mui-icon-arrowright"></span></a>
		<a class="item" @click="delayRemind('day')">今日不上工<span class="mui-icon mui-icon-arrowright"></span></a>
	</p>
	<div class="sign-btn">
			<span @click="project_sign.sign();" class="title">
				<span class="mui-icon mui-icon-camera"></span>
				<span class="txt">点击打卡</span>
			</span>
		<input style="display: none" id="imgFile" name="file" type="file" accept="image/jpeg,image/x-png" capture="camera" value="" class="a-upload"   v-on:change="project_sign.confirmFile();"/>
	</div>
		<div class="xunafu">
		<div class="location-gps"><span class="mui-icon iconfont icon-location"></span>
		<span v-text="longaddress"></span>
		<span v-text="shortAddress"></span>
			<!--500m以内-->
		<p v-if="rangegps!=null && rangegps!='' && rangegpsStatus!=1"><span  class="statue success"></span><span>距离上次上工地址</span>&nbsp;&nbsp;<span v-text="rangegps"></span></p>
			<!--超出500m-->
		<p v-if="rangegps!=null && rangegps!='' && rangegpsStatus==1"><span  class="statue waiting"></span><span>距离上次上工地址</span>&nbsp;&nbsp;<span v-text="rangegps"></span></p>
		</div>
		<h5 class="mui-content-padded">今日打卡</h5>
		</div>
		<ul class="mui-table-view mui-table-view-striped sign-view">
			<li v-for="(item,index) in data.todayList" :key="index" class="mui-table-view-cell">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-avatar mui-table-cell sign-img">
						<img @click="openImg(0,data.photoList)" class="" v-bind:src="item.photoAddress" />
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name sign-time" v-text="item.title"></h4>
						<p class="oa-contact-email" v-text="item.gpsAddress"></p>
					</div>
				</div>
			</li>
			<li id="todayWarning" class="mui-table-view-cell no-record" style="display: none;">
				<span class="mui-icon iconfont icon-record"></span><span>没有打卡记录</span>
			</li>
		</ul>

		<h5 class="mui-content-padded">昨日打卡</h5>
		<ul class="mui-table-view mui-table-view-striped sign-view">
			<li  v-for="(item,index) in data.lastDayList" :key="index" class="mui-table-view-cell">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-avatar mui-table-cell sign-img">
						<img @click="openImg(0,data.photoList)" class="" v-bind:src="item.photoAddress" />
					</div>
					<div class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name sign-time" v-text="item.title"></h4>
						<p class="oa-contact-email" v-text="item.gpsAddress"></p>
					</div>
				</div>
			</li>
			<li id="lastdayWarning" class="mui-table-view-cell no-record" style="display: none;">
				<span class="mui-icon iconfont icon-record"></span><span>没有打卡记录</span>
			</li>

		</ul>


</section>

        </div>

    </template>

<script>

import project_sign from  "./js/project_sign.js"
import {disposeLogImg,disposeLogImgMutil} from '../../playform/common.js' 
export default {
    data(){
        return {
			imgbase:"../../../static/images/defualt.png",
            project_sign:project_sign,
            form:{
            id:"",
            userId:"",
            userName:"",
            gpsAddress:"",//gps当前位置
            gpsLl:"",//gps当前坐标
            projectSN:"",
            projectName:"",
            confirmPhone:"",
            confirmId:"",
            confirmName:"",
            projectNameDetail:"",
            projectSNDetail:"",
            dateStr:"",
            clockAddress:"",//项目地址
            clockLl:"",//项目坐标
            img_url:"",//项目图片
            remindTime:"",//提醒期限
            remindName:"",//提醒期限
            
        },
        reqWorkParamsVO:{
            userId:"",
            confirmId:"",
            queryTime:"",
            queryType:"",
            loginType:"",
        },
        data:{
            todayList:[],
            lastDayList:[],
            dayList:[],
            timeList:[],
            photoList:[],

        },
        longaddress:"",//长地址
        shortAddress:"",//短地址
        latitudeAndLongitude:"",//坐标
        rangegps:"",//距离上次打卡坐标位置
        rangegpsStatus:"",//距离上次打卡坐标位置
        select_time:"",
        select_time_name:"",
        projectList:[],
        nearRecord:false,
        nearZuobiao:"",//最近打卡记录的坐标
        nearAddress:"",//最近打卡记录的地址
        nearclockDate:"",//最近打卡记录的日期
        }
    },
    created:function(){
	 project_sign._self=this;
     project_sign.initVue()
	 project_sign.initData()

	
     
       
    },
     methods:{
        goback(){
            this.$router.go(-1);
		},
		openImg:function(index,ary){
			console.log("ary",ary)
			
			disposeLogImgMutil(index,ary);
		},
      
    },
    mounted(){
			
    }
}
</script>

<style>
		.mui-fullscreen {/*大图遮罩*/
			position: fixed;
			z-index: 20;
			background-color: #000;
		}
		.project{
			position: relative;
			padding: 5px;
		}

		.pop-content.select-box{
			height: 150px;
			padding:10px 0;
			overflow-x: hidden;
			position: relative;
		}
		.item-deal{padding:0 15px;overflow: hidden;margin-bottom:0;}
		.item-deal .item{color:#0553A7;}
		.item-deal .item + .item{margin-left:5px;}
		.item-deal .mui-icon-arrowright{font-size:18px;}
		.sign-btn{position: relative;}
		.sign-btn-con{
			display:block;
			width: 100%;
			text-align: center;
			position: absolute;
			left: 0;
			top: 50%;
			-webkit-transform: translateY(-50%);
			transform: translateY(-50%);
		}
		.sign-btn-con .txt{
			font-size: 17px;
			color:#fff;
		}
		.oa-contact-email,.item-deal,.location-gps,.mui-content-padded{
			text-align: left
		}
		.sign-btn{
			padding: 0
		}
		
		.statue{
			width:15px;
			height:15px;
		}
		.statue.success{
			background-position:0 -66px
		}
		.statue.waiting{
			background-position:0 -170px
		}
		.location-gps p span{display:inline-block;vertical-align:middle;}
		
	</style>


