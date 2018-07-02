<template>
  <div>

<header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
	<h1 class="mui-title">设置工资标准</h1>
</header>

<div class=" fixed-bottom">
		<div class="mui-table mui-text-center" @click="saveData()">
			<div class="mui-table-cell"><button class="mui-btn mui-btn-primary">确定</button></div>
		</div>
	</div>
  	<section class="mui-content">
		<ul class="mui-table-view eg-table-view">

		<li class="mui-table-view-cell mui-input-row" >
				<a class="mui-navigate-right">
				<label>上班标准<small>*</small></label>
				<input type="text" name="workHourName"  readonly="readonly" placeholder="请输入(必填)" v-model="form.workHourName" @click.stop="databot(1)"/>
        <mt-popup v-model="work_popupVisible" position="bottom" class="picker-slot-center">
          <mt-picker value-key="text" :slots="slots" :showToolbar='true' :defaultIndex="1"  @change="onValuesChange" >
            <mt-button  size="small" @click.native="cancalClick">取消</mt-button>
            <mt-button type="primary" size="small" @click.native="handleClick(1)">确定</mt-button>
          </mt-picker>
          </mt-popup>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row" >
				<a class="mui-navigate-right">
				<label>加班标准<small>*</small></label>
				<input type="text" name="overHourName" value="" readonly="readonly" placeholder="请输入(必填)" v-model="form.overHourName" @click.stop="databot(2)"/>
          <mt-popup v-model="over_popupVisible" position="bottom" class="picker-slot-center">
          <mt-picker value-key="text" :slots="slots" :showToolbar='true' :defaultIndex="1"  @change="onValuesChange" >
            <mt-button  size="small" @click.native="cancalClick">取消</mt-button>
            <mt-button type="primary" size="small" @click.native="handleClick(2)">确定</mt-button>
          </mt-picker>
          </mt-popup>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="openGongZhongList">
				<a class="mui-navigate-right">
				<label>工种<small>*</small></label>
				<input type="text"  name="gongzhongName" value="" readonly="readonly" placeholder="请输入(必填)" v-model="form.gongzhongName"/>
				</a>
			</li>
				<li class="mui-table-view-cell mui-input-row">
				<label>工资标准<small>*</small></label>
				<input type="number" name="money" value="" placeholder="请输入(必填)" v-model="form.money"/>
			</li>
		</ul>

	</section>





  </div>
</template>

