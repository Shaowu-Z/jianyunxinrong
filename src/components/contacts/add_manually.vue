<template>
    <div id="app">
        <div id="member_create">
            <header class="mui-bar mui-bar-nav">
                <h1 class="mui-title">添加员工</h1>
                <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack"><span
                        class="mui-icon mui-icon-back"></span>返回
                </button>
            </header>

            <div class="fixed-bottom">
                <div class="mui-table mui-text-center">
                    <div class="mui-table-cell"><button type="button" class="mui-btn mui-btn-primary" @click="submit_data">保存并继续添加</button></div>
                </div>
            </div>
            <section class="mui-content">
                <ul class="mui-table-view eg-table-view eg-detail-list text">
                    <li class="mui-table-view-cell mui-input-row">
                        <label>姓名</label>
                        <input type="text" class="mui-input-clear" placeholder="必填"  v-model="member_name"/>
                        <span class="mui-icon mui-icon-clear mui-hidden"></span>
                        <!--<span class="btn-select"></span> -->
                    </li>
                    <li class="mui-table-view-cell mui-input-row">
                        <label>手机号</label>
                        <input type="text" class="mui-input-clear" placeholder="必填"  v-model="phone_number"/>
                        <span class="mui-icon mui-icon-clear mui-hidden"></span>
                    </li>

                    <li class="mui-table-view-cell mui-input-row">
                        <label>职位</label>
                        <input type="text" class="mui-input-clear" placeholder="选填" v-model="position"/>
                        <span class="mui-icon mui-icon-clear mui-hidden"></span>
                    </li>
                    <li class="mui-table-view-cell">
                        <a class="mui-navigate-right" @click="show_dept_select">部门<span class="mui-badge mui-badge-inverted" id="dept_name_id">选择</span></a>
                    </li>
                </ul>
                <!--<h5 class="mui-content-padded">高级设置</h5>
                <ul class="mui-table-view eg-table-view eg-detail-list">
                    <li class="mui-table-view-cell mui-input-row">
                        <label>员工ID</label>
                        <input type="text" class="mui-input-clear" placeholder="选填"/>
                        <span class="mui-icon mui-icon-clear mui-hidden"></span>
                    </li>
            </ul>
            <h5 class="mui-content-padded content-added">员工在企业的唯一标识，用于系统开发平台接口中，该字段设置后不可修改</h5>-->

            </section>
        </div>

        <div class="pop-up" style="display: none;height: 100%;" id="select_dept" v-show="select_dept">
            <div class="pop-header">
                <h1 class="p-title">选择部门</h1>
                <button class="mui-btn mui-btn-link mui-pull-left" @click="hide">取消</button>
            </div>
            <div class="pop-title"></div>
            <div class="pop-title"></div>

            <div class="pop-content select-box col-xs-6 mui-clearfix" id="deptHtml">

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
            member_name:"",
            phone_number:"",
            position:"",
            select_dept: false,
            teamId : this.$route.query.teamId,
            deptId: this.$route.query.deptId,
            fun: '',
            goUrl : '',
        }
    },
    methods:{
        hide(){
            this.select_dept = !this.select_dept;
        },
        goBack(){
            this.$router.go(-1)
        },
        show_dept_select () {
            // $("#select_dept").show();//显示部门选择
            this.select_dept = !this.select_dept;
            appApi.hideBack();//隐藏返回键
            // getSubDept(teamId,0);
        },
        save_dept(){
            var arrDept = $('input:radio[name="check1"]:checked').val();
            console.log(arrDept);
            if(arrDept!=null && arrDept !=undefined){
                deptId = arrDept.split("=")[0];
                $("#dept_name_id").text(arrDept.split("=")[1]);
                // $("#select_dept").hide();
                this.select_dept = !this.select_dept;
            }
            //$("#select_dept").hide();
            appApi.showBack();
        },
        submit_data: function () {
            var _self = this;
            var memberName =  this.member_name;
            var phone =  this.phone_number;
            if(memberName=="" || phone==""){
                alert("姓名和手机号不能为空！");
                return ;
            }
            if(!this.fun(phone)){
                alert("手机号码格式不正确！");
                return ;
            }

            //var teamId = window.location.href.split("?")[1].split("=")[2];
            var param = {createType:"1",memberName:this.member_name,phoneNumber:this.phone_number,position:this.position,teamId:this.teamId,deptId:this.deptId};
            //param.projectTeamMemberVOList=members;
            console.log(param);
            this.$http.post("/concats_api/create_member", param).then(function (response) {
                console.info(response);
                /*layer.open({
                    content: '创建成功!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });*/
                layer.open({
                    content: '创建成功!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                setTimeout(function () {
                    // window.location.href= this.goUrl;
                    var type = _self.$route.query.type;
                        if(type==0){
                            _self.$router.push({path:'/add_manually',query:{type:0,teamId:_self.teamId}});
                        }
                        if(type==1){
                            _self.$router.push({path:'/add_manually',query:{type:0,teamId:_self.teamId,deptId:_self.deptId}});
                        }
                },1000);
             }).catch(function(error){
                 layer.open({
                    content: '创建失败!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
             });

        }

    },
    mounted(){
        //校验手机号
        this.fun = function checkphone(phone){
            var pattern = /^1[34578]\d{9}$/;
            var flag = pattern.test(phone);
            return flag;
        }
    }
}
</script>

<style scoped>
    .text{
        text-align: left;
    }
</style>
