<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>
            </button>
            <h1 class="mui-title">登记项目</h1>
        </header>
        <section class="mui-content mycenter-content">
            <ul class="mui-table-view eg-table-view">
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">工程全称</label>
                    <input type="text" name="ProjectName" v-model="form.projectName" value="" placeholder="必填"/>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">工程简称</label>
                    <input type="text" name="ProjectNameShort" v-model="form.projectNameShort" maxlength="10" value="" placeholder="必填"/>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <a class="mui-navigate-right" >
                        <label class="text">工程类别</label>
                        <input type="text" name="leibie" v-model="form.leibie" value="" placeholder="请选择" readonly="readonly" @click.stop="selectProject(1)"/>
                        <mt-popup v-model="one_popupVisible" position="bottom" class="picker-slot-center">
                            <mt-picker value-key="value" :slots="slots" :showToolbar='true' :defaultIndex="1" @change="onValuesChange">
                                <mt-button  size="small" @click.native="cancalClick">取消</mt-button>
                                <mt-button type="primary" size="small" @click.native="handleClick(1)">确定</mt-button>
                            </mt-picker>
                        </mt-popup>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-input-row" @click="selectCity()">
                        <area-Bar :title="City"></area-Bar>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">工程地点</label>
                    <input type="text" name="PlaceShenbao" v-model="form.placeShenbao" value="" @click="choicePlace()" placeholder="必填" readonly="readonly" />
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <a class="mui-navigate-right" >
                        <label class="text">我所在方性质</label>
                        <input type="text" value="" name="gongChengFangName" v-model="form.gongChengFangName" placeholder="请选择" readonly="readonly" @click.stop="selectProject(2)"/>
                        <mt-popup v-model="tow_popupVisible" position="bottom" class="picker-slot-center col-xs-6 mui-clearfix" @change="onValuesChange">
                            <p>我的组织类型<span style="border-bottom:1px solid,display:block,width:100px,height:10px;"></span></p>
                            <div v-for="(item,index) in slots1[0].values" :key="index" class="mui-input-row mui-radio mui-left" @click="handleClicks(item)">
                                    <input type="radio" name="selecttype"  style="position: absolute;top: 13px;">
                                    <label v-text="item.roomClassName" style="width: 140px;"></label>
                            </div> 
                        </mt-popup>
                    </a>
                </li>

                <div id="selectDiv">
                    <div v-if="form.gongChengFangID=='9'">
                        <li class="mui-table-view-cell mui-input-row">
                            <label class="text">专业</label>
                            <input type="text" name="roomName" v-model="roomform.roomName" value="" placeholder="必填"/>
                        </li>
                    </div>
                        <li v-if="form.gongChengFangID=='13'" class="mui-table-view-cell mui-input-row">
                            <label class="text">专业</label>
                            <input type="text" name="description" v-model="roomform.description" value="" placeholder="必填"/>
                        </li>
                    <li v-if="form.gongChengFangID=='7'" class="mui-table-view-cell mui-input-row">
                        <label class="text">供应材料</label>
                        <input type="text" name="description" v-model="roomform.description" value="" placeholder="必填"/>
                    </li>
                    <div v-if="form.gongChengFangID!=''&& form.gongChengFangID!='9'">
                        <li class="mui-table-view-cell mui-input-row">
                            <label class="text">公司名称</label>
                            <input type="text" name="companyName" v-model="roomform.companyName" value="" placeholder="必填"/>
                        </li>
                        <li class="mui-table-view-cell mui-input-row">
                            <label class="text">信用代码</label>
                            <input type="text" name="companyCreditCode" v-model="roomform.companyCreditCode" value="" placeholder="选填"/>
                        </li>
                    </div>


                </div>

            </ul>
            <div class="btn-box">
                <button @click="saveProject('save')" class="mui-btn mui-btn-primary mui-btn-block">登记项目</button>
            </div>
            <!--<div id="cus_zhiye_popver" class="mui-popover mui-popover-action mui-popover-bottom">-->
                    <!--<div class="pop-up" >-->
                        <!--<div class="pop-title">选择组织类型</div>-->
                        <!--<div class="pop-content select-box col-xs-6 mui-clearfix" style="height:240px;">-->
                            <!--<div v-for="item in data.zuzhiList" class="mui-input-row mui-radio mui-left">-->
                                <!--<label v-text="item.roomClassName"></label>-->
                                <!--<input type="radio"  v-model="data.selectType" name="selecttype" :value="item"/>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--<div class="pop-footer btn-contain">-->
                        <!--<button @click="type_confirm()" type="button" class="mui-btn mui-btn-primary mui-btn-block zrrr">确定</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

                <!-- <div id="cus_zhiye_popver" class="mui-popover mui-popover-action mui-popover-bottom">
                    <div class="pop-up2">
                        <div class="pop-title">选择组织类型（单选）</div>-->
                        <!-- <div class="pop-content select-box mui-clearfix">
                            <div id="cus_zhiye_popver_sc" class="mui-scroll-wrapper">
                                <div class="mui-scroll">
                                        <div class="s-title" >我的组织类型</div>
                                        <div class="col-xs-6 mui-clearfix">
                                            <div class="mui-input-row mui-radio mui-left" v-for="(item,index) in data.zuzhiList" :key="index">
                                                <div v-if="item.roomClass!='banzu_gaongren'" @click="type_confirm(item.roomClassName)">
                                                    <label v-text="item.roomClassName"></label>
                                                    <input type="radio"  v-model="data.selectType" name="selecttype" :value="item"/>
                                                </div>

                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div> -->
                        <!--<div class="pop-footer btn-contain">
                            <button @click="type_confirm()" type="button" class="mui-btn mui-btn-primary mui-btn-block zrrr">确定</button>
                        </div>-->
                    <!-- </div>
                </div> -->
        </section>
    </div>
