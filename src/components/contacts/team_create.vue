<template>
    <div id="app">
       <div class="mui-views">
            <div class="mui-view">
                <div class="mui-navbar">
                </div>
                <div class="mui-pages">
                </div>
            </div>
        </div>
        <div id="team_create" class="mui-page">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" id="btn-referrer" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click='goBack'>
                    <span class="mui-icon mui-icon-left-nav"></span>联系人
                </button>
                <h1 class="mui-center mui-title">登记企(事)业组织</h1>
            </div>
            <div class="fixed-bottom">
                <div id="toastBtn" class="mui-table mui-text-center">
                    <div class="mui-table-cell"><button type="button" @click="submit_data" class="mui-btn mui-btn-primary">立即创建</button></div>
                </div>
            </div>
            <section class="mui-page-content">
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <ul class="mui-table-view eg-table-view eg-detail-list" style="margin-top:44px">
                            <li class="mui-table-view-cell">
                                <a class="mui-navigate-right text">组织类型:<span class="mui-badge mui-badge-inverted">
                                    <select name="teamType" id="teamType" v-model="teamType" @click="selectTeamType(this.value)" style="font-size: 16px;margin-bottom: 0;">
                                        <!--<option class="mui-badge mui-badge-inverted" value="0">请选择</option>-->
                                        <option value="1">企业</option>
                                        <option value="2">政府/事业单位</option>
                                        <!--<option value="3">其他组织</option>-->
                                    </select>
                                </span></a>
                            </li>
                            <li class="mui-table-view-cell mui-input-row">
                                <label class="text">组织名称</label>
                                <input id="team_name_id" type="text" placeholder="不少于3个字" v-model="team_name"/>
                            </li>

                            <li class="mui-table-view-cell mui-input-row">
                                <label class="text" id="label_code" style="white-space: normal;">社会信用代码</label>
                                <input type="text" v-model="creditCode" :placeholder="authph_1"/>
                            </li>

                            <li class="mui-table-view-cell" @click="show_tags" style="display: none">
                                <a class="mui-navigate-right">组织标签<span class="mui-badge mui-badge-inverted" style="font-size: 16px;margin-bottom: 0;">{{tagsNames}}</span></a>
                            </li>
                        </ul>
                        <!--<h5 class="mui-content-padded">认证信息</h5>-->
                        <!--<ul class="mui-table-view eg-table-view">
                            <li class="mui-table-view-cell mui-input-row">
                                <label>统一社会信用代码(组织机构代码)</label>
                                <input type="text" v-model="creditCode" :placeholder="authph_1"/>
                            </li>
                            <li id="org_code" style="display: none" class="mui-table-view-cell mui-input-row">
                                <label>组织机构代码</label>
                                <input type="text" v-model="orgCode" :placeholder="authph_2"/>
                            </li>
                            <li class="mui-table-view-cell  mui-input-row">
                                <label>法定代表人</label>
                                <input type="text" v-model="legalPersonName" :placeholder="authph_3"/>
                            </li>
                        </ul>
                        <h5 class="mui-content-padded">管理员授权认证</h5>-->
                        <ul class="mui-table-view eg-table-view">
                            <li class="mui-table-view-cell">
                                <a class="mui-navigate-right text" @click="showhide">管理员授权认证函<span class="mui-badge mui-badge-inverted">
                                    <template v-if="accreditImg == ''">
                                        待上传
                                    </template>
                                    <template v-else>
                                        已上传
                                    </template>
                                </span></a>
                            </li>
                        </ul>
                        <h5 class="mui-content-padded content-added"></h5>
                        <h5 class="mui-content-padded content-added"></h5>
                    </div>
                </div>

            </section>
            <!--遮罩层-->
            <div class="mui-popup-backdrop" style="display: none; opacity: 0.5" v-show="shade" v-on:click="hide_shade"></div>

            <!--选择方式弹框开始-->
            <div id="add-style" class="mui-popup mui-popup-in" style="display: none" v-show="add_type">
                <div class="mui-popup-title mui-text-left">请选择添加成员的方式</div>
                <ul class="mui-popup-content mui-table-view mui-text-left eg-table-view">
                    <!--<li class="mui-table-view-cell"><a href="team-address.html">从通讯录批量选择</a></li>-->
                    <li class="mui-table-view-cell" v-on:click="show_handwritten">手动输入</li>
                </ul>
            </div>
            <!--选择方式弹框结束-->

            <!--手动输入弹框开始-->
            <div id="handwritten" class="mui-popup popup-pure mui-popup-in" style="display: none" v-show="handwritten">
                <div class="mui-popup-title">添加成员</div>
                <form class="mui-input-group">
                    <div class="sppd-5">
                        <div class="mui-input-row">
                            <label class="mui-text-left">姓名</label>
                            <input type="text" placeholder="请输入姓名" ref="input_name">
                        </div>
                        <div class="mui-input-row">
                            <label class="mui-text-left">手机号</label>
                            <input type="text" placeholder="请输入手机号" ref="input_phone">
                        </div>
                    </div>
                    <!--<p class="content-note"><i>国际手机号需添加国家码，如+1-xxxxxx</i></i></p>-->
                    <div class="mui-button-row mui-table">
                        <button type="button" class="mui-table-cell mui-btn" @click="save_member(1)">保存</button>
                        <button type="button" class="mui-table-cell mui-btn" @click="save_member(0)">保存并继续添加</button>
                    </div>
                </form>
            </div>
            <!--手动输入弹框结束-->

            <!--修改成员弹框开始-->
            <div id="updateMember" class="mui-popup popup-pure mui-popup-in" style="display: none" v-show="updateMember">
                <div class="mui-popup-title">修改成员</div>
                <form class="mui-input-group">
                    <div class="sppd-5">
                        <div class="mui-input-row">
                            <label class="mui-text-left">姓名</label>
                            <input type="text" placeholder="请输入姓名" ref="input_update_name">
                        </div>
                        <div class="mui-input-row">
                            <label class="mui-text-left">手机号</label>
                            <input type="text" placeholder="请输入手机号" ref="input_update_phone">
                        </div>
                    </div>
                    <!--<p class="content-note"><i>国际手机号需添加国家码，如+1-xxxxxx</i></i></p>-->
                    <div class="mui-button-row mui-table">
                        <button type="button" class="mui-table-cell mui-btn" @click="update_save_member()">保存</button>
                        <!--<button type="button" class="mui-table-cell mui-btn" @click="save_member(0)">保存并继续添加</button>-->
                    </div>
                </form>
            </div>
            <!--修改成员弹框结束-->

            <!--组织标签开始-->
            <div class="pop-up" style="display: none;" id="select_tags" v-show="select_tags">
                <div class="pop-title"><a href="javascript:app.select_tags = false;">取消</a>   选择组织标签（单选）</div>
                <div class="pop-content select-box col-xs-6 mui-clearfix" id="tagsHtml">

                </div>
                <div class="pop-footer btn-contain">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="save_tags">确定</button>
                </div>
            </div>
            <!--组织标签结束-->

            <!--行业选择开始-->
            <div class="pop-up" style="display: none;" id="select_industry" v-show="select_industry">
                <div class="pop-title"><a href="javascript:app.select_industry = false;">取消</a>   选择所在行业（单选）</div>
                <div class="pop-content select-box col-xs-6 mui-clearfix" id="industryHtml">

                </div>
                <div class="pop-footer btn-contain">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="save_industry">确定</button>
                </div>
            </div>
            <!--行业选择结束-->

            <!--专业开始-->
            <div class="pop-up" style="display: none;" id="select_major" v-show="select_major">
                <div class="pop-title"><a href="javascript:app.select_major = false;">取消</a>     选择专业（多选）</div>
                <div class="pop-content select-box col-xs-6 mui-clearfix" id="majorHtml">

                </div>
                <div class="pop-footer btn-contain">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="save_major">确定</button>
                </div>
            </div>
            <!--专业结束-->

        </div>
        <div id="manage_auth" class="mui-page" v-show="show">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <button type="button" id="btn-back" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @click="hideshow">
                    <span class="mui-icon mui-icon-left-nav"></span>返回
                </button>
                <h1 class="mui-center mui-title">管理员授权</h1>
            </div>
            <div class="fixed-bottom">
                <div class="mui-table mui-text-center">
                    <div class="mui-table-cell"><button type="button" @click="viewApi.back();" class="mui-btn mui-btn-primary">保存</button></div>
                </div>
            </div>
            <section class="mui-page-content">
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <div class="module01" style="margin-top:15px;">
                            <div class="module01-head">1、请将如下内容手抄或打印到一张A4纸上，所填写的姓名和身份证号码需与本人实名认证一致（管理员必须是本组织人员），加盖公司公章。平台在1-2工作日内核实信息，如非本组织人员，该账户将被封号处理，该账号在平台操作数据将被作废。</div>
                            <div class="module01-body mui-clearfix">
                                <div class="example-box">
                                    <h4 class="title">管理员授权函</h4>
                                    <div class="content">本组织授权的管理员姓名为：<span class="down-line">——</span>，本组织承诺遵守平台服务协议，保证填写信息真实有效并授权组织管理员代表本组织管理维护在本平台的信息</div>
                                    <div class="footer">
                                        管理员姓名：<span class="down-line">——</span><br>
                                        身份证号码：<span class="down-line">——</span><br>
                                        日期：<span class="down-line">——</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="module01">
                            <div class="module01-head">2、拍照上传管理员授权函<br></div>
                            <div class="module01-body">
                                <div class="upload-img" id="uploadImg">
                                </div>
                                <div class="upload-btn mui-text-center">
                                    <button class="mui-btn mui-btn-success">拍照/上传照片</button>
                                    <input type="file" value="" class="input-file" accept="image/png,image/gif,image/jpeg" @click="selectCertImg(this)">
                                </div>
                            </div>
                        </div>
                        <h5 class="mui-content-padded content-added"></h5>
                        <h5 class="mui-content-padded content-added"></h5>
                    </div>
                </div>
            </section>
        </div>
	</div>
