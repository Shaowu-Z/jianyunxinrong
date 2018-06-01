<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title" v-text="page_title">资质管理</h1>
        </header>
        <section  id="add_issue" class="mui-content mycenter-content">
            <!-- <input type="hidden" name="id" v-model="fm.id"> -->
            <ul class="mui-table-view mui-table-view-chevron eg-table-view">
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>企业名称</label>
                        <input type="text" name="organizeName" v-model="fm.organizeName" placeholder="请输入企业名称">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>资质等级</label>
                        <input type="text" name="gradeNames" v-model="fm.gradeNames" placeholder="请输入资质等级">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>证书编号</label>
                        <input type="text" name="certificateCode" v-model="fm.certificateCode" placeholder="请输入证书编号">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>发证时间</label>
                        <input type="text" name="issueTime" v-model="fm.issueTime" id="selectDate" @click="selectDate()"
                            readonly="readonly"
                            placeholder="请选择发证时间">
                    </div>
                </li>
                <li class="mui-table-view-cell">
                    <div class="mui-input-row">
                        <label>发证机关</label>
                        <input type="text" name="issueUnit" v-model="fm.issueUnit" placeholder="请输入发证机关">
                    </div>
                </li>
                <li class="mui-table-view-cell text">
                    <a class="mui-navigate-right">上传证书照片
                        <span class="mui-badge mui-badge-inverted badge-file">
                            <img class="img-upload" style="width: 33px;display: none" id="img_view" v-show="fm.issueUrl!=''" :src="fm.issueUrl"/>
                            <button class="mui-btn">上传照片</button>
                            <input type="file" id="upfile" value="" accept="image/png,image/gif,image/jpeg" v-on:change="selectCertImg(this)" class="input-file">
                        </span>
                    </a>
                </li>
            </ul>
            <div class="fixed-bottom">
                <div id="toastBtn" class="mui-table mui-text-center">
                        <div style="display: none" v-show="fm.id == undefined||fm.id==''" class="mui-table-cell"><button type="button" onclick="submitCert()" class="mui-btn mui-btn-primary">添加资质</button></div>
                        <div style="display: none" v-show="fm.id && fm.id!=''" class="mui-table-cell"><button type="button" onclick="submitCert()" class="mui-btn mui-btn-primary">修改资质</button></div>
                        <div style="display: none" v-show="fm.id && fm.id!=''" class="mui-table-cell"><button type="button" onclick="add_issue.deleteCert()" class="mui-btn">删除资质</button></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            oper:"",
            page_title:"",
            showBox:false,
            fm: {
                id:"",
                teamId:"",
                organizeName: "",
                gradeNames: "",
                certificateCode: "",
                issueTime: "",
                issueUnit: "",
                issueUrl: "",
                imgData:"",
                width:"",
                height:""
            },
        }
    },
    created () {
		var _self = this;
        var url_paramsid = this.$route.query.Id;
        var url_paramsteamId = this.$route.query.teamId;
		if(url_paramsid != ''){
			//取id
			this.getCert(url_paramsid);
			this.oper = "保存";
			this.page_title = "修改资质";
		}else{
			this.page_title = "添加资质";
			this.oper = "添加";
			this.showBox = true;
		}
        this.fm.teamId = url_paramsteamId;
        console.log(this.fm)
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
            //<!-- 获取时间格式 2017-01-03 10:13:48 -->
            // var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
            //<!-- 获取时间格式 2017-01-03 -->
            var t = Y + '-' + m + '-' + d;
            return t;
        }
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
        function selectCertImg (that) {
            try {
                var imgUrl = getObjectURL(document.getElementById("upfile").files[0]);
                lrz(that.files[0], {
                    width: 800,
                    height: 600
                }).then(function (rst) {
                    uploadStatus = true;
                    add_issue.fm["imgData"] = rst.base64;
                    add_issue.fm["width"] = 800;
                    add_issue.fm["height"] = 600;
                    var v = document.getElementById("img_view");
                    v.src = rst.base64;
                    v.style.display = "inline-block"
                })
            }catch (e){
                alert(e)
            }

        }
        function validator(data) {
            for (var o in data) {
                if (!checkParam(o, data)) {
                    return false;
                }
            }
            if (!uploadStatus && add_issue.fm.issueUrl == "") {
                msg("请上传证书照片");
                return false;
            }
            return true;
        }
        function checkParam(key, data) {
            var val = data[key]; //获取值
            if (undefined == val || val == "") {
                //没有值
                if(document.getElementsByName(key) && document.getElementsByName(key)[0]){
                    var m = document.getElementsByName(key)[0].getAttribute("placeholder"); //获取提示信息
                    if(m){
                        msg(m);
                        return false;
                    }else{
                        return true;
                    }

                }else{
                    return true;
                }
            } else {
                return true;
            }

        }
        function submitCert() {
            if (validator(add_issue.fm)) {
                //校验成功，异步提交数据
                axios.post(getUrl() + "/app_team_rz/save_issue", add_issue.fm).then(function (response) {
                    if (response.data.code != 0) {
                        msg(add_issue.oper + "资质失败,请重试")
                    } else {
                        msg(add_issue.oper + "成功！");
                        setTimeout(function () {
                            goToList();
                        }, 2000)
                    }
                }).catch(function (error) {
                    console.info(error);
                });

            }
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
		/*初始化时间选择*/
		selectDate: function () {
			var o = this;
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
				o.fm.issueTime = rs.value;
				picker.dispose(); //释放资源
			})
		},
		getCert:function (id) {
			var _self = this;
			if(id){
				Base.load({url:"/app_team_rz/get_issue?issueId=" + id,dataType:"json"},function(response){
					if (response.code == 0) {
						_self.fm = response.result.issue;
						_self.fm.issueTime = formDate(_self.fm.issueTime);
						_self.image_host = response.result.image_host;
						_self.showBox = true;
					}else{
						msg("获取资质信息失败！请稍后重试");
					}
				},function(error){
					console.info(error);
				})
			}
		}
		,deleteCert:function (id) {
			var _self = this;
			if(undefined == id){
				id = _self.fm.id;
			}
			if(confirm("确认要删除此资质吗？")){
				axios.get(getUrl() + "/app_team_rz/remove_issue?issueId=" + id + "&teamId=" + _self.fm.teamId).then(function (response) {
					if (response.data.code == 0) {
						msg("已成功删除此资质");
						setTimeout(function () {
							goToList();
						}, 1500)
					} else {
						msg(response.data.message);
					}
				}).catch(function (error) {
					console.info(error);
				});
			}
		}
	},
}
</script>

<style scoped>
    .text{
        text-align:left;
    }
</style>