<script>
import laowu_common from "./js/laowu_common.js";
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Button } from 'mint-ui';
var app=null
export default {
  data() {
    return {

      form: {
        workHour: "", //正常上班几个时长算一个工(ID)
        workHourName: "", //正常上班几个时长算一个工(名称)
        overHour: "", //加班几个时长算一个工(ID)
        overHourName: "", //加班几个时长算一个工(名称)
        money: "", //每日工资(ID)
        moneyName: "", //每日工资(名称)
        gongzhongId: "",
        gongzhongName: "",
        userId: "",

      },
      data: {
        timeList: []
      },
      pickervalues:'',
      timeType:"",
      work_popupVisible:false,
      over_popupVisible:false,
      slots:[]
    };
  },

  created: function() {
    //vue实例完成后调用的方法，有点类似与jq中的$(function(){})
    var _self = this;
    app=this;
    laowu_common.initVue(_self)
    var paramMap=laowu_common.paramMap;
    var time_name=laowu_common.time_name;
    var money = paramMap.datePrice;
    var workHour = paramMap.workNormalHour;
    var workHourName = workHour + time_name;
    var overHour = paramMap.overNormalHour;
    var overHourName = overHour + time_name;
    var gongzhongId = paramMap.gongzhongId;
    var gongzhongName = paramMap.gongzhongName;
    var userId = paramMap.userId;
    var type = paramMap.type;

    //初始化数据
    _self.form.workHour = workHour;
    if (workHour) {
      _self.form.workHourName = workHourName;
    }
    _self.form.overHour = overHour;
    if (overHour) {
      _self.form.overHourName = overHourName;
    }
    _self.form.money = money;
    _self.form.gongzhongId = gongzhongId;
    _self.form.gongzhongName = gongzhongName;
    _self.form.userId = userId;

    //初始化时间列表
    _self.showTimeLists();
  },
  methods: {
    cancalClick:function(){//取消
        this.work_popupVisible=false
        this.over_popupVisible=false
    },
    handleClick:function(type){//确定

    console.log(this.pickervalues)
        if(this.pickervalues){
         if(this.timeType==1){
          this.form.workHourName=this.pickervalues.value+laowu_common.time_name;
          this.form.workHour=this.pickervalues.value;
          }else if(this.timeType==2){
          this.form.overHourName=this.pickervalues.value+laowu_common.time_name;
          this.form.overHour=this.pickervalues.value;
          }

        }else{
          if(this.timeType==1){
            this.form.workHourName=this.data.timeList[0].value+laowu_common.time_name;
            this.form.workHour=this.data.timeList[0].value;
          }else{
            this.form.overHourName=this.data.timeList[0].value+laowu_common.time_name;
            this.form.overHour=this.data.timeList[0].value;
          }
        }
        this.work_popupVisible=false
        this.over_popupVisible=false

    },
    databot:function(type){
      if(type==1){
        this.work_popupVisible=true
        this.over_popupVisible=false
      }else{
        this.over_popupVisible=true
        this.work_popupVisible=false
      }

      this.timeType=type;
      this.selectTime(type)
    },
     onValuesChange(picker, values) {

      // if(values.length>0){
        this.pickervalues=values[0];
      // }

    },

      showTimeLists:function () {//加载时间列表
                var _self=this;
                var obj=new Object();
                obj.type=1;
                _self.$http.post("/project_work_api/find_base_cfg",obj).then(function (response) {
                    if(response.data.code==200){
                        var result=response.data.result;
                        var values=[];
                        if(result.length>0){
                            for (var i=0;i<result.length;i++){
                                var obj=new Object();
                                obj.text=result[i].baseName;
                                obj.value=result[i].baseId;
                                if(result[i].baseId!=0){
                                    values.push(obj);

                                }

                            }
                             _self.data.timeList=values;
                             var solts=new Object();
                             solts.values=values;
                             solts.defaultIndex=0
                             solts.value=values[0].text,
                             solts.valueKey=values[0].value,
                            _self.slots.push(solts)
                        }

                    }else {
                        msg("未查询到时间列表!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });

            },
             selectTime:function (type) {//选择时间列表
                var _self=this;
                var selectindex=0;//显示时间的下标
                var select_time=0;//当前时间值
                if(type==1){
                    select_time=_self.form.workHour;
                }else if(type==2){
                    select_time=_self.form.overHour;
                }

                //获取当前时间选中的下标
                if(_self.$data.data.timeList.length>0 && select_time){
                    for(var i=0;i<_self.$data.data.timeList.length;i++){
                        if(_self.$data.data.timeList[i].value==select_time){
                           selectindex=i;
                           break;
                        }
                    }
                }
                 _self.slots[0].defaultIndex=selectindex;

            },
            saveData:function() {/*返回到记工页面*/
                var _self = this;
                var form = _self.form;
                if(!_self.form.workHour){
                    alert('上班标准不能为空');
                    return;
                }
                if(!_self.form.overHour){
                    alert('加班标准不能为空');
                    return;
                }
                if(!_self.form.gongzhongName){
                    alert('工种不能为空');
                    return;
                }
                if(!_self.form.money){
                    alert('工资标准不能为空');
                    return;
                }
                if(!laowu_common.checkMoney(_self.form.money)){//金额格式校验
                    return;
                }
                setTimeout(function(){
                    var obj=new Object();
                    obj.datePrice=_self.form.money;
                    obj.workNormalHour=_self.form.workHour;
                    obj.overNormalHour=_self.form.overHour;
                    obj.gongzhongId=_self.form.gongzhongId;
                    obj.gongzhongName=_self.form.gongzhongName;
                    if(laowu_common.type==1){
                        appApi.broadcast("setNormalData("+JSON.stringify(obj)+")");//返回上一页并设置标准工资页面
                    }else {
                         obj.userId=_self.form.userId;
                        appApi.broadcast("setNormalmultiData("+JSON.stringify(obj)+")");//返回上一页并设置标准工资页面
                    }
                    appApi.closeNewWindow();

                },100);
            },
        openGongZhongList: function() {
          var url = "/static/webstatic/new_laowu/gongzhong_list.html";
          appApi.openNewWindow(url);
        },

  }
};

    window.setGongZhong=function(data) {
        app.form.gongzhongId=data.gongzhongId;
        app.form.gongzhongName=data.gongzhongName;

        }
</script>

<style type="text/css" scoped>
  @import "../../assets/css/common/mint";
  .picker-slot-center{
    width: 100%;
  }
  .mint-popup .mint-button .mint-button-text{
    width: 100%;
    padding: 0;
  }
  .mint-popup .mint-button{
    margin: 6px;
  }
  .mint-popup .mint-button:nth-child(1){
    float: left;
    left: 6px;
  }
  .mint-popup .mint-button:nth-child(2){
    float: right;
  }
  .picker-center-highlight:before{
    background-color: #aaa
  }
  .picker-center-highlight:after{
    background-color: #aaa
  }
  .picker{
    clear: both;
  }
  .picker-items{
   width: 100%;
   background-color: #ddd;
  }
  .picker-toolbar {
    height: 45px;
     background-color: #eee;
  }
</style>

