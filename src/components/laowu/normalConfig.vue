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
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				<!-- <input type="text" name="workHourName" value="" readonly="readonly" placeholder="请输入(必填)" v-model="form.workHourName"/> -->
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="selectTime(2)">
				<a class="mui-navigate-right">
				<label>加班标准<small>*</small></label>
				<input type="text" name="overHourName" value="" readonly="readonly" placeholder="请输入(必填)" v-model="form.overHourName"/>
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
import laowu_common from "./laowu_common.js";
import { Picker } from 'mint-ui';
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
        userId: ""
      },
      data: {
        timeList: []
      },
         slots:[{values: ['年假', '事假', '病假', '婚假', '其他']}]  
    };
  },
  created: function() {
    //vue实例完成后调用的方法，有点类似与jq中的$(function(){})
    var _self = this;
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
     onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
      showTimeLists:function () {//加载时间列表
                var _self=this;
                var obj=new Object();
                obj.type=1;
                _self.$http.post("/project_work_api/find_base_cfg",obj).then(function (response) {
                    if(response.data.code==200){
                        var result=response.data.result;
                        if(result.length>0){
                            for (var i=0;i<result.length;i++){
                                var obj=new Object();
                                obj.text=result[i].baseName;
                                obj.value=result[i].baseId;
                                if(result[i].baseId!=0){
                                    _self.$data.data.timeList.push(obj);
                                }

                            }
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
                var index=0;//显示时间的下标
                var select_time=0;//当前时间值
                if(type==1){
                    select_time=_self.form.workHour;
                }else if(type==2){
                    select_time=_self.form.overHour;
                }
                //获取当前时间选中的下标
                var picker = new mui.PopPicker();
                if(_self.$data.data.timeList.length>0){
                    for(var i=0;i<_self.$data.data.timeList.length;i++){
                        if(_self.$data.data.timeList[i].value==select_time){
                           index=i;
                           break;
                        }
                    }
                }

                picker.pickers[0].setSelectedIndex(index);//设置默认值得下标和内容。
                picker.setData(_self.$data.data.timeList);
                picker.show(function (selectItems) {
                    if (type==1){
                        _self.form.workHourName=selectItems[0].value+time_name;
                        _self.form.workHour=selectItems[0].value;
                    }else if (type==2){
                        _self.form.overHourName=selectItems[0].value+time_name;
                        _self.form.overHour=selectItems[0].value;
                    }


                })

            },
            saveData:function() {/*返回到记工页面*/
                var _self = this;
                var form = _self.form;
                if(!_self.form.workHour){
                    _self.popup('上班标准不能为空');
                    return;
                }
                if(!_self.form.overHour){
                    _self.popup('加班标准不能为空');
                    return;
                }
                if(!_self.form.gongzhongName){
                    _self.popup('工种不能为空');
                    return;
                }
                if(!_self.form.money){
                    _self.popup('工资标准不能为空');
                    return;
                }
                if(!checkMoney(_self.form.money)){//金额格式校验
                    return;
                }
                setTimeout(function(){
                    var obj=new Object();
                    obj.datePrice=app.form.money;
                    obj.workNormalHour=app.form.workHour;
                    obj.overNormalHour=app.form.overHour;
                    obj.gongzhongId=app.form.gongzhongId;
                    obj.gongzhongName=app.form.gongzhongName;
                    if(type==1){
                        appApi.broadcast("setNormalData("+JSON.stringify(obj)+")");//返回上一页并设置标准工资页面
                    }else {
                         obj.userId=app.form.userId;
                        appApi.broadcast("setNormalmultiData("+JSON.stringify(obj)+")");//返回上一页并设置标准工资页面
                    }
                    appApi.closeNewWindow();

                },100);
            },
        openGongZhongList: function() {
          location.href = "/static/webstatic/new_laowu/gongzhong_list.html";
        },
         setGongZhong:function(data) {
        app.form.gongzhongId=data.gongzhongId;
        app.form.gongzhongName=data.gongzhongName;

        }
  }
};
</script>
