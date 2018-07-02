<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">添加子部门</h1>
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goback"><span
                    class="mui-icon mui-icon-back"></span>返回
            </button>
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="addDeptInfo()">完成</button>
        </header>
        <section class="mui-content" id="add_dept">
            <ul class="mui-table-view eg-table-view eg-detail-list">
                <li class="mui-table-view-cell mui-input-row text">
                    <label>部门名称</label>
                    <input type="text" class="mui-input-clear" placeholder="必填" v-model="deptName"/>
                    <span class="mui-icon mui-icon-clear mui-hidden"></span>
                </li>
                <li class="mui-table-view-cell text" @click="show_depts">
                    <a class="mui-navigate-right" >上级部门<span class="mui-badge mui-badge-inverted" style="font-size:16px;padding-right: 210px;color:#000" v-text="parentDeptName"></span></a>
                </li>
            </ul>
            <!--<div class="singlebox">-->
                <!--创建内部群-->
                <!--<div id="is_create_dept" class="mui-switch mui-switch-blue mui-switch-mini mui-active">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<h5 class="mui-content-padded content-added">创建后，部门群会自动关联本部门，新人入职后自动加群</h5>-->

        </section>
        <!--选择上级部门开始-->
        <div class="pop-up" style="display: none; height: 100%;" id="select_dept" v-show="select_dept">
            <!--<div class="pop-title"><a href="javascript:$('#select_dept').hide();">取消</a>     选择部门</div>-->
            <div class="pop-header">
                <h1 class="p-title">选择部门</h1>
                <button class="mui-btn mui-btn-link mui-pull-left" @click="hide">取消</button>
            </div>
            <div class="pop-title"></div>
            <div class="pop-title"></div>

            <div class="pop-content select-box col-xs-6 mui-clearfix" id="deptHtml">
                <ul class="mui-table-view group-list">
                    <li class="mui-table-view-cell mui-radio" v-for="(item,index) in newJson" :key="index">
                            <div class="oa-contact-cell mui-table" @click="save_dept(index)">
                            <div class="oa-contact-input mui-table-cell"><input type="radio"  name="check1" value="'+deptId+'='+deptName+'"/></div>
                            <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name" ref="h4" id="h4">{{item.deptName}}</h4>
                            </div>
                            </div>
                    </li>
                </ul>
            </div>
            <!--<div class="pop-footer btn-contain">
                <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="save_tags">确定</button>
            </div>-->
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            deptName:"",
			parentDeptId:0,
			parentDeptName:"请选择",
			industry_name:"*必选",
			industry_id:0,
			region_name:"",
            members:[],
            teamId: this.$route.query.teamId,
            paDeptId: this.$route.query.teamId,
            select_dept : false,
            newJson:[],
        }
    },
    created(){
			//var paDeptId = window.location.href.split('?')[1].split('=')[2];
			var _self = this;
			var deptId = window.location.href.split("?")[1].split("=")[2];
			var param = {teamId:this.teamId,deptId:deptId};
			this.$http.post("/concats_api/query_team_dept",param).then(function (response) {
				var resp = response.data.result;
				_self.data = resp;
				_self.parentDeptName = resp.deptName;//新建部门时，默认的上级部门为进入的部门
				console.info(resp);
			}).catch(function (error) {
				console.info(error);
			});
	},
    methods:{
        goback(){
            this.$router.go(-1)
        },
        hide(){
            this.select_dept = !this.select_dept
        },
        show_depts () {//选择部门
            // $("#select_dept").show();
            var that = this;
            this.select_dept = !this.select_dept
            appApi.hideBack();//隐藏返回键
            // getSubDept(teamId,0);
            function getSubDept(teamId,deptInId) {//查询下级部门列表(部门ID为空或者0时，查询团队ID下的一级部门列表)
                let deptInIds = 0;
                var par = {deptId:that.parentDeptId,teamId:that.teamId,parentDeptId:deptInIds};
                console.info(par);
                that.$http.post("/concats_api/query_dept_list",par).then(function (response) {
                    that.newJson =response.data.result;
                    console.info(that.newJson);
                }).catch(function (error) {
                    //alert("获取部门信息失败,请联系管理员!");
                    console.info(error);
                });
            }
            getSubDept();
        },
        save_dept: function (index) {//保存选择的部门
                // $("#select_dept").hide();
                this.select_dept = !this.select_dept
				appApi.showBack();//显示返回键
                // var arrDept = $('input:radio[name="check1"]:checked').val();
                var arrDept = this.$refs.h4[index].innerHTML;
                console.log(this.$refs.h4);
				if(arrDept!=null && arrDept!=undefined){
                    var dept_arr = arrDept.split("=");
                    console.log(dept_arr);
                    var parentDeptId =dept_arr[0];
                    console.log(parentDeptId);
                    this.parentDeptId = parentDeptId;
                    console.log(dept_arr);
                    this.parentDeptName=dept_arr[0];
                    console.log(this.parentDeptName);
                    this.paDeptId=dept_arr[0];
                    console.log(this.paDeptId);
				}
			},
        getSubDept: function (parentDeptId) {//查询下级部门列表
            var that = this;
            var hrefPar = window.location.href.split('?')[1].split('=')[1];
            var teamId = hrefPar.split("&")[0];
            //var deptInId = window.location.href.split('?')[1].split('=')[2];
            var deptInId = 0;
            var par = {deptId:parentDeptId,teamId:teamId,parentDeptId:deptInId};
            console.info(par);
            this.$http.post("/concats_api/query_dept_list",par).then(function (response) {
                that.newJson =response.data.result;
                console.info(newJson);
                var deptHtml = '<ul class="mui-table-view group-list">';
                for(var j=0;j<newJson.length;j++){
                    var arrJ = newJson[j];
                    var deptId = arrJ.deptId;
                    var deptName = arrJ.deptName;
                    deptHtml+='<li class="mui-table-view-cell mui-checkbox">'+
                            '<div class="oa-contact-cell mui-table" onclick="save_dept()">'+
                            '<div class="oa-contact-input mui-table-cell"><input type="checkbox" name="checkbox1" value="'+deptId+'='+deptName+'"/></div>'+
                            '<div class="oa-contact-content mui-table-cell">'+
                            '<h4 class="oa-contact-name">'+deptName+'</h4>'+
                            '</div>'+
                            '</div>'+
                            '<div class="sub-btn" onclick="getSubDept('+deptId+')"><span class="mui-icon iconfont icon-sub"></span>下级</div>'+
                            '</li>';
                }
                deptHtml=deptHtml+'</ul>';
                document.getElementById("deptHtml").innerHTML=deptHtml;
            }).catch(function (error) {
                alert("获取部门信息失败,请联系管理员!");
                console.info(error);
            });
        },
        addDeptInfo:function () {
            var _self = this;
            var deptName = this.deptName;
            if(deptName=="" || deptName==null){
                layer.open({
                    content: '请输入部门名称!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(this.paDeptId==undefined){
                this.paDeptId=0;
            }

            //是否创建群组
            // var hasGroup="";
            // var classStr = $("#is_create_dept").attr("class");
            // if(classStr!=undefined && classStr.indexOf("mui-active")>-1){//创建
            //     hasGroup = "1";
            // }else{
            //     hasGroup = "0";
            // }

            var hrefPar = window.location.href.split('?')[1].split('=')[1];
            var teamId = hrefPar.split("&")[0];
            var par = {parentDeptId:0,teamId:teamId,deptName:this.deptName,hasGroup:0};
            console.info(par);
            this.$http.post("/concats_api/add_dept_info",par).then(function (response) {
                var respCode = response.data.code;
                if(respCode==202){
                    //重名
                    //alert("同一团队中部门名称不允许重复!");
                    layer.open({
                        content: '同一团队中部门名称不允许重复!'
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                        ,anim:false
                    });
                }else{
                    alert("创建部门成功!");
                    // window.location.href="../contacts/group_address_m.html?teamId="+teamId;
                    _self.$router.push({path:'/groupAddress',query:{teamId:teamId}})
                }
            }).catch(function (error) {
                alert("创建部门失败,请联系管理员!");
                console.info(error);
            });
        }
    }
}
</script>

<style type="text/css" scoped>
    .text{
        text-align: left
    }
</style>
