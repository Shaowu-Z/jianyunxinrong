<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">印章信息</h1> 
        </header>

        <div class="fixed-bottom" id="send_message_id">
            <div class="mui-table mui-text-center">
                <div class="mui-table-cell"><button type="button" @click="saveDate(0)" class="mui-btn mui-btn-primary">保存</button></div>
                <!--<div v-show="items.isFriend==0" class="mui-table-cell"><button @click="addFriends" type="button" class="mui-btn mui-btn-success">加为好友</button></div>-->
                <div id="del" v-show="this.$route.query.opType == 1" class="mui-table-cell"><button @click="saveDate(1)" class="mui-btn mui-btn-success">删除</button></div>
            </div>
        </div>

        <section class="mui-content" id="seal_info">

            <div class="module01-body">
                <div class="upload-img">
                    <img class="mui-action-preview" id="testImg" :src="this.sealInfo.sealData" style="max-height: 300px; min-height: 10em; min-width:15em;">
                    <!--<img class="mui-action-preview" style="display: none;" id="img_view" v-show="fm.imgUrl!=''" :src="image_host + fm.imgUrl"/>-->
                </div>
                <div class="upload-btn mui-text-center">
                    <button class="mui-btn mui-btn-success" @click="aa('testFile')">上传图片</button>
                    <input name="need_hide_div" type="file" id="testFile" value="" ref='Bath' accept="image/png" style="display:none;" class="input-file">
                </div>
            </div>
            <div class="pop-title"> 是否默认印章</div>
            <div class="select-box col-xs-6 mui-clearfix">
                <div class="mui-input-row mui-radio mui-left"><label>是</label><input type="radio" ref="radio1" id="radio1" name="radio1" value="1"></div>
                <div class="mui-input-row mui-radio mui-left"><label>否</label><input type="radio" ref="radio2" id="radio1" name="radio1" value="0"></div>
            </div>

            <textarea id="testArea" :value="this.sealInfo.sealData" style="display: none; width: 100%;height: 30em;"></textarea>
        </section>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import laowu_common from '../laowu/js/laowu_common';
