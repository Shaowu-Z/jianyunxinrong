<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">编辑员工</h1>
			<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
					class="mui-icon mui-icon-back"></span>返回
			</button>
			<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="save_member">完成</button>
		</header>
        <section class="mui-content">
			<ul class="mui-table-view eg-table-view eg-detail-list">
				<li class="mui-table-view-cell mui-input-row">
					<label class="text">姓名</label>
					<!--<input type="text" class="mui-input-clear" value="" v-model="none.memberName"/>-->
					<span class="post" v-text="none.memberName"></span>
					<!--<span class="mui-icon mui-icon-clear"></span>-->
				</li>
				<li class="mui-table-view-cell mui-input-row">
					<label class="text">手机号</label>
					<span class="post" v-text="none.phoneNumber"></span>
					<!--input type="text" value="18219149977" v-model="none.phoneNumber"/-->
				</li>
				<li class="mui-table-view-cell mui-input-row">
					<label class="text">职位</label>
					<input type="text" placeholder="选填" v-model="none.position"/>
				</li>
				<li class="mui-table-view-cell" @click="show_depts"  v-on:click="department">
					<a class="mui-navigate-right text" >部门<span class="mui-badge mui-badge-inverted" id="deptName_id" v-text="none.deptName"></span></a>
				</li>
			</ul>
			<!--<h5 class="mui-content-padded">高级模式</h5>
			<div class="singlebox">
				号码隐藏
				<div class="mui-switch mui-switch-blue mui-switch-mini">
					<div class="mui-switch-handle"></div>
				</div>
			</div>-->
			<h5 class="mui-content-padded content-added">隐藏手机号后，手机号在个人资料页隐藏，但仍可以对其发送信息。</h5>
			<div class="singlebox mui-text-center" @click="delete_member">删除员工</div>
		</section>
        <div class="pop-up" style="height: 100%;" id="select_dept" v-if="select_dept">
            <!--<div class="pop-title"><a href="javascript:$('#select_dept').hide();">取消</a>     选择部门</div>-->
            <div class="pop-header">
                <h1 class="p-title">选择部门</h1>
                <button class="mui-btn mui-btn-link mui-pull-left" @click="show">取消</button>
            </div>
            <div class="pop-title"></div>
            <div class="pop-title"></div>

            <div class="pop-content select-box col-xs-6 mui-clearfix" id="deptHtml">

            </div>
        </div>  
    </div>
</template>