</template>

<script>
import regions from '../../playform/regions' 
import { Picker,Popup,Toast  } from 'mint-ui';
import areaBar from '../common/areaBar'
export default {
    components: {
        'mt-picker': Picker,
        areaBar,
    },
    data () {
        return {
            form:{
                PlaceZuobiao:"",//地图坐标
                projectSN:"",
                projectName:"",//项目名称
                projectNameShort:"",//项目简称
                projectNameShenbao:"",//工程名称
                fullArea:"",//所在城市地址全称
                province:"",//省
                city:"",//市
                area:"",//区
                placeShenbao:"",//工程地点
                place:"",
                gongChengFangID:"",//组织类型ID
                gongChengFangName:"",//组织类型名称
                projectManageRoomID:"",//协作管理方ID
                projectManageRoomClassName:"",//协作管理方
                projectmanageID:"",//子管理员ID
                projectmanageName:"",//子管理员名称
                //如果使用同一个字段，在保存后，再次编辑数据不会出现
                projectManager:"",//项目管理员 - 保存用
                projectManagerId:"",//项目管理员 - 保存用
                xiangmuguanliyuan:"",//项目管理员 - 显示用
                xiangmuguanliyuanId:"",//项目管理员ID - 显示用
                userID:"",
                userName:"",
                UploadIds:"",
                serialNum:"",
                leibie:"",
            },
            popstatus:false,
            one_popupVisible:false,
            tow_popupVisible:false,
            roomform:{
                roomName:"",//房间名称
                companyName:"",//公司名称
                companyCreditCode:"",//信用代码
                description:"",//供应材料
            },
            fm: {
                projectSN:"",
                imgUrl: "",
                imgSmallUrl: "",
                serialNum:"",
            },
            isEdit:false,
            fujianList:[],
            image_host: "",
            projectmanage:[],
            projectmanageNames:[],
            projectmanageIds:[],
            sonMemberID:"",//子管理员ID
            sonManage:"",//所有子管理员显示
            data:{
                selectType:[],
                zuzhiList:[],
            },
            project:{},
            slots:[],
            slots1:[],
            pickervalues:'',
            value:[],
            timeType:'',
            address:0, 
        }
    },
    created() {
        var _self = this;
        // _self.form.userID=userId;
        // _self.form.userName=userName;
        //根据ID查询记录
        // if(projectSN){
        //     _self.showRecordById();

        // }
        //初始化职业标签
        _self.showzhiyeType();
        appApi.imgPreview.init();
        var obj=new Object();
            obj.type=2;
            // 工程类别
        this.$http.post("/project_room_api/find_project_category",obj).then(function (response) {
                if(response.data.code==200){
                    var result=response.data.result;
                    let resulList = [];
                    if(result.length>0){
                        // var picker = new mui.PopPicker();
                        
                        for(var i=0;i<result.length;i++){
                            if(_self.form.leibie==result[i].title){
                                picker.pickers[0].setSelectedIndex(i);
                            }
                            var obj=new Object();
                            obj.text=result[i].id;
                            obj.value=result[i].title;
                            if(result[i].id != 0){
                                resulList.push(obj)
                            }
                        }
                        console.log(resulList)
                        var solts=new Object();
                        solts.values=resulList;
                        solts.defaultIndex=0
                        solts.value=resulList[0].text,
                        solts.valueKey=resulList[0].value,
                        _self.slots.push(solts)
                        console.log(solts);
                        // picker.setData(resulList);
                        // picker.show(function(SelectedItem){
                        //     _self.form.leibie=SelectedItem[0].text;
                        // });
                    }else {
                        msg("未查询到工程类别!")
                        return
                    }
                }else {
                    msg("查询工程类别失败!")
                }
            }).catch(function (error) {
                console.info(error);
            });
            // 组织类型
            var obj1=new Object();
            obj.type=1;
            this.$http.post("/pcontact_api/findroomclass",obj1).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    let resulList = [];
                    for(var i=0;i<result.length;i++){
                            if(_self.form.leibie==result[i].title){
                                picker.pickers[0].setSelectedIndex(i);
                            }
                            var obj=new Object();
                            obj.classId=result[i].classId;
                            obj.roomClass=result[i].roomClass;
                            obj.roomClassName=result[i].roomClassName;
                                resulList.push(obj)
                        }
                        // console.log(resulList)
                        var solts=new Object();
                        solts.values=resulList;
                        solts.defaultIndex=1
                        solts.roomClass=resulList[0].roomClass,
                        solts.value=resulList[0].roomClassName,
                        solts.valueKey=resulList[0].classId,
                        _self.slots1.push(solts)
                        console.log(_self.slots1[0].values,'组织类型');
                }else {
                    msg("查询组织类型失败!")
                }
            }).catch(function (error) {
                console.info(error);
            });
    },
    methods:{
        addressRes(val){
            this.address = val;
        }, 
        handleClick:function(type){//确定
        if(this.pickervalues){
         if(this.timeType==1){
            this.form.leibie=this.pickervalues.value
            console.log(this.form.leibie);
          }
       
        }
        this.one_popupVisible=false

        },
        handleClicks:function(n){
            this.form.gongChengFangName = n.roomClassName;
            this.form.gongChengFangID = n.classId;
            this.tow_popupVisible=false
            console.log(this.form);
        },
        onValuesChange(picker, values) {
            if(values.length>0){
                this.pickervalues=values[0];
            }  
        },
        cancalClick:function(){//取消
            this.one_popupVisible=false
            // this.over_popupVisible=false
        },
        getCity(regions, provinceName) {

            return regions['provinces'][provinceName]['citiesArr'];
        },
        getArea(regions, provinceName, cityName) {

            return regions['provinces'][provinceName]['cities'][cityName]['areasArr'];

        },
        getProvince(regions) {

            return regions['provincesArr'];
        },
        onProvinceChange(picker, values) {
                      
        },
         type_confirm:function () {//选择组织类型
            // var _self=this;
            // document.getElementById("selectDiv").style.display="block";
            // console.log("组织类型",_self.data.selectType)
            // _self.form.gongChengFangID=_self.data.selectType.roomClass;
            // _self.form.gongChengFangName=_self.data.selectType.roomClassName;
            // mui('#cus_zhiye_popver').popover('toggle');
            // appApi.setPullRefresh(false);
            // jQuery(".mui-backdrop").click(function() {
            //     appApi.setPullRefresh(true);
            // })
        },

        selectCity:function () {//选择市区
        
        console.log(this.$refs.start)
            // var _self=this;
            // // 初始化省市区
            // var province = this.getProvince(regions);
            // var picker = []
            // // new mui.PopPicker({
            // //     layer: 3
            // // });
            // var dataAry=[];
            // if(province.length>0){
            //     for (var i=0;i<province.length;i++){//遍历所有的省份
            //         var provinceobj=new Object();
            //         provinceobj.value=i;
            //         provinceobj.text=province[i];
            //         if(_self.form.province==province[i]){
            //             picker.pickers[0].setSelectedIndex(i);
            //         }
            //         provinceobj.children=[];
            //         var city = this.getCity(regions, province[i]);//获取市
            //         if(city.length>0){
            //             for(var j=0;j<city.length;j++){//遍历所有的市
            //                 var cityobj=new Object();
            //                 cityobj.value=j;
            //                 cityobj.text=city[j];
            //                 if(_self.form.city==city[j]){
            //                     picker.pickers[1].setSelectedIndex(j);
            //                 }
            //                 cityobj.children=[];
            //                 provinceobj.children.push(cityobj);//添加市
            //                 var area = this.getArea(regions, province[i],city[j]);//获取对应的区
            //                 if(area.length>0){
            //                     for(var k=0;k<area.length;k++){//遍历区
            //                         var areaobj=new Object();
            //                         areaobj.value=j;
            //                         areaobj.text=area[k];
            //                         if(_self.form.area==area[k]){
            //                             picker.pickers[2].setSelectedIndex(k);
            //                         }
            //                         cityobj.children.push(areaobj);//添加区
            //                     }
            //                 }
            //             }
            //         }
                    
            //         dataAry.push(provinceobj);//添加所有的省市区
            //         this.City = provinceobj
            //         console.log(provinceobj);
            //     }
            // }
            // picker.setData(dataAry);//设置数据到控件显示

            /*picker.pickers[0].setSelectedIndex(1);
            picker.pickers[1].setSelectedIndex(0);
            picker.pickers[2].setSelectedIndex(1);*/
            // picker.show(function(SelectedItem) {
            //     _self.form.fullArea="";//清空数据
            //     if(SelectedItem.length>0){
            //         for(var i=0;i<SelectedItem.length;i++){
            //             if(JSON.stringify(SelectedItem[i]) != "{}"){
            //                 console.log(SelectedItem[i])
            //                 _self.form.fullArea+=SelectedItem[i].text+" ";
            //             }

            //         }
            //         if(JSON.stringify(SelectedItem[0]) != "{}"){
            //             _self.form.province=SelectedItem[0].text;
            //         }
            //         if(JSON.stringify(SelectedItem[1]) != "{}"){
            //             _self.form.city=SelectedItem[1].text;
            //         }
            //         if(JSON.stringify(SelectedItem[2]) != "{}"){
            //             _self.form.area=SelectedItem[2].text;
            //         }
            //         picker.dispose(); //释放资源

            //     }
            // })

        },
        selectType:function(type) {//选择类型
            // mui('#cus_zhiye_popver').popover('toggle');
            // appApi.setPullRefresh(false);
            // jQuery(".mui-backdrop").click(function() {
            //     appApi.setPullRefresh(true);
            // })
        },

        selectDate: function (t) {
            var o = this;
            if(t=="s"){
                if(o.form.missionStartDate != ""){
                    opt.value = o.form.missionStartDate;
                }
            }else if(t==='e'){
                if(o.form.missionEndDate != ""){
                    opt.value = o.form.missionEndDate;
                }
            }
            var picker = new mui.DtPicker(opt);
            picker.show(function (rs) {
                /*
                 * rs.value 拼合后的 value
                 * rs.text 拼合后的 text
                 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                 * rs.m 月，用法同年
                 * rs.d 日，用法同年
                 * rs.h 时，用法同年
                 * rs.i 分（minutes 的第二个字母），用法同年
                 */
                opt["value"] = rs.value; //控件同步
                if(t=="s"){
                    o.form.missionStartDate = rs.value;
                }else if(t==='e'){
                    o.form.missionEndDate = rs.value;
                }
                picker.dispose(); //释放资源
            })
        },
        popup:function(content){
            // msg(content);
            Toast({
                message: content,
                position: 'bottom',
                duration: 1000
            });
        },
        selectProject (type) {//工程类别
            if(type===1){
                this.one_popupVisible=true
                this.tow_popupVisible=false
            }else if(type===2){
                this.one_popupVisible=false
                this.tow_popupVisible=true
            }  
            this.timeType=type;
        },
        selectManageRoom:function () {//协作管理方
            var _self=this;
            //设置协作管理方的选择值
            var resulList = [{value:"施工单位",text:"施工单位"},{value:"总包单位",text:"总包单位"},{value:"建设单位",text:"建设单位"}];
            var picker = new mui.PopPicker();
            picker.setData(resulList);

            for(var i=0;i<resulList.length;i++){
                if(_self.form.projectManageRoomClassName==resulList[i].text){
                    picker.pickers[0].setSelectedIndex(i);
                }
            }
            picker.show(function(SelectedItem){
                _self.form.projectManageRoomClassName=SelectedItem[0].text;
                var obj=new Object();
                obj.type=1;
                obj.roomClassName = _self.form.projectManageRoomClassName;
                //选择协作管理方后，根据选择的值查询出房间群主
                this.$http.post("/project_room_api/find_contract_room",obj).then(function (response) {
                    //获取房间类别
                    if(response.data.code==200){
                        //得到房间类别
                        var room=response.data.result;
                        if(room.length>0){
                            var formdata = new FormData();
                            formdata.append("roomClass",room[0].roomClass);
                            formdata.append("projectSn",projectSN);
                            //根据房间号查询对应的房间群主
                            this.$http.post("/project_room_api/find_contact_room",formdata).then(function (response) {
                                //获取房间信息
                                if(response.data.code==200){
                                    //请求成功
                                    var result=response.data.result;
                                    if(result.length>0){
                                        //得到房间信息
                                        var obj = new Object();
                                        var userList = new Array();
                                        obj.userId = result[0].ownerId;
                                        userList.push(result[0].ownerId);
                                        _self.form.projectManageRoomID = result[0].roomId;
                                        obj.list=userList;
                                        //obj.list = result[0].ownerId;
                                        //根据房间信息获取房间群主
                                        this.$http.post("/project_work_api/find_user_info_by_id",obj).then(function (response) {
                                            //获取房间群主
                                            if(response.data.code==200){
                                                //请求成功
                                                var user=response.data.result;
                                                if(user.length>0){
                                                    //获取到房间群主信息-将群主信息写入到项目管理员
                                                    _self.form.xiangmuguanliyuanId = user[0].userId;
                                                    _self.form.xiangmuguanliyuan = user[0].nickName;
                                                    var xiangmuguanliyuan = document.getElementsByName("xiangmuguanliyuan");
                                                    xiangmuguanliyuan[0].value=user[0].nickName;

                                                }else {
                                                    _self.form.xiangmuguanliyuanId = "";
                                                    _self.form.xiangmuguanliyuan = "";
                                                }
                                            }else {
                                            }
                                        }).catch(function (error) {
                                            console.info(error);
                                        });
                                    }else {
                                        return
                                    }
                                }else {
                                }
                            }).catch(function (error) {
                                console.info(error);
                            });
                        }else {
                            return
                        }
                    }else {
                        //msg("查询职业标签失败!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            });



        },
        showzhiyeType:function () {//组织类型

            var _self=this;
            var obj=new Object();
            obj.type=1;
            
        },
        findroomuserlist:function () {//查询项目子管理员
            var _self = this;
            var formdata = new FormData();
            if(_self.projectmanage.length==0){
                formdata.append("projectSn", projectSN)
                this.$http.post("/pcontact_api/findprojectmanage", formdata).then(function (response) {
                    if (response.data.code == 0) {
                        var result = response.data.result;
                        if (result != null && result.length > 0) {
                            _self.projectmanage = result;
                            _self.sonManage = "";
                            for(var i=0;i<_self.projectmanage.length;i++){
                                app.projectmanageNames.push(_self.projectmanage[i].nickName);//存储用户姓名，用于界面显示
                                if(i==(_self.projectmanage.length-1)){
                                    _self.sonManage +=_self.projectmanage[i].nickName;
                                }else{
                                    _self.sonManage +=_self.projectmanage[i].nickName + ",";
                                }
                            }

                        }
                    }
                }).catch(function (error) {
                    msg(error)
                    console.info(error);
                });
            }
        },
        showRecordById:function () {//查询项目
            var _self=this;
            _self.form.serialNum=projectSN;
            var formdata=new FormData();
            formdata.append("json",JSON.stringify(_self.form));
            this.$http.post("/project_room_api/find_project",formdata).then(function (response) {
                if(response.data.code==200){
                    var result=response.data.result;
                    if(result.length>0){
                        console.log(result)
                        _self.project=result[0];
                        _self.form=result[0];
                        console.log("获取项目信息",_self.form)
                        if(urlProjectmanageIDs!=null){
                            _self.form.projectmanageID = urlProjectmanageIDs;
                        }
                        if(urlProjectmanageNames!=null){
                            _self.form.projectmanageName = urlProjectmanageNames;
                        }
                        if(_self.form.projectManager!=null){
                            _self.form.xiangmuguanliyuan = _self.form.projectManager;
                        }
                        if(_self.form.projectManagerId!=null){
                            _self.form.xiangmuguanliyuanId = _self.form.projectManagerId;
                        }
                        if(result[0].missionStartDate!=null){
                        _self.form.missionStartDate=formDate(result[0].missionStartDate);
                        }
                        if(result[0].missionEndDate!=null) {
                            _self.form.missionEndDate = formDate(result[0].missionEndDate);
                        }
                        //判断是否有权限修改项目信息
                        if(_self.form.xiangmuguanliyuan==null||_self.form.xiangmuguanliyuan==""){
                            //项目管理员等于创建者的时候，可以编辑
                            if(userId==_self.form.userID){
                                _self.isEdit = true;
                            }
                        }else if(userName==_self.form.xiangmuguanliyuan){//当前登录人和项目管理员相等时，可以编辑
                            _self.isEdit = true;
                        }
                        //_self.showAttment(result[0].uploadIds);
                        //初始化子管理员
                        _self. findroomuserlist();
                    }else {
                        msg("未查询到项目信息，请核对记录ID是否正确!")
                        return
                    }
                    setTimeout(function () {
                        _self.showImage();
                    },100)
                }else {
                    msg("查询项目失败!")
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        showAttment:function (ids) {//获取附件列表
            var _self=this;
            var params = new FormData();
            params.append("fileIdStr",ids);
            this.$http.post("/sass_api/get_uploadfile_info", params).then(function (response) {
                if (response.data.code == 200) {
                    var result=response.data.result;
                    if(result.length>0){
                        _self.fujianList=result;
                    }
                    console.log("附件",result);

                }else{
                    msg("查询附件失败");
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        showImage:function () {//查询工程照片
            var _self = this;
            _self.fm.projectSN=_self.form.serialNum;
            if(!_self.fm.projectSN){
                msg("参数有误，没有项目ID");
                return;
            }
            Base.load({url:getUrl() + "/pro_api/getProImg",data:{"projectSN":_self.fm.projectSN},dataType:"json",method:"post"},function(response){
                if (response.code == 200) {
                    console.log("查询照片",response.result)
                    if(response.result){
                        var data = response.result.data;
                        if(data){
                            _self.image_host = response.result.image_host;
                            _self.fm.imgUrl = data.imgUrl;
                            _self.fm.imgSmallUrl = data.imgSmallUrl;
                            _self.fm.serialNum = data.serialNum;

                        }
                    }
                }else{
                    msg("获取数据失败！请稍后重试");
                }
            },function(error){
                console.info(error);
            })
        },
        uploadImg:function () {//上传工程照片

            var _self = this;
            if(!_self.fm.projectSN){
                msg("参数有误，没有项目ID");
                return;
            }
            if (!uploadStatus && _self.$data.fm.imgUrl == "") {
               // msg("请上传照片");
                //return false;
            }

            if(_self.fm.imgData){//更新工程照片和项目信息
                var params = new FormData();
                params.append("obj",JSON.stringify(_self.fm));
                this.$http.post("/pro_api/saveProImg", params).then(function (response) {
                    if (response.data.code == 200) {
                        //msg("xia");
                        setTimeout(function () {
                            //返回上传图片的路径并更新缓存中项目列表的信息
                            if(response.data.result){
                                var url=UPLOAD_SERVER_ADDRESS + response.data.result;
                                console.log("上传图片路径",url);
                                //更新项目信息
                                _self.updateProject();
                            }

                        },500)
                    }else{
                        msg("工程照片上传失败");
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            }else {
                //只单独更新项目信息
                _self.updateProject();
            }

        },
        saveProject:function (type) {//保存项目
            var _self=this;
            if(!_self.form.projectName){
                // msg("工程名称不能为空")
                Toast({
                    message: '工程名称不能为空',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }else {
                _self.form.projectNameShenbao=_self.form.projectName;
            }
            if(!_self.form.projectNameShort){
                // msg("工程简称不能为空")
                Toast({
                    message: '工程简称不能为空',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }
            if(!_self.form.leibie){
                // msg("工程不能为空")
                Toast({
                    message: '工程不能为空',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }
            if(!_self.form.fullArea){
                // msg("所在城市不能为空")
                Toast({
                    message: '所在城市不能为空',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }
            /*if(!_self.form.placeShenbao){
                msg("工程地点不能为空")
                return;
            }*/

            if(!_self.form.gongChengFangID){
                // msg("我的组织类型不能为空")
                Toast({
                    message: '我的组织类型不能为空',
                    position: 'middle',
                    duration: 1000
                });
                return;
            }

            if(!projectSN){//创建项目
                if(_self.form.gongChengFangID=='9'){
                    if(!_self.roomform.roomName){
                        // msg("专业不能为空")
                        Toast({
                            message: '专业不能为空',
                            position: 'middle',
                            duration: 1000
                         });
                        return;
                    }

                }else  if(_self.form.gongChengFangID=='7'){
                    if(!_self.roomform.description){
                        // msg("供应材料不能为空")
                        Toast({
                            message: '供应材料不能为空',
                            position: 'middle',
                            duration: 1000
                         });
                        return;
                    }
                }else  if(_self.form.gongChengFangID=='13'){
                    if(!_self.roomform.description){
                        // msg("专业不能为空")
                        Toast({
                            message: '专业不能为空',
                            position: 'middle',
                            duration: 1000
                         });
                        return;
                    }
                }else{
                    if(!_self.roomform.companyName) {//||!_self.roomform.companyCreditCode
                        if (type=='save') {
                            if (!_self.roomform.companyName) {
                                // msg("公司名称不能为空");
                                Toast({
                                    message: '公司名称不能为空',
                                    position: 'middle',
                                    duration: 1000
                                });
                                return;
                            }
                        }
                        /*if(!_self.roomform.companyCreditCode){
                            msg("信用代码不能为空");
                            return;
                        }*/
                    }
                }
                if(!_self.roomform.roomName&&_self.roomform.companyName){
                    _self.roomform.roomName=_self.roomform.companyName;//房间名称等于公司名称
                }else if(!_self.roomform.companyName&&_self.roomform.roomName){
                    _self.roomform.companyName=_self.roomform.roomName;//房间名称等于公司名称
                }

                var formdata=new FormData();
                var obj=new Object();
                _self.form.place = _self.form.placeShenbao;
                obj.projectData=_self.form;
                obj.roomData=_self.roomform;
                var json=JSON.stringify(obj);
                formdata.append("json",json);
                this.$http.post("/project_room_api/save_project",formdata).then(function (response) {
                    if(response.data.code==200){
                        var result=response.data.result;
                        console.log("房间初始化",result)

                        loading("项目创建成功，正在初始虚拟办公室信息...");
                        var roomdata=new FormData();
                        roomdata.append("projectSN",result.projectSN);
                        roomdata.append("roomName",result.roomName);
                        roomdata.append("roomClass",result.roomClass);
                        roomdata.append("companyName",result.companyName);
                        roomdata.append("companyCreditCode",result.companyCreditCode);
                        roomdata.append("description",result.description);

                        this.$http.post("/pcontact_api/initprojectcontact",roomdata).then(function (response) {
                            console.log("房间初始化完成",response.data)
                            setTimeout(function () {
                                layer.closeAll();
                                appApi.closeNewWindow();
                            },500);
                        }).catch(function (error) {
                            console.info(error);
                        });
                    }else {
                        msg("项目创建失败!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            }else {//更新项目
                // console.log(_self.form.UploadIds)
                // if(!_self.form.UploadIds){
                //     msg("附件未上传或上传未完成")
                //     return;
                // }
                _self.uploadImg();//先上传工程照片，后更新项目其他信息

            }

        },
        updateProject:function () {
            var _self=this;
            if(_self.projectmanageIds){
                _self.form.projectMemberID=_self.projectmanageIds.join(",");
            }
            //获取需要更新的字段
            var formdata=new FormData();
            _self.form.projectManager =  _self.form.xiangmuguanliyuan;
            _self.form.projectManagerId =  _self.form.xiangmuguanliyuanId;
            var json=JSON.stringify(_self.form);
            formdata.append("json",json)
            this.$http.post("/project_room_api/update_project",formdata).then(function (response) {
                if(response.data.code==200){
                    msg("项目更新成功!");
                    setTimeout(function () {
                        appApi.broadcast("reLoad()"); //刷新页面
                        appApi.closeNewWindow();
                    },200)


                }else {
                    msg("项目更新失败!")
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        openManageChildList:function () {
            var project = encodeURIComponent(JSON.stringify(app.projectmanage));
            appApi.openNewWindow(pagepath+'/chatroom/project_member_list.html?projectSN='+projectSN+"&method=list&project="+project);
        },
        choicePlace:function(){//工程地点选择 - 打开百度地图选择地点
            //window.appApi.getLocation();  //获取当前位置
            var _self=this;
            if(isApp && isIphoneOs) {
                appApi.showAddress(1,"",0,0);
                window.appApi.callBackFun = function (callFlag, CONTENT) {
                    if (callFlag == appApi.callBackFlag.LOCATION) {
                        setTimeout(function () {
                            //CONTENT.longaddress;GPS定位地址
                            //CONTENT.latitudeAndLongitude;GPS定位经纬度
                            _self.form.placeShenbao = CONTENT.shortAddress//地图名称
                            _self.form.PlaceZuobiao = CONTENT.latitudeAndLongitude//经纬度
                        }, 50)
                    }
                }
            } else if(isApp && isAndroid) {
                window.webactivity.openBaiduMapPage(1,"",0,0);
                window.appApi.callBackFun = function (callFlag, CONTENT) {
                    if (callFlag == appApi.callBackFlag.LOCATION) {
                        setTimeout(function () {
                            //CONTENT.longaddress;GPS定位地址
                            //CONTENT.latitudeAndLongitude;GPS定位经纬度
                            _self.form.placeShenbao = CONTENT.shortAddress//地图名称
                            _self.form.PlaceZuobiao = CONTENT.latitudeAndLongitude//经纬度
                        }, 50)
                    }
                }
            } else {
                console.info("设备不支持获取位置信息");
                return "设备不支持获取位置信息";
            }
            },
        formDate(value) {
            var date = new Date(value);
            Y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                H = date.getHours(),
                i = date.getMinutes(),
                s = date.getSeconds();
            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            if (H < 10) {
                H = '0' + H;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
        //  <!-- 获取时间格式 2017-01-03 10:13:48 -->
            // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
        //  <!-- 获取时间格式 2017-01-03 -->
            var t = Y + '-' + m + '-' + d;
            return t;
        }
    },
    mounted(){
        //获取照片
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }
        /*上传照片时间*/
        function selectimgUrl (that) {
            try {
                var imgUrl = getObjectURL(document.getElementById("upfile").files[0]);
                lrz(that.files[0], {
                    width: 800,
                    height: 600
                }).then(function (rst) {
                    uploadStatus = true;
                    app.$data.fm["imgData"] = rst.base64;
                    app.$data.fm["width"] = 800;
                    app.$data.fm["height"] = 600;
                    var v = document.getElementById("img_view")
                    v.src = rst.base64;
                    v.style.display = "inline-block"
        //			console.info(JSON.stringify(app.$data.fm));
                })
            }catch (e){
                alert(e)
            }

        }
    }
}
</script>

<style scoped>
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