import  '../../playform/lrz.bundle';
export default {
    data(){
        return{
            items:[],
            sealInfo:{},
            opType: this.$route.query.opType,
            tpId: this.$route.query.teamId,
            businessId: '',
            recordId:0,
            canDelete: '',
            sealType:this.$route.query.opType,
            canDelete:'',
        }
    },
    created(){
        if(this.opType==1){//修改
            // $("#del").show();
            var _self = this;
            this.$http.post("/sign/query_seal_list",{id:this.tpId}).then(function (response) {
               
                var resp = response.data.result[0];
                 console.log(resp.isDefaultSign);
                _self.sealInfo = resp;
                if(resp.isDefaultSign=="1"){
                   _self.$refs.radio1.checked=true;
                }else{
                    console.log(_self.$refs.radio1);
                    _self.$refs.radio2.checked=true;
                }
                _self.businessId = resp.businessId;
                _self.recordId=resp.id;
                _self.canDelete=resp.isDefaultSign;
                console.info(response.data.result);
            }).catch(function (error) {
                console.info(error);
            });
        }else{
            this.businessId = this.tpId;//新增时，通过url传过来团队或者项目ID
            setTimeout(()=> {
                this.$refs.radio1.checked=true;//默认选择是
            },50)

        }
    },
    methods:{
        aa (id) {
            let _self = this
            console.log(1111);
            this.$refs['Bath'].click()
            let el = document.getElementById('testFile')
            console.log(el,111111111111111)
            console.log('******************************')
            el.addEventListener('change', (that) => {
                    let _self = this
                    try {
                        // var imgUrl = getObjectURL(document.getElementById("upfile").files[0]);
                        // console.log(imgUrl)
                        lrz(that.target.files[0], {
                            width: 800,
                            height: 600
                        }).then(function (rst) {
                            // uploadStatus = true;
                            console.log(rst.base64)
                            _self.sealInfo["imgData"] = rst.base64;
                            _self.sealInfo["width"] = 800;
                            _self.sealInfo["height"] = 600;
                            var v = document.getElementById("testImg")
                            _self.sealInfo.sealData = rst.base64
                            v.src = rst.base64;
                            v.style.display = "inline-block"
                //			console.info(JSON.stringify(app.$data.fm));
                        })
                    }catch (e){
                        alert(e)
                    }

                // this.sealInfo.sealData = e.path[0].value.slice(12)
                // console.log(e.path[0].value.slice(12))
                // console.log(e)
            })
        },
        goBack(){
            // console.log(this.$refs.radio1.checked);
            this.$router.go(-1)
        },
        saveDate (saveType) {
            let _self = this;
            console.log(this.sealInfo);
            if(!this.sealInfo.sealData||this.sealInfo.sealData=="undefined"){
                layer.open({
                    content: '请上传印章图片!'
                    ,skin: 'msg'
                    ,time: 1 //2秒后自动关闭
                    ,anim:false
                });
                return;
            }
            var params = new FormData();
            params.append("id",this.recordId);
            params.append("sealData",this.sealInfo.sealData);
            params.append("businessId",this.businessId);//企业或者项目ID
            params.append("sealType",this.sealType);//企业或者项目
            if(this.$refs.radio1.checked==true){
                params.append("isDefaultSign","1");//默认
            }else{
                params.append("isDefaultSign","0");//不默认
            }

            var operateType = "";//操作类型 0新增，1修改，2删除
            //saveType:0新增或修改 1删除
            if(saveType==0){
                //类型(0企业，1项目,2印章主键)
                if(this.opType=="0"){
                    //新增
                    operateType = "0";
                }else{
                    //修改
                    operateType = "1";
                }
                params.append("operateType",operateType);
                console.log(params);
                _self.$http.post("/sign/save_seal_info",params).then(function (response) {
                //    laowu_common.loading('保存成功，跳转中...！');
                    Indicator.open('保存成功，跳转中...！');
                    //msg("保存成功");
                    
                    setTimeout(function () {
                        appApi.broadcast("reLoad()"); //刷新页面
                        appApi.closeNewWindow();
                        Indicator.close();
                    },1500)
                }).catch(function (error) {
                    console.info(error);
                });
            }else{
                var message="";
                if(this.canDelete==1){
                    message="该印章是默认印章,删除后可能会导致签章失败,";
                }
                //删除
                operateType = "2";
                params.append("operateType",operateType);
                layer.open({
                    content: message+'确定要删除此印章吗？',
                    icon: 1
                    ,btn: ['确认', '取消']
                    ,yes: function(index, layero){
                        //继续
                        _self.$http.post("/sign/save_seal_info",params).then(function (response) {
                            layer.closeAll();
                            // loading('删除成功，跳转中...！');
                            Indicator.open('删除成功，跳转中...！');
                            //msg("删除成功");

                            setTimeout(function () {
                                appApi.broadcast("reLoad()"); //刷新页面
                                appApi.closeNewWindow();
                                Indicator.close();
                            },1500)
                        }).catch(function (error) {
                            console.info(error);
                        });
                    }
                });
            }

        }
    },
    filters: {
        getImageUrl: function (val) {
            if(val==null || val=="") return getUrl()+"/static/images/60x60.gif";
            return val;
        }
    },
    mounted(){
        function reLoad() {
            window.history.go(0);
        }
        //判断文件格式
        function checkFileExt(filename){
            var flag = false; //状态
            //var arr = ["jpg","png","gif"];
            var arr = ["png"];
            //取出上传文件的扩展名
            var index = filename.lastIndexOf(".");
            var ext = filename.substr(index+1);
            //循环比较
            for(var i=0;i<arr.length;i++)
            {
                if(ext == arr[i])
                {
                    flag = true; //一旦找到合适的，立即退出循环
                    break;
                }
            }
            //条件判断
            return flag;
        }
        function run(input_file, get_data) {
            /*input_file：文件按钮对象*/
            /*get_data: 转换成功后执行的方法*/
            if (typeof (FileReader) === 'undefined') {
                alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
            } else {
                try {
                    /*图片转Base64 核心代码*/
                    var file = input_file.files[0];
                    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                    if (!/image\/\w+/.test(file.type)) {
                        warm("请选择png格式的图片");
                        return false;
                    }
                    if(!checkFileExt(file.name)){
                        warm("请选择png格式的图片");
                        return false;
                    }

                    var reader = new FileReader();
                    reader.onload = function () {
                        get_data(this.result);
                    }
                    reader.readAsDataURL(file);
                } catch (e) {
                    alert('图片转Base64出错啦！' + e.toString())
                }
            }
        }
        function run(input_file, get_data) {
            /*input_file：文件按钮对象*/
            /*get_data: 转换成功后执行的方法*/
            if (typeof (FileReader) === 'undefined') {
                alert("抱歉，你的浏览器不支持 FileReader，不能将图片转换为Base64，请使用现代浏览器操作！");
                
            } else {
                try {
                    /*图片转Base64 核心代码*/
                    var file = input_file.files[0];
                    //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
                    if (!/image\/\w+/.test(file.type)) {
                        warm("请选择png格式的图片");
                        return false;
                    }
                    if(!checkFileExt(file.name)){
                        warm("请选择png格式的图片");
                        return false;
                    }

                    var reader = new FileReader();
                    reader.onload = function () {
                        get_data(this.result);
                    }
                    reader.readAsDataURL(file);
                    console.log(file);
                } catch (e) {
                    alert('图片转Base64出错啦！' + e.toString())
                }
            }
        }
        /**
         * 点击上传
         */
        $("#testFile").change(function () {
            run(this, function (data) {
                $('#testImg').attr('src', data);
            });
        });
        
    }   
}
</script>

<style scoped>

</style>
