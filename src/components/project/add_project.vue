<template>
    <div>
        <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>
	</button>
	<h1 class="mui-title">登记项目</h1>
</header>

	<section class="mui-content mycenter-content">
		<div id="app">
		<ul class="mui-table-view eg-table-view">
			<li class="mui-table-view-cell mui-input-row">
				<label>工程全称</label>
				<input type="text" name="ProjectName" v-model="form.projectName" value="" placeholder="必填"/>
			</li>
			<li class="mui-table-view-cell mui-input-row">
				<label>工程简称</label>
				<input type="text" name="ProjectNameShort" v-model="form.projectNameShort" maxlength="10" value="" placeholder="必填"/>
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="selectProject()">
				<a class="mui-navigate-right" >
					<label>工程类别</label>
					<input type="text" name="leibie" v-model="form.leibie" value="" placeholder="请选择" readonly="readonly"/>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="selectCity()">
				<a class="mui-navigate-right" >
					<label>所在地区</label>
					<input type="text" name="FullArea" v-model="form.fullArea" value="" placeholder="请选择" readonly="readonly"/>
				</a>
			</li>
			<li class="mui-table-view-cell mui-input-row">
				<label>工程地点</label>
				<input type="text" name="PlaceShenbao" v-model="form.placeShenbao" value="" @click="choicePlace()" placeholder="必填" readonly="readonly" />
			</li>
			<li class="mui-table-view-cell mui-input-row" @click="selectType()">
				<a class="mui-navigate-right" >
					<label>我所在方性质</label>
					<input type="text" value="" name="gongChengFangName" v-model="form.gongChengFangName" placeholder="请选择" readonly="readonly"/>
				</a>
			</li>

			<div id="selectDiv" style="display: none">
				<div v-if="form.gongChengFangID=='9'">
					<li  class="mui-table-view-cell mui-input-row">
						<label>专业</label>
						<input type="text" name="roomName" v-model="roomform.roomName" value="" placeholder="必填"/>
					</li>
				</div>
					<li  v-if="form.gongChengFangID=='13'" class="mui-table-view-cell mui-input-row">
						<label>专业</label>
						<input type="text" name="description" v-model="roomform.description" value="" placeholder="必填"/>
					</li>
				<li   v-if="form.gongChengFangID=='7'" class="mui-table-view-cell mui-input-row">
					<label>供应材料</label>
					<input type="text" name="description" v-model="roomform.description" value="" placeholder="必填"/>
				</li>
				<div v-if="form.gongChengFangID!=''&& form.gongChengFangID!='9'">
					<li  class="mui-table-view-cell mui-input-row">
						<label>公司名称</label>
						<input type="text" name="companyName" v-model="roomform.companyName" value="" placeholder="必填"/>
					</li>
					<li  class="mui-table-view-cell mui-input-row">
						<label>信用代码</label>
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

			<div id="cus_zhiye_popver" class="mui-popover mui-popover-action mui-popover-bottom">
				<div class="pop-up2">
					<!--<div class="pop-title">选择组织类型（单选）</div>-->
					<div class="pop-content select-box mui-clearfix">
						<div id="cus_zhiye_popver_sc" class="mui-scroll-wrapper">
							<div class="mui-scroll">
									<div class="s-title" >我的组织类型</div>
									<div class="col-xs-6 mui-clearfix">
										<div class="mui-input-row mui-radio mui-left" v-for="(item,index) in data.zuzhiList" :key="index">
											<div v-if="item.roomClass!='banzu_gaongren'" @click="type_confirm()">
												<label v-text="item.roomClassName"></label>
												<input type="radio"  v-model="data.selectType" name="selecttype" :value="item"/>
											</div>

										</div>
									</div>
							</div>
						</div>
					</div>
					<!--<div class="pop-footer btn-contain">
						<button @click="type_confirm()" type="button" class="mui-btn mui-btn-primary mui-btn-block zrrr">确定</button>
					</div>-->
				</div>
			</div>

	</div>

	</section>
    </div>
</template>
<script>
// import regions from "../../../playform//regions"

