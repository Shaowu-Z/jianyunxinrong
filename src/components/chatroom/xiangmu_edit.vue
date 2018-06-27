<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">完善项目信息</h1>
            <!--<a class="mui-action-back mui-icon iconfont icon-back"></a>-->
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="saveProject('update')">保存</button>
        </header>
        <section class="mui-content mycenter-content">
            <ul class="mui-table-view eg-table-view">
            <li class="mui-table-view-cell mui-input-row">
                <label class="text">工程全称</label>
                <input type="text" name="ProjectName" v-model="form.projectName" value="" placeholder="请填写"/>
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label class="text">工程简称</label>
                <input type="text" name="ProjectNameShort" v-model="form.projectNameShort" maxlength="10" value="" placeholder="请填写"/>
            </li>
                <li class="mui-table-view-cell mui-input-row" @click="selectProject()">
                    <a class="mui-navigate-right" >
                        <label class="text">工程类别</label>
                        <input type="text" name="leibie" v-model="form.leibie" value="" placeholder="请选择" disabled=""/>
                    </a>
                </li>
            <li class="mui-table-view-cell mui-input-row" @click="selectCity()">
                <a class="mui-navigate-right" >
                    <label class="text">所在地区</label>
                    <input type="text" name="FullArea" v-model="form.fullArea" value="" placeholder="请选择" disabled/>
                </a>
            </li>
            <li class="mui-table-view-cell mui-input-row">
                <label class="text">工程地点</label>
                <input type="text" name="PlaceShenbao" v-model="form.placeShenbao" value="" @click="choicePlace()" placeholder="必填" readonly="readonly" />
            </li>

                <li class="mui-table-view-cell mui-input-row" @click="selectManageRoom()">
                    <a class="mui-navigate-right" >
                        <label class="text">协作管理方</label>
                        <input type="text" name="leibie" v-model="form.projectManageRoomClassName" value="" placeholder="请选择" disabled=""/>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                        <label class="text">项目管理员</label>
                        <input type="text" name="xiangmuguanliyuan" readonly="readonly" v-model="form.xiangmuguanliyuan" value=""/>
                </li>
                <li class="mui-table-view-cell mui-input-row" @click="openManageChildList()">
                    <a class="mui-navigate-right" >
                    <label class="text">子管理员</label>
                    <input class="mui-ellipsis" type="text" readonly="readonly" name="projectmanageNames" v-model="projectmanageNames" value="" />
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view eg-table-view">
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">建设单位</label>
                    <input type="text" name="companyFinalName" v-model="form.companyFinalName" value="" placeholder="请填写"/>
                </li>

                <!--<li class="mui-table-view-cell mui-input-row">
                    <label style="line-height: 1;">社会信用代码<br/>组织机构代码</label>
                    <input type="text" name="CompanyFinalNashuihao" v-model="form.companyFinalNashuihao" value="" placeholder="请填写"/>
                </li>-->
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">施工单位</label>
                    <input type="text" name="CompanyShigongName" v-model="form.companyShigongName" value="" placeholder="请填写"/>
                </li>
                <!--<li class="mui-table-view-cell mui-input-row">
                    <label>信用代码</label>
                    <input type="text" name="CompanyShigongNashuihao" v-model="form.companyShigongNashuihao" value="" placeholder="请填写"/>
                </li>-->
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">工程造价</label>
                    <input type="text" name="zaojia" v-model="form.zaojia" value="" placeholder="请填写"/><span class="mui-badge mui-badge-inverted">(万元)</span>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">建筑面积</label>
                    <input type="text" name="mianji" v-model="form.mianji" value="" placeholder="请填写"/><span class="mui-badge mui-badge-inverted">(平米)</span>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <a class="mui-navigate-right">
                        <label class="text">开工日期</label>
                        <input type="text" name="missionStartDate" v-model="form.missionStartDate" @click="selectDate('s')"
                            readonly="readonly"
                            placeholder="请选择">
                        <data-bar :title="kaigong" :datanow="cc"></data-bar>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-input-row">
                    <a class="mui-navigate-right">
                        <label class="text">竣工日期</label>
                        <input type="text" name="missionEndDate" v-model="form.missionEndDate" @click="selectDate('e')"
                            readonly="readonly"
                            placeholder="请选择">
                    </a>
                </li>
        </ul>

            <div class="module01">
                <div class="module01-head">工程概况照片</div>
                    <div class="module01-body">
                        <div class="upload-img">
                            <img @click="stopEvt(event),disposeLogImg(0,fm.imgSmallUrl)" class="" style="display: none;" id="img_view" v-show="fm.imgUrl!=''" :src="fm.imgUrl"/>
                        </div>
                        <div class="upload-btn mui-text-center">
                            <button class="mui-btn mui-btn-success">拍照/选择相册</button>
                            <input name="need_hide_div" type="file" id="upfile" value="" @click="imagesAdd" accept="image/png,image/gif,image/jpeg" @clcik="selectimgUrl(this)" class="input-file">
                        </div>
                    </div>


                <div class="mui-popup mui-popup-in mui-hidden">
                    <div class="content-scroll">
                        <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                            <li class="mui-table-view-cell">拍照</li>
                            <li class="mui-table-view-cell">手机相册</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--<div class="enclosure-box">-->
                <!--<div class="enclosure-header">-->
                    <!--<label>已经上传完成的附件</label>-->
                    <!--&lt;!&ndash;<button class="mui-btn mui-btn-link"><span class="mui-icon mui-icon-paperclip"></span></button>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="enclosure">-->
                    <!--<div v-for="item in fujianList" class="enclosure-item">-->
                        <!--<span class="enclosure-type label-word"></span>-->
                        <!--<div class="enclosure-con">-->
                            <!--<p class="name" v-text="item.filename"></p>-->
                            <!--<P class="secondary" ><small v-text="item.filesize/1024"></small>KB</P>-->
                        <!--</div>-->
                        <!--<span class="btn-delete"></span>-->
                    <!--</div>-->

                <!--</div>-->
            <!--</div>-->
            <!--<div id="uploadFile">-->

            <!--</div>-->
        </section>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../playform/common'
