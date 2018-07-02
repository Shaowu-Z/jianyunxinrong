<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">部门设置</h1>
			<button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide"><span
					class="mui-icon mui-icon-back"></span>返回
			</button>
			<button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="submitData">完成</button>
		</header>
        <section class="mui-content">
            <ul class="mui-table-view eg-table-view eg-detail-list">
                <li class="mui-table-view-cell mui-input-row">
                    <label class="text">部门名称</label>
                    <input type="text" class="mui-input-clear" v-model="none.deptName" />
                    <span class="mui-icon mui-icon-clear"></span>
                </li>
                <!--<li class="mui-table-view-cell">
                    <a class="mui-navigate-right">部门主管<span class="mui-badge mui-badge-inverted"></span></a>
                </li>-->
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="javascript:app.queryDept();"><label class="text">上级部门</label><span class="mui-text-left" style="padding-right: 16px;" v-text="none.parentDeptName"></span></a>
                </li>
            </ul>
            <!--<div v-if="none.hasGroup!='1'" class="singlebox">-->
                <!--&lt;!&ndash;<a class="mui-navigate-right">部门群<span class="mui-badge mui-badge-inverted">未创建</span></a>&ndash;&gt;-->
                <!--创建部门群-->
                <!--<div id="is_create_dept" class="mui-switch mui-switch-blue mui-switch-mini">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div v-if="none.hasGroup=='1'" class="singlebox">-->
                <!--&lt;!&ndash;<a class="mui-navigate-right">部门群<span class="mui-badge mui-badge-inverted">未创建</span></a>&ndash;&gt;-->
                <!--部门群-->
                <!--<span class="mui-badge mui-badge-inverted">已创建</span>-->
            <!--</div>-->

            <!--<h5 class="mui-content-padded">权限设置</h5>-->
            <!--<div class="singlebox">-->
                <!--隐藏内部群-->
                <!--&lt;!&ndash;<div id="is_hide_dept" class="mui-switch mui-switch-blue mui-switch-mini">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>&ndash;&gt;-->
                <!--<div v-if="none.hideDept=='1'" id="is_hide_dept" class="mui-switch mui-switch-blue mui-switch-mini mui-active">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
                <!--<div v-else="" id="is_hide_dept" class="mui-switch mui-switch-blue mui-switch-mini">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<h5 class="mui-content-padded content-added">隐藏后，别人从通讯录无法看到本部门</h5>-->
            <!--<div class="singlebox">-->
                <!--本部门的人仅可见自己-->
                <!--<div v-if="none.showOwn=='1'" id="is_show_own" class="mui-switch mui-switch-blue mui-switch-mini mui-active">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
                <!--<div v-else="" id="is_show_own" class="mui-switch mui-switch-blue mui-switch-mini">-->
                    <!--<div class="mui-switch-handle"></div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<h5 class="mui-content-padded content-added">开启后，本部门员工默认只能看到自己，看不到企业其他任何人。使用场景如：供应商之间相互不可见，且不可见企业通讯录，但是可见指定的员工。</h5>-->
            <div class="singlebox mui-text-center" @click="deleteDept">删除部门</div>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            none:{}
        }
    },
    created: function () {
        var _self = this;
        var deptId = this.$route.query.deptId;
        var param = {deptId:deptId};
        this.$http.post("/concats_api/query_team_dept",param).then(function (response) {
            var resp = response.data.result;
            _self.$data.none = resp;
            if(resp.hideDept=='1'){

            }
            $("#is_hide_dept").attr("class");
            console.info(response.data.result);
        }).catch(function (error) {
            console.info(error);
        });
    },
    methods:{
        submitData: function () {
            //var hasGroup = this.none.hasGroup;
            if(this.none.hasGroup!="1"){
                var classStr = $("#is_create_dept").attr("class");
                if(classStr!=undefined && classStr.indexOf("mui-active")>-1){//创建
                    this.none.hasGroup = "1";
                    this.none.isCreateGroup = "y";
                }else{
                    this.none.hasGroup = "0";
                }
            }

            var classStr2 = $("#is_hide_dept").attr("class");
            if(classStr2!=undefined && classStr2.indexOf("mui-active")>-1){//隐藏内部群
                this.none.hideDept = "1";
            }else{
                this.none.hideDept = "0";
            }
            var classStr3 = $("#is_show_own").attr("class");
            if(classStr3!=undefined && classStr3.indexOf("mui-active")>-1){//隐藏内部群
                this.none.showOwn = "1";
            }else{
                this.none.showOwn = "0";
            }

            var teamId = this.none.teamId;
            var deptId = this.$route.query.deptId;
            var param = {teamId:teamId,deptId:deptId,deptName:this.none.deptName,parentDeptId:this.none.parentDeptId,isCreateGroup:this.none.isCreateGroup,hasGroup:this.none.hasGroup,hideDept:this.none.hideDept,showOwn:this.none.showOwn};
            console.info(param);
            this.$http.post("/concats_api/update_dept",param).then(function (response) {
                console.info(response);
                var respCode = response.data.code;
                if(respCode==202){
                    //重名
                    remin("同一团队中部门名称不允许重复!",2);
                }else{
                    remin("保存成功!",2);
                    window.location.href="../contacts/group_address_m.html?teamId="+teamId;
                }
            }).catch(function(error){
                remin("部门信息修改失败,请联系管理员!",2);
                console.log('部门信息修改失败-'+error);
            });
        },
        deleteDept () {
            console.log(1111)
            let _self = this
            var hasMember = this.$route.query.hasMember;
            if(hasMember=='y'){
                // remin("需要先删除该部门的员工再删除该部门!",2);
                Toast({
                    message: '需要先删除该部门的员工再删除该部门!',
                    position: 'center',
                    duration: 2000
                });
                return;
            }

            var teamId = this.none.teamId;
            layer.open({
                content: '确认删除该部门?(如果该部门有部门群,则群组信息也将删除)',
                icon: 1
                ,btn: ['确认', '取消']
                ,yes: function(index, layero){
                    var deptId = window.location.href.split("?")[1].split("=")[3];
                    var param = {deptId:deptId};
                    _self.$http.post("/concats_api/delete_dept",param).then(function (response) {
                        console.info(response);
                        // remin("部门删除成功!",2);
                        Toast({
                            message: '部门删除成功!',
                            position: 'center',
                            duration: 2000
                        });
                        //console.info(getUrl()+"/contacts/group_address_m.html?teamId="+teamIdB);
                        window.location.href="../contacts/group_address_m.html?teamId="+teamId;
                    }).catch(function(error){
                        // remin("部门删除失败,请联系管理员！",2);
                        Toast({
                            message: '部门删除失败,请联系管理员！',
                            position: 'center',
                            duration: 2000
                        });
                        // console.log('部门删除失败-'+error);
                    });
                }
            });
        },
    }
}
</script>

<style type="text/css">

</style>
