<template>
  <div>
    <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">我的项目</h1>
	</header>

  <section class="mui-content" id="app" >
		<div class="module01">
			<div class="module-body sppd-content add-manager">
				<div class="oa-contact-cell mui-table">
					<div class="oa-contact-avatar mui-table-cell">
						<!-- <img src="../../../static/images/ico_plus.gif" /> -->
					</div>
					<div @click="goShare()" class="oa-contact-content mui-table-cell">
						<h4 class="oa-contact-name">邀请工长登记新项目</h4>
					</div>
				</div>
			</div>
		</div>
		<ul class="mui-table-view group-list">
      <!-- {{projectList}} -->
        <li  v-for="(item,index) in projectList" :key="index" class="mui-table-view-cell"  @click="selectProject(item)" >
					<div   class="oa-contact-cell mui-table">
						<div class="oa-contact-avatar mui-table-cell">
              <img v-if="item.img_url!=undefined && item.img_url!='undefined'" v-bind:src="item.img_url">
              <img v-if="item.img_url==undefined || item.img_url=='undefined'" v-bind:src="imgbase">
						</div>
						<div class="oa-contact-content mui-table-cell">
							<h4 class="oa-contact-name" ><span v-text="item.projectName"></span></h4>
							<p class="oa-contact-email"><span v-text="item.nickName"></span>&nbsp;&nbsp;<span></span></p>
							<p class="oa-contact-email mui-ellipsis" v-text="item.place"></p>
							<p class="oa-contact-email mui-ellipsis" v-if="item.gps!=null && item.gps!=''" >距离上次上工地址&nbsp;&nbsp;<span v-text="item.gps"></span></p>
						</div>
					</div>  
            <span  :class="item.type==0 ? 'disabled' : 'signing'"  @click.stop="existProjects(item)"></span>
        </li>
		</ul>
		<p id="noproject" style="display: none" class="mui-content-padded content-added transparent">我的项目不在列表里？&nbsp;&nbsp;<a @click="goShare()">立即邀请</a>工长登记项目</p>
	</section>
  </div>
</template>
<script>
import project_sign from  "./project_sign.js"
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
      existProjects:function(item){
        project_sign.existProject(item)
      },
      selectProject:function(item){
        project_sign.selectProject(item)
      }
    },
    mounted(){

    }
}
</script>
<style>
  .oa-contact-email{
    text-align: left;
  }
  .group-list .signing {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 40px;
    height: 40px;
    background: url(../../../static/images/label-signing.png);
    background-size: 100%;
}
 .group-list .disabled{
   position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 40px;
    height: 40px; 
   background: url(../../../static/images/label-unsign.png);
   background-size: 100%;
 }
.oa-contact-cell, {
    position: relative;
    margin: -11px 0;
}
</style>