export default {
    data () {
    return {
        opt : {"type": "date", "beginYear": 2000, "endYear": new Date().getFullYear()+10}   ,
        uploadStatus : false,
        // paramMap: getParam(window.location.href),//获取地址栏参数
        userName : decodeURI(getCookie("username")),
        userId : getCookie("userid"),
        projectSN:this.$route.query.projectSN,
        urlProjectmanageIDs : this.$route.query.userIds,
        urlProjectmanageNames : this.$route.query.userNames,
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
    }
  },
  created(){
        var _self = this;
        _self.form.userID=userId;
        _self.form.userName=userName;
        //根据ID查询记录
        if(projectSN){
            _self.showRecordById();

        }
        //初始化职业标签
        _self.showzhiyeType();
        appApi.imgPreview.init();
  },
  mounted(){
      function formDate(value) {
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

        /**
         * 编辑项目
         */
        function editProject() {
            appApi.openNewWindow(pagepath+'/chatroom/xiangmu_edit.html?projectSN='+projectSN);
        }

        /**
         * 添加子管理员
         */
        function addProjectManage(){
            appApi.openNewWindow(pagepath+'/chatroom/project_member_list.html?projectSN='+projectSN+"&method=list");
        }


        /**
         * 接收子管理员列表
         * @param ary
         */
        function setProjectManageChildList(ary){
            app.projectmanage = [];
            app.projectmanageNames = [];
            app.projectmanageIds = [];
            if(ary.length>0){
                app.form.projectmanage = "";
                for(var i=0;i<ary.length;i++){
                    app.projectmanage.push(ary[i]);
                    app.projectmanageNames.push(ary[i].nickName);//存储用户姓名，用于界面显示
                    app.projectmanageIds.push(ary[i].userId);//存储用户ID，需要存到明细表
                    if(i==(ary.length-1)){
                        app.form.projectmanage +=ary[i].nickName;
                    }else{
                        app.form.projectmanage +=ary[i].nickName + ",";
                    }
                }
            }
        }


        /**
         * [getProvince 获取省]
         * @param  {[Object]} regions [省市区数据]
         * @return {[Array]}          [省数组]
         */
        function getProvince(regions) {

            return regions['provincesArr'];
        }

        /**
         * [getCity 获取市]
         * @param  {[Object]} regions      [省市区数据]
         * @param  {[String]} provinceName [省名]
         * @return {[Array]}               [市数组]
         */
        function getCity(regions, provinceName) {

            return regions['provinces'][provinceName]['citiesArr'];
        }

        /**
         * [getArea 获取区]
         * @param  {[Object]} regions      [省市区数据]
         * @param  {[String]} provinceName [省名]
         * @param  {[String]} cityName     [市名]
         * @return {[Array]}               [区数组]
         */
        function getArea(regions, provinceName, cityName) {

            return regions['provinces'][provinceName]['cities'][cityName]['areasArr'];

        }   

        function reLoad() {
            window.history.go(0)
        }
  },
   methods:{
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
            var province = getProvince(regions);
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
            msg(content);
        },
        selectProject:function () {//工程类别
            var _self=this;
            var obj=new Object();
            obj.type=2;
            axios.post(getUrl()+"/project_room_api/find_project_category",obj).then(function (response) {
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
                        msg("未查询到工程类别!")
                        return
                    }
                }else {
                    msg("查询工程类别失败!")
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
                axios.post(getUrl()+"/project_room_api/find_contract_room",obj).then(function (response) {
                    //获取房间类别
                    if(response.data.code==200){
                        //得到房间类别
                        var room=response.data.result;
                        if(room.length>0){
                            var formdata = new FormData();
                            formdata.append("roomClass",room[0].roomClass);
                            formdata.append("projectSn",projectSN);
                            //根据房间号查询对应的房间群主
                            axios.post(getUrl()+"/project_room_api/find_contact_room",formdata).then(function (response) {
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
                                        axios.post(getUrl()+"/project_work_api/find_user_info_by_id",obj).then(function (response) {
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
            axios.post(getUrl()+"/pcontact_api/findroomclass",obj).then(function (response) {
                if(response.data.code==0){
                    var result=response.data.result;
                    if(result.length>0){
                        //console.log(result)
                        _self.data.zuzhiList=result;
                    }else {
                        msg("未查询到组织类型!")
                        return
                    }
                }else {
                    msg("查询组织类型失败!")
                }
            }).catch(function (error) {
                console.info(error);
            });
        },
        findroomuserlist:function () {//查询项目子管理员
            var _self = this;
            var formdata = new FormData();
            if(_self.projectmanage.length==0){
                formdata.append("projectSn", projectSN)
                axios.post(getUrl() + "/pcontact_api/findprojectmanage", formdata).then(function (response) {
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
            axios.post(getUrl()+"/project_room_api/find_project",formdata).then(function (response) {
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
            axios.post(getUrl() + "/sass_api/get_uploadfile_info", params).then(function (response) {
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
                axios.post(getUrl() + "/pro_api/saveProImg", params).then(function (response) {
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
                msg("工程名称不能为空")
                return;
            }else {
                _self.form.projectNameShenbao=_self.form.projectName;
            }
            if(!_self.form.projectNameShort){
                msg("工程简称不能为空")
                return;
            }
            if(!_self.form.leibie){
                msg("工程不能为空")
                return;
            }
            if(!_self.form.fullArea){
                msg("所在城市不能为空")
                return;
            }
            if(!_self.form.placeShenbao){
                msg("工程地点不能为空")
                return;
            }

            if(!_self.form.gongChengFangID){
                msg("我的组织类型不能为空")
                return;
            }

            if(!projectSN){//创建项目
                if(_self.form.gongChengFangID=='9'){
                    if(!_self.roomform.roomName){
                        msg("专业不能为空")
                        return;
                    }

                }else  if(_self.form.gongChengFangID=='7'){
                    if(!_self.roomform.description){
                        msg("供应材料不能为空")
                        return;
                    }
                }else  if(_self.form.gongChengFangID=='13'){
                    if(!_self.roomform.description){
                        msg("专业不能为空")
                        return;
                    }
                }else{
                    if(!_self.roomform.companyName) {//||!_self.roomform.companyCreditCode
                        if (type=='save') {
                            if (!_self.roomform.companyName) {
                                msg("公司名称不能为空");
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
                axios.post(getUrl()+"/project_room_api/save_project",formdata).then(function (response) {
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

                        axios.post(getUrl()+"/pcontact_api/initprojectcontact",roomdata).then(function (response) {
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
            axios.post(getUrl()+"/project_room_api/update_project",formdata).then(function (response) {
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

    }
}
</script>
<style>

</style>