</template>

<script>
export default {
    data(){
        return{
            handwritten:false,
            updateMember:false,
            add_type:false,
            shade:false,
            select_tags:false,
            select_industry:false,
            select_major:false,
            team_name:"",
            teamType:"1",
            majorIds:"",
            majorNames:"请选择",
            staffSize:"",
            tagsIds:0,
            tagsNames:"请选择",
            industry_name:"*必选",
            industry_id:0,
            //industry_name:"",
            region_name:"",
            teamAddress:"",
            teamProfile:"",
            creditCode:"",
            orgCode:"",
            legalPersonName:"",
            authph_1:"必须与证件上一致(必填)",
            authph_2:"必须与证件上一致(必填)",
            authph_3:"法人代表姓名(必填)",
            accreditImg:"",
            show:false,
            members:[
                //{memberName:"1", phoneNumber:"1"},
                //{}
            ]
        }
    },
    created:function (){
        this.$http.post("/concats_api/query_tags_or_industry?queryType=0").then(function (response) {
            var newJson =response.data.result;
            console.info(newJson);
            var tagsHtml = "";
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var tagsId = arrJ.tagsId;
                var tagsName = arrJ.tagsName;
                tagsHtml+='<div class="mui-input-row mui-radio mui-left">'+
                    '<label>'+tagsName+'</label><input type="radio" name="checkbox1" value="'+tagsId+'-'+tagsName+'"/>'+
                    '</div>';
            }
            document.getElementById("tagsHtml").innerHTML=tagsHtml;
        }).catch(function (error) {
            //alert("获取标签失败!");
            console.info(error);
        });

        this.$http.post("/concats_api/query_tags_or_industry?queryType=1").then(function (response) {
            var newJson =response.data.result;
            console.info(newJson);
            var industryHtml = "";
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var industryId = arrJ.industryId;
                var industryName = arrJ.industryName;
                industryHtml+='<div class="mui-input-row mui-radio mui-left">'+
                    '<label>'+industryName+'</span></label><input type="radio" name="radio1" value="'+industryId+'-'+industryName+'"/>'+
                    '</div>';
            }
            document.getElementById("industryHtml").innerHTML=industryHtml;
            }).catch(function (error) {
                //alert("获取行业失败!");
            console.info(error);
        });

        //获取专业
        this.$http.post("/concats_api/query_tags_or_industry?queryType=2").then(function (response) {
            var newJson =response.data.result;
            console.info(newJson);
            var majorHtml = "";
            for(var j=0;j<newJson.length;j++){
                var arrJ = newJson[j];
                var majorId = arrJ.majorId;
                var majorName = arrJ.majorName;
                majorHtml+='<div class="mui-input-row mui-checkbox mui-left">'+
                    '<label>'+majorName+'</span></label><input type="checkbox" name="checkbox2" value="'+majorId+'-'+majorName+'"/>'+
                    '</div>';
            }
            document.getElementById("majorHtml").innerHTML=majorHtml;
        }).catch(function (error) {
            //alert("获取行业失败!");
            console.info(error);
        });

    },
    mounted(){

    },
    methods:{
        teamNameCheck(name,type) {
            if(name.length<3){
                // msg();
                layer.open({
                    content: "请输入最少三个字的组织名称!"
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return false;
            }
            if(type == 3 || type=="3"){
                var not = ["公司","有限公司","有限责任公司","股份有限公司","集团","集团有限公司","集团公司"];
                for(var i =0 ; i < not.length ; i++){
                    if(name.indexOf(not[i])>-1){
                        // msg();
                        layer.open({
                            content: '非企业或者政府事业单位的组织名称不允许含有："' + not[i] + '"字样'
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                        return false;
                    }
                }
            }
            var flag = false;
            //判断是否有重名
            $.ajax({
                url: "http://java.winfreeinfo.com/concats_api/check_team_name",
                type: 'post',
                async:false,
                dataType: 'json',
                contentType:"application/json",
                data:JSON.stringify({teamName:name}),
                success: function(data){
                    if(data.code == 0){
                        flag = true;
                    }else{
                        setTimeout(function () {
                            layer.closeAll();
                        },1500);
                        // msg();
                        layer.open({
                            content: data.message
                            ,skin: 'msg'
                            ,time: 1 //2秒后自动关闭
                            ,anim:false
                        });
                    }
                }
            });
            return flag;
        },
        selectCertImg (that) {
            try {
                lrz(that.files[0], {
                    width: 800,
                    height: 600
                }).then(function (rst) {
                    uploadStatus = true;
                    app.$data.accreditImg = rst.base64;
                    document.getElementById("uploadImg").style.backgroundImage =  "url('" + rst.base64 + "')";
                })
            }catch (e){
                alert(e)
            }
        },
        showhide(){
            this.show = !this.show
        },
        hideshow(){
            this.show = !this.show
        },
        goBack(){
            this.$router.go(-1)
        },
        selectTeamType:function (val) {
            console.log(e);
            var _self = this;
            if(val == 1){
                //document.getElementById("org_code").style.display="none";//企业时隐藏
	            _self.authph_1 = "必须与证件上一致(必填)";
                document.getElementById("label_code").innerHTML ="社会信用代码";
	            //_self.authph_2 = "必须与证件上一致(可不填)";
	            //_self.authph_3 = "法人代表姓名(必填)";
            }else if(val == 2){
                //document.getElementById("org_code").style.display="block";
	            _self.authph_1 = "必须与证件上一致(必填)";
                document.getElementById("label_code").innerHTML ="社会信用代码(组织机构代码)";
	            //_self.authph_2 = "必须与证件上一致(可不填)";
	            //_self.authph_3 = "法人代表姓名(可不填)";
            }else{
                //document.getElementById("org_code").style.display="block";
	            _self.authph_1 = "必须与证件上一致(可不填)";
                document.getElementById("label_code").innerHTML ="社会信用代码";
	            //_self.authph_2 = "必须与证件上一致(可不填)";
	            //_self.authph_3 = "法人代表姓名(可不填)";
            }
            this.teamType = val;
        },
        hide_shade: function(){
            this.handwritten = false;
            this.updateMember = false;
            this.add_type = false;
            this.shade = false;
            this.select_industry = false;
             this.select_tags = false;
        },
        show_add: function () {
            this.add_type = true;
            this.shade = true;
        },
        show_handwritten: function(){
            this.add_type = false;
            this.shade = true;
            this.handwritten = true;
        },
        show_tags: function () {//选择标签
            this.select_tags = true;
            this.shade=true
        },
        show_industry: function () {//弹出行业选择
            this.select_industry = true;
            //this.shade = true;
        },
        show_major: function () {//选择专业
            this.select_major = true;
        },
        save_major: function () {//保存所选专业
            var majorIds = "";
            var majorNames = "";
            var arrTags = $('input:checkbox[name="checkbox2"]:checked');
            for(var i =0;i<arrTags.length;i++){
                var majorI = arrTags[i].value;
                var majorIarr = majorI.split("-");
                if(i==arrTags.length-1){
                    majorIds+=majorIarr[0];
                    majorNames+=majorIarr[1];
                }else{
                    majorIds+=majorIarr[0]+",";
                    majorNames+=majorIarr[1]+"  ";
                }
            }
            this.majorNames = majorNames;
            this.majorIds = majorIds;
            this.select_major = false;
        },
        save_tags: function () {//确定选中所选标签
            this.select_tags = false;
            var tagsIds = "";
            var tagsNames = "";
            // var arrTags = $('input:checkbox[name="checkbox1"]:checked');
            // for(var i =0;i<arrTags.length;i++){
            //     var tagsI = arrTags[i].value;
            //     var tagsIarr = tagsI.split("-");
            //     if(i==arrTags.length-1){
            //         tagsIds+=tagsIarr[0];
            //         tagsNames+=tagsIarr[1];
            //     }else{
            //         tagsIds+=tagsIarr[0]+",";
            //         tagsNames+=tagsIarr[1]+"  ";
            //     }
            // }
            var industry_id_name = $('input:radio[name="checkbox1"]:checked').val()
            var industry_arr = industry_id_name.split("-");
            this.tagsIds=industry_arr[0];
            this.tagsNames=industry_arr[1];

            // this.tagsNames = tagsNames;
            // this.tagsIds = tagsIds;
            this.select_tags = false;
            this.shade=false
        },
        save_industry: function(){//确定选中的行业
            this.select_industry = false;
            var industry_id_name = $('input:radio[name="radio1"]:checked').val()
            var industry_arr = industry_id_name.split("-");
            this.industry_id=industry_arr[0];
            this.industry_name=industry_arr[1];
        },
        save_member: function(bool){
            var name = this.$refs.input_name.value;
            var phone = this.$refs.input_phone.value;
            if(name==null || name=="" || phone==null || phone==""){
                layer.open({
                    content: '姓名和手机号不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(!checkPhone(phone)){
                warm("手机号码格式不正确！");
                return ;
            }

            this.$refs.input_name.value="";
            this.$refs.input_phone.value="";
            this.$data.members.push({memberName:name, phoneNumber:phone});
            if(bool){
                this.handwritten = false;
                this.add_type = false;
                this.shade = false;
            }
        },
        update_save_member:function () {
            var name = this.$refs.input_update_name.value;
            var phone = this.$refs.input_update_phone.value;
            if(name==null || name=="" || phone==null || phone==""){
                layer.open({
                    content: '姓名和手机号不能为空!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            if(!checkPhone(phone)){
                warm("手机号码格式不正确！");
                return ;
            }

            this.$data.members[index_m].memberName = name;
            this.$data.members[index_m].phoneNumber = phone;
            this.$refs.input_update_name.value="";
            this.$refs.input_update_phone.value="";

            this.updateMember = false;
            this.shade = false;
        },
        remove_member:function (index) {
            this.members.splice(index,1);//删除members数组的单个数据
        },
        update_member:function (index) {
            index_m = index;
            var member = this.members[index];
            this.$refs.input_update_name.value=member.memberName;
            this.$refs.input_update_phone.value=member.phoneNumber;
            this.updateMember = true;
            this.shade = true;

            /*this.members[index].memberName = "桃子";//修改members数组的单个数据
            this.region_name = "oooX";*/
        },
        submit_data: function () {
        	var _self = this;
            //alert(team_name==null+"==="+team_name);
            console.log("====="+this.team_name);
            var team_name_value = document.getElementById("team_name_id").value;
	        if(this.teamType==undefined || this.teamType==0){
                // msg("请选择组织类型!");
                layer.open({
                    content: '请选择组织类型!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
		        return
	        }
	       if(!this.teamNameCheck(team_name_value,this.teamType)){
	            return;
           }
            if(this.teamType == 1) {
                if(this.creditCode == ""){
                    // msg("请填写社会信用代码");
                    layer.open({
                    content: '请填写社会信用代码!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                    return;
                }
                /*if(this.orgCode == ""){
                 msg("请填写组织结构代码");
                 return;
                 }*/
                /*if(this.legalPersonName == ""){
                 msg("请填写法定代表人");
                 return;
                 }*/
            }
            if(this.teamType == 2) {
                if(this.creditCode == ""){
                    // msg("请填写社会信用代码或组织机构代码");
                    layer.open({
                    content: '请填写社会信用代码或组织机构代码!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                    return;
                }
            }
            // if(this.tagsIds==undefined || this.tagsIds == 0) {
		     //    msg("请选择组织标签!");
		     //    return;
	        // }

	        if(this.teamType == 2 && this.orgCode == "") {//注释，2017.11.25
                //msg("请填写组织结构代码");
                //return;
	        }
	        if(this.accreditImg =="") {
                // msg("请上传管理员授权认证函");
                layer.open({
                    content: '请上传管理员授权认证函!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
		        return;
	        }
	        var subCreate = function () {

	        }
	        if(team_name_value != "" && _self.orgCode != ""){
		        loading("正在认证中...");
	        }else{
		        loading("正在创建组织中...");
	        }
	        subCreate();
	        var members = [];
	        for(var i=0;i<this.members.length;i++){
		        var memberI = this.members[i];
		        members.push({memberName:memberI.memberName,phoneNumber:memberI.phoneNumber});
	        }
	        var param = {
		        teamName:_self.team_name,
		        tagsIds:_self.tagsIds,
		        teamType:_self.teamType,
		        creditCode:_self.creditCode,
		        orgCode:_self.orgCode,
		        legalPersonName:_self.legalPersonName,
		        accreditImg:_self.accreditImg/*,
		        region_name:_self.region_name,
		        projectTeamMemberTList:members*/
	        };
	        this.$http.post("/concats_api/create_team_member", param).then(function (response) {
		        console.info(response);
		        if (response.data.code == 0) {
			        loading('创建成功！正在跳转！');
			        /*setTimeout(function () {
			        	appApi.closeNewWindow("../contacts/address_list.html");
			        },1500)*/
                    setTimeout(function () {
                        appApi.broadcast("reLoad()"); //刷新页面
                        appApi.closeNewWindow();
                    },1500)
		        } else {
			        layer.closeAll();
                    // msg(response.data.message);
                    layer.open({
                        content: response.data.message
                        ,skin: 'msg'
                        ,time: 1 //2秒后自动关闭
                        ,anim:false
                    });
		        }
	        }).catch(function (error) {
		        alert("创建失败，请联系管理员!");
		        layer.closeAll();
		        console.log('创建失败--'+data.message);
	        });
        }

    }
}

</script>

<style>

</style>