import setting from '../../playform/config'
import util from '../../playform/util'
import dataBar from "../common/dataBar"
// import regions from '../../playform/regions'
export default {
    components:{
        dataBar
    },
    data () {
        return {
            cc:'',
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
            userId: '',
            urlProjectmanageIDs:'',
            urlProjectmanageNames:'',
            opt : {"type": "date", "beginYear": 2000, "endYear": new Date().getFullYear()+10},
            uploadStatus : false,
            kaigong:'开工日期',
        }
    },
    created() {
        var paramMap= getParam(window.location.href);//获取地址栏参数
        var userName = decodeURI(BackCookie.getCookie("username"));
        this.userId = BackCookie.getCookie("userid");
        this.$route.query.projectSN=paramMap.projectSN;
        this.urlProjectmanageIDs = paramMap.userIds;
        this.urlProjectmanageNames = paramMap.userNames;

        var _self = this;
        _self.form.userID=this.userId;
        _self.form.userName=this.form.userName;
        console.log(this.$route.query.projectSN);
        //根据ID查询记录
        if(this.$route.query.projectSN){
            _self.showRecordById();
        }
        //初始化职业标签
        _self.showzhiyeType();
        appApi.imgPreview.init();
        
    },
    methods:{
        imagesAdd(){
            window.webactivity.setInputType(1);
        },
        type_confirm:function () {//选择组织类型
            var _self=this;
            document.getElementById("selectDiv").style.display="block";
            console.log("组织类型",_self.data.selectType)
            _self.form.gongChengFangID=_self.data.selectType.roomClass;
            _self.form.gongChengFangName=_self.data.selectType.roomClassName;
            mui('#cus_zhiye_popver').popover('toggle');
            appApi.setPullRefresh(false);
            jQuery(".mui-backdrop").click(function() {
                appApi.setPullRefresh(true);
            })
        },
        selectCity:function () {//选择市区
            var _self=this;
            // 初始化省市区
            var province = this.getProvince(regions);
            var picker = new mui.PopPicker({
                layer: 3
            });
            var dataAry=[];
            if(province.length>0){
                for (var i=0;i<province.length;i++){//遍历所有的省份
                    var provinceobj=new Object();
                    provinceobj.value=i;
                    provinceobj.text=province[i];
                    if(_self.form.province==province[i]){
                        picker.pickers[0].setSelectedIndex(i);
                    }
                    provinceobj.children=[];
                    var city = getCity(regions, province[i]);//获取市
                    if(city.length>0){
                        for(var j=0;j<city.length;j++){//遍历所有的市
                            var cityobj=new Object();
                            cityobj.value=j;
                            cityobj.text=city[j];
                            if(_self.form.city==city[j]){
                                picker.pickers[1].setSelectedIndex(j);
                            }
                            cityobj.children=[];
                            provinceobj.children.push(cityobj);//添加市
                            var area = getArea(regions, province[i],city[j]);//获取对应的区
                            if(area.length>0){
                                for(var k=0;k<area.length;k++){//遍历区
                                    var areaobj=new Object();
                                    areaobj.value=j;
                                    areaobj.text=area[k];
                                    if(_self.form.area==area[k]){
                                        picker.pickers[2].setSelectedIndex(k);
                                    }
                                    cityobj.children.push(areaobj);//添加区
                                }
                            }
                        }
                    }

                    dataAry.push(provinceobj);//添加所有的省市区
                }
            }
            picker.setData(dataAry);//设置数据到控件显示

            /*picker.pickers[0].setSelectedIndex(1);
            picker.pickers[1].setSelectedIndex(0);
            picker.pickers[2].setSelectedIndex(1);*/
            picker.show(function(SelectedItem) {
                _self.form.fullArea="";//清空数据
                if(SelectedItem.length>0){
                    for(var i=0;i<SelectedItem.length;i++){
                        if(JSON.stringify(SelectedItem[i]) != "{}"){
                            console.log(SelectedItem[i])
                            _self.form.fullArea+=SelectedItem[i].text+" ";
                        }

                    }
                    if(JSON.stringify(SelectedItem[0]) != "{}"){
                        _self.form.province=SelectedItem[0].text;
                    }
                    if(JSON.stringify(SelectedItem[1]) != "{}"){
                        _self.form.city=SelectedItem[1].text;
                    }
                    if(JSON.stringify(SelectedItem[2]) != "{}"){
                        _self.form.area=SelectedItem[2].text;
                    }
                    picker.dispose(); //释放资源

                }
            })

        },
        selectType:function(type) {//选择类型
            mui('#cus_zhiye_popver').popover('toggle');
            appApi.setPullRefresh(false);
            jQuery(".mui-backdrop").click(function() {
                appApi.setPullRefresh(true);
            })
        },
        selectDate: function (t) {
            var o = this;
            if(t=="s"){
                if(o.form.missionStartDate != ""){
                    this.opt.value = o.form.missionStartDate;
                }
            }else if(t==='e'){
                if(o.form.missionEndDate != ""){
                    this.opt.value = util.fnFormat(o.form.missionEndDate,'yyyy-MM-dd');
                }
            }
            // var picker = new mui.DtPicker(this.opt);
            // picker.show(function (rs) {
            //     /*
            //      * rs.value 拼合后的 value
            //      * rs.text 拼合后的 text
            //      * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
            //      * rs.m 月，用法同年
            //      * rs.d 日，用法同年
            //      * rs.h 时，用法同年
            //      * rs.i 分（minutes 的第二个字母），用法同年
            //      */
            //     opt["value"] = rs.value; //控件同步
            //     if(t=="s"){
            //         o.form.missionStartDate = rs.value;
            //     }else if(t==='e'){
            //         o.form.missionEndDate = rs.value;
            //     }
            //     picker.dispose(); //释放资源
            // })
        },
        popup:function(content){
            // msg(content);
            layer.open({
                content: 'content!'
                ,skin: 'msg'
                ,time: 1 //2秒后自动关闭
                ,anim:false
            });
        },
        selectProject:function () {//工程类别
            var _self=this;
            var obj=new Object();
            obj.type=2;
            this.$http.post("/project_room_api/find_project_category",obj).then(function (response) {
                console.log(response,'工程类别');
                if(response.data.code==200){
                    var result=response.data.result;
                    if(result.length>0){
                        var picker = new mui.PopPicker();
                        var resulList = [];
                        for(var i=0;i<result.length;i++){
                            if(_self.form.leibie==result[i].title){
                                picker.pickers[0].setSelectedIndex(i);
                            }
                            resulList.push({
                                value:result[i].id,
                                text :result[i].title,
                            })
                        }

                        picker.setData(resulList);
                        picker.show(function(SelectedItem){
                            _self.form.leibie=SelectedItem[0].text;
                        });
                    }else {
                        // msg("未查询到工程类别!")
                        layer.open({
                            content: '未查询到工程类别!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return
                    }
                }else {
                    // msg("查询工程类别失败!")
                    layer.open({
                        content: '查询工程类别失败!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                }
            }).catch(function (error) {
                console.info(error);
            });
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
                    console.log(response,'得到房间类别');
                    //获取房间类别
                    if(response.data.code==200){
                        //得到房间类别
                        var room=response.data.result;
                        if(room.length>0){
                            var formdata = new FormData();
                            formdata.append("roomClass",room[0].roomClass);
                            formdata.append("projectSn",_self.$route.query.projectSN);
                            //根据房间号查询对应的房间群主
                            this.$http.post("/project_room_api/find_contact_room",formdata).then(function (response) {
                                console.log(response,'获取房间信息');
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
                                            console.log(response,'获取房间群主');
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
            this.$http.post("/pcontact_api/findroomclass",obj).then(function (response) {
                console.log(response,'组织类型');
                if(response.data.code==0){
                    var result=response.data.result;
                    if(result.length>0){
                        //console.log(result)
                        _self.data.zuzhiList=result;
                    }else {
                        // msg("未查询到组织类型!")
                        layer.open({
                            content: '未查询到组织类型!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return
                    }
                }else {
                    // msg("查询组织类型失败!")
                    layer.open({
                        content: '查询组织类型失败!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        findroomuserlist:function () {//查询项目子管理员
            var _self = this;
            var formdata = new FormData();
            if(_self.projectmanage.length==0){
                formdata.append("projectSn", _self.$route.query.projectSN)
                this.$http.post("/pcontact_api/findprojectmanage", formdata).then(function (response) {
                    console.log(response,'查询项目子管理员');
                    if (response.data.code == 0) {
                        var result = response.data.result;
                        if (result != null && result.length > 0) {
                            _self.projectmanage = result;
                            _self.sonManage = "";
                            for(var i=0;i<_self.projectmanage.length;i++){
                                this.projectmanageNames.push(_self.projectmanage[i].nickName);//存储用户姓名，用于界面显示
                                if(i==(_self.projectmanage.length-1)){
                                    _self.sonManage +=_self.projectmanage[i].nickName;
                                }else{
                                    _self.sonManage +=_self.projectmanage[i].nickName + ",";
                                }
                            }

                        }
                    }
                }).catch(function (error) {
                    // msg(error)
                    layer.open({
                        content: 'error!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                    console.info(error);
                });
            }
        },
        showRecordById:function () {//查询项目
            var _self=this;
            _self.form.serialNum=this.$route.query.projectSN;
            var formdata=new FormData();
            formdata.append("json",JSON.stringify(_self.form));
            this.$http.post("/project_room_api/find_project",formdata).then(function (response) {
                console.log(response,'查询项目');
                if(response.data.code==200){
                    var result=response.data.result;
                    if(result.length>0){
                        console.log(result)
                        _self.project=result[0];
                        _self.form=result[0];
                        console.log("获取项目信息",_self.form)
                        if(_self.urlProjectmanageIDs!=null){
                            _self.form.projectmanageID = _self.urlProjectmanageIDs;
                        }
                        if(_self.urlProjectmanageNames!=null){
                            _self.form.projectmanageName = _self.urlProjectmanageNames;
                        }
                        if(_self.form.projectManager!=null){
                            _self.form.xiangmuguanliyuan = _self.form.projectManager;
                        }
                        if(_self.form.projectManagerId!=null){
                            _self.form.xiangmuguanliyuanId = _self.form.projectManagerId;
                        }
                        if(result[0].missionStartDate!=null){
                        _self.form.missionStartDate=util.fnFormat(result[0].missionStartDate,'yyyy-MM-dd')
                        _self.cc=util.fnFormat(result[0].missionStartDate,'yyyy-MM-dd')
                        alert(_self.form.missionStartDate)
                        }
                        if(result[0].missionEndDate!=null) {
                            _self.form.missionEndDate =util.fnFormat(result[0].missionEndDate,'yyyy-MM-dd')
                        }
                        //判断是否有权限修改项目信息
                        if(_self.form.xiangmuguanliyuan==null||_self.form.xiangmuguanliyuan==""){
                            //项目管理员等于创建者的时候，可以编辑
                            if(_self.userId==_self.form.userID){
                                _self.isEdit = true;
                            }
                        }else if(_self.form.userName==_self.form.xiangmuguanliyuan){//当前登录人和项目管理员相等时，可以编辑
                            _self.isEdit = true;
                        }
                        //_self.showAttment(result[0].uploadIds);
                        //初始化子管理员
                        _self. findroomuserlist();
                    }else {
                        // msg("未查询到项目信息，请核对记录ID是否正确!")
                        layer.open({
                            content: '未查询到项目信息，请核对记录ID是否正确!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return
                    }
                    setTimeout(function () {
                        _self.showImage();
                    },100)
                }else {
                    // msg("查询项目失败!")
                    layer.open({
                        content: '查询项目失败!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
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
                console.log(response,'获取附件列表');
                if (response.data.code == 200) {
                    var result=response.data.result;
                    if(result.length>0){
                        _self.fujianList=result;
                    }
                    console.log("附件",result);

                }else{
                    // msg("查询附件失败");
                    layer.open({
                        content: '查询附件失败!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        showImage:function () {//查询工程照片
            var _self = this;
            _self.fm.projectSN=_self.form.serialNum;
            if(!_self.fm.projectSN){
                // msg("参数有误，没有项目ID");
                layer.open({
                    content: '参数有误，没有项目ID!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            // Base.load({url:"http://java.winfreeinfo.com/pro_api/getProImg",data:{"projectSN":_self.fm.projectSN},dataType:"json",method:"post"},function(response){
            

            var fromd=new FormData()
            fromd.append("projectSN",_self.fm.projectSN)
            this.$http.post('/pro_api/getProImg',fromd).then(function(response) {
                console.log("查询照片",response)
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
                    // msg("获取数据失败！请稍后重试");
                    // layer.open({
                    //     content: '获取数据失败！请稍后重试!'
                    //     ,skin: 'msg'
                    //     ,time: 1 //2秒后自动关闭
                    //     ,anim:false
                    // });
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        uploadImg:function () {//上传工程照片

            var _self = this;
            if(!_self.fm.projectSN){
                // msg("参数有误，没有项目ID");
                layer.open({
                    content: '参数有误，没有项目ID!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if (!this.uploadStatus && _self.$data.fm.imgUrl == "") {
               // msg("请上传照片");
                //return false;
            }

            if(_self.fm.imgData){//更新工程照片和项目信息
                var params = new FormData();
                params.append("obj",JSON.stringify(_self.fm));
                this.$http.post("/pro_api/saveProImg", params).then(function (response) {
                    console.log(response,'更新工程照片和项目信息');
                    if (response.data.code == 200) {
                        //msg("xia");
                        setTimeout(function () {
                            //返回上传图片的路径并更新缓存中项目列表的信息
                            if(response.data.result){
                                var url=setting.UPLOAD_SERVER_ADDRESS + response.data.result;
                                console.log("上传图片路径",url);
                                //更新项目信息
                                _self.updateProject();
                            }

                        },500)
                    }else{
                        // msg("工程照片上传失败");
                        layer.open({
                            content: '工程照片上传失败!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
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
                layer.open({
                    content: '工程名称不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }else {
                _self.form.projectNameShenbao=_self.form.projectName;
            }
            if(!_self.form.projectNameShort){
                // msg("工程简称不能为空")
                layer.open({
                    content: '工程简称不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(!_self.form.leibie){
                // msg("工程不能为空")
                layer.open({
                    content: '工程不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(!_self.form.fullArea){
                // msg("所在城市不能为空")
                layer.open({
                    content: '所在城市不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(!_self.form.placeShenbao){
                // msg("工程地点不能为空")
                layer.open({
                    content: '工程地点不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }

            if(!_self.form.gongChengFangID){
                // msg("我的组织类型不能为空")
                layer.open({
                    content: '我的组织类型不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }

            if(!_self.$route.query.projectSN){//创建项目
                if(_self.form.gongChengFangID=='9'){
                    if(!_self.roomform.roomName){
                        // msg("专业不能为空")
                        layer.open({
                            content: '专业不能为空!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return;
                    }

                }else  if(_self.form.gongChengFangID=='7'){
                    if(!_self.roomform.description){
                        // msg("供应材料不能为空")
                        layer.open({
                            content: '供应材料不能为空!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return;
                    }
                }else  if(_self.form.gongChengFangID=='13'){
                    if(!_self.roomform.description){
                        // msg("专业不能为空")
                        layer.open({
                            content: '专业不能为空!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return;
                    }
                }else{
                    if(!_self.roomform.companyName) {//||!_self.roomform.companyCreditCode
                        if (type=='save') {
                            if (!_self.roomform.companyName) {
                                msg("公司名称不能为空");
                                layer.open({
                                    content: '公司名称不能为空!'
                                    ,skin: 'msg'
                                    ,time: 1 //2秒后自动关闭
                                    ,anim:false
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
                    console.log(response,1111111111111111111111111);
                    if(response.data.code==200){
                        var result=response.data.result;
                        console.log("房间初始化",result)

                        loading("项目创建成功，正在初始房间信息...");
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
                        // msg("项目创建失败!")
                        layer.open({
                            content: '项目创建失败!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
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
                console.log(response,'项目更新')
                if(response.data.code==200){
                    // msg("项目更新成功!");
                    layer.open({
                            content: '项目更新成功!'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                    setTimeout(function () {
                        appApi.broadcast("reLoad()"); //刷新页面
                        appApi.closeNewWindow();
                    },200)


                }else {
                    // msg("项目更新失败!")
                    layer.open({
                        content: '项目更新失败!'
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        openManageChildList:function () {
            var project = encodeURIComponent(JSON.stringify(this.projectmanage));
            // appApi.openNewWindow(setting.pagepath+'/chatroom/project_member_list.html?projectSN='+this.$route.query.projectSN+"&method=list&project="+project);
            this.$router.push({path:'/static/webstatic/chatroom/project_member_list.html',query:{projectSN:this.$route.query.projectSN,method:'list',project:project}});
        },
        choicePlace:function(){//工程地点选择 - 打开百度地图选择地点
            var _self=this;
            window.webactivity.openBaiduMapPage(1,"",0,0);
            //window.appApi.getLocation();
            window.appApi.callBackFun = function(callFlag, CONTENT) {
                if (callFlag == appApi.callBackFlag.LOCATION) {
                    setTimeout(function () {
                        //CONTENT.longaddress;GPS定位地址
                        //CONTENT.latitudeAndLongitude;GPS定位经纬度
                        _self.form.placeShenbao = CONTENT.shortAddress//地图名称
                        _self.form.PlaceZuobiao = CONTENT.latitudeAndLongitude//经纬度
                    }, 50)
                }
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
        },
        //获取照片
        getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        },
        /**
         * 编辑项目
         */
        editProject() {
            appApi.openNewWindow(setting.pagepath+'/chatroom/xiangmu_edit.html?projectSN='+this.$route.query.projectSN);
        },

        /**
         * 添加子管理员
         */
        addProjectManage(){
            appApi.openNewWindow(setting.pagepath+'/chatroom/project_member_list.html?projectSN='+this.$route.query.projectSN+"&method=list");
        },
        /**
         * 接收子管理员列表
         * @param ary
         */
        setProjectManageChildList(ary){
            this.projectmanage = [];
            this.projectmanageNames = [];
            this.projectmanageIds = [];
            if(ary.length>0){
                this.form.projectmanage = "";
                for(var i=0;i<ary.length;i++){
                    this.projectmanage.push(ary[i]);
                    this.projectmanageNames.push(ary[i].nickName);//存储用户姓名，用于界面显示
                    this.projectmanageIds.push(ary[i].userId);//存储用户ID，需要存到明细表
                    if(i==(ary.length-1)){
                        this.form.projectmanage +=ary[i].nickName;
                    }else{
                        this.form.projectmanage +=ary[i].nickName + ",";
                    }
                }
            }
        },
        /**
         * [getProvince 获取省]
         * @param  {[Object]} regions [省市区数据]
         * @return {[Array]}          [省数组]
         */
        getProvince(regions) {

            return regions['provincesArr'];
        },

        /**
         * [getCity 获取市]
         * @param  {[Object]} regions      [省市区数据]
         * @param  {[String]} provinceName [省名]
         * @return {[Array]}               [市数组]
         */
        getCity(regions, provinceName) {

            return regions['provinces'][provinceName]['citiesArr'];
        },

        /**
         * [getArea 获取区]
         * @param  {[Object]} regions      [省市区数据]
         * @param  {[String]} provinceName [省名]
         * @param  {[String]} cityName     [市名]
         * @return {[Array]}               [区数组]
         */
        getArea(regions, provinceName, cityName) {

            return regions['provinces'][provinceName]['cities'][cityName]['areasArr'];

        },

        reLoad() {
            window.history.go(0)
        },
    },
}
</script>

<style scoped>

</style>