<script>
export default {
    data(){
        return{
            none:{
                    deptId:0
                },
            select_dept:false
        }
    },
    created: function () {
        var _self = this;
        var memberId = this.$route.query.memberId;
        //var param = {memberId:memberId};
        this.$http.get("/api/concats_api/query_member?memberId="+memberId).then(function (response) {
            _self.$data.none = response.data.result;
            console.info(response.data.result);
            //this.date.memberName =
            // console.log(this);
            // console.log(this.memberName);
        }).catch(function (error) {
            console.info(error);
        });
    },
    methods:{
        show(){
            this.select_dept = false;
        },
        goBack(){
            this.$router.go(-1)
        },
        delete_member () {
            var _self = this;
            //layer.confirm("确认删除吗?");
            var teamIdB = this.none.teamId;
            if(this.none.memberType=="1"){
                layer.open({
                    content: '管理员不能删除!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }else {
                layer.open({
                    content: '确认删除吗?',
                    icon: 1
                    ,btn: ['确认', '取消']
                    ,yes: function(index, layero){
                        var memberId = _self.$route.query.memberId;
                        console.log(memberId);
                        _self.$http.post("/api/concats_api/delete_member_batch",{memberIds:memberId}).then(function (response) {
                            console.info(response);
                            //loading('创建成员成功！正在跳转！');
                            //console.info(getUrl()+"/contacts/group_address_m.html?teamId="+teamIdB);
                            this.$router.push({path:'/groupAddress',query:{teamId:teamIdB}});
                        }).catch(function(error){
                            console.log('删除成员失败-'+error);
                        });
                    }
                });
            }
            /*
            var teamIdB = this.none.teamId
            var memberId = window.location.href.split("?")[1].split("=")[1];
            axios.post(getUrl()+"/concats_api/delete_member?memberIds="+memberId).then(function (response) {
                console.info(response);
                //loading('创建成员成功！正在跳转！');
                //console.info(getUrl()+"/contacts/group_address_m.html?teamId="+teamIdB);
                window.location.href="../contacts/group_address_m.html?teamId="+teamIdB;
            }).catch(function(error){
                console.log('删除成员失败-'+error);
            });*/
        },
        save_member () {
            let _self = this;
            var teamId = this.none.teamId;
            var deptId = this.none.deptId;
            var memberId = window.location.href.split("?")[1].split("=")[1];
            var param = {memberType:this.none.memberType,memberId:memberId,teamId:this.none.teamId,deptId:deptId,userId:this.none.userId,memberName:this.none.memberName,phoneNumber:this.none.phoneNumber,position:this.none.position,createDate:this.none.createDate};
            //param.projectTeamMemberVOList=members;
            console.log(param);
            this.$http.post("/api/concats_api/update_member", param).then(function (response) {
                console.info(response);
                //loading('创建成员成功！正在跳转！');
                // window.location.href="../contacts/group_address_m.html?teamId="+teamId;
                _self.$router.push({path:'/groupAddress',query:{teamId:teamId}});
            }).catch(function(error){
                console.log('修改成员失败-'+error);
            });
        },
        show_depts () {//选择部门
            // $("#select_dept").show();
            appApi.hideBack();//隐藏返回键
            // getSubDept(this.none.teamId,0);

            console.log(2222222222222);
            function getSubDept(teamId,parentDeptId) {//查询下级部门列表(部门ID为空或者0时，查询团队ID下的一级部门列表)
             
                var deptInId = 0;
                var par = {deptId:parentDeptId,teamId:teamId,parentDeptId:deptInId};
                console.info(par);
                this.$router.post("/api/concats_api/query_dept_list",par).then(function (response) {
                    var newJson =response.data.result;
                    console.info(newJson);
                    var deptHtml = '<ul class="mui-table-view group-list">';
                    for(var j=0;j<newJson.length;j++){
                        var arrJ = newJson[j];
                        var deptId = arrJ.deptId;
                        var deptName = arrJ.deptName;
                        deptHtml+='<li class="mui-table-view-cell mui-radio">'+
                            '<div class="oa-contact-cell mui-table" onclick="app.save_dept()">'+
                            '<div class="oa-contact-input mui-table-cell"><input type="radio" name="check1" value="'+deptId+'='+deptName+'"/></div>'+
                            '<div class="oa-contact-content mui-table-cell">'+
                            '<h4 class="oa-contact-name">'+deptName+'</h4>'+
                            '</div>'+
                            '</div>';

                            //如果有下级部门才显示下级按钮
                            var lowerDeptNum = arrJ.lowerDeptNum;
                            if(lowerDeptNum>0){
                                deptHtml+='<div class="sub-btn" onclick="getSubDept('+teamId+','+deptId+')"><span class="mui-icon iconfont icon-sub"></span>下级</div>';
                            }
                            deptHtml+='</li>';
                    }
                    deptHtml=deptHtml+'</ul>';
                    document.getElementById("deptHtml").innerHTML=deptHtml;
                }).catch(function (error) {
                    //alert("获取部门信息失败,请联系管理员!");
                    console.info(error);
                });
            }
        },
        save_dept: function () {//选择部门
            // $("#select_dept").hide();
            appApi.showBack();//显示返回键
            var arrDept = $('input:radio[name="check1"]:checked').val();
            if(arrDept!=null && arrDept!=undefined){
                var dept_arr = arrDept.split("=");
                this.none.deptId=dept_arr[0];
                this.none.deptName=dept_arr[1];
                $("#deptName_id").text(this.none.deptName);
            }
        },
        getSubDept (parentDeptId) {//查询下级部门列表
            var hrefPar = window.location.href.split('?')[1].split('=')[1];
            var teamId = this.none.teamId;
            var deptInId = 0;
            var par = {deptId:parentDeptId,teamId:teamId,parentDeptId:deptInId};
            console.info(par);
            this.$http.post("/api/concats_api/query_dept_list",par).then(function (response) {
                var newJson =response.data.result;
                console.info(newJson);
                var deptHtml = '<ul class="mui-table-view group-list">';
                for(var j=0;j<newJson.length;j++){
                    var arrJ = newJson[j];
                    var deptId = arrJ.deptId;
                    var deptName = arrJ.deptName;
                    deptHtml+='<li class="mui-table-view-cell mui-checkbox">'+
                        '<div class="oa-contact-cell mui-table" onclick="app.save_dept()">'+
                        '<div class="oa-contact-input mui-table-cell"><input type="checkbox" name="checkbox1" value="'+deptId+'='+deptName+'"/></div>'+
                        '<div class="oa-contact-content mui-table-cell">'+
                        '<h4 class="oa-contact-name">'+deptName+'</h4>'+
                        '</div>'+
                        '</div>'+
                        '<div class="sub-btn" onclick="app.getSubDept('+deptId+')"><span class="mui-icon iconfont icon-sub"></span>下级</div>'+
                        '</li>';
                }
                deptHtml=deptHtml+'</ul>';
                document.getElementById("deptHtml").innerHTML=deptHtml;
            }).catch(function (error) {
                alert("获取部门信息失败,请联系管理员!");
                console.info(error);
            });
        },
        department(){
            this.select_dept = !this.select_dept;
        }
    }
}
</script>

<style scoped>
    .text{
            text-align: left;
        }
    .post{
        position: relative;
        left: -65px;
    }
</style>
