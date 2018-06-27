<template>
    <div id="app">
        <div class="zr_Load" id="loadfist">
            <p class="zr_Load1"></p>
            <p class="zr_Load2"></p>
            <p class="zr_Load3"></p>
        </div>
        <div id="mycenter">
            <div id="app">
                <!--列表页面-->
                <div class="model1" v-if="model==1">
                    <header class="mui-bar mui-bar-nav">
                        <!--<a class="mui-action-back mui-icon iconfont icon-close"></a>-->
                        <h1 class="mui-title">我的项目</h1>
                    </header>
                    <section class="mui-content">
                        <ul class="mui-table-view eg-table-view search-list">
                            <!--工头、材料采购商项目列表-->
                            <div v-for="(item,index) in items" :key="index">
                                <li class="mui-table-view-cell txt">
                                    <a @click="jump(item.serialNum,index)">
                                        <div class="view-pic">
                                            <img v-if="item.img_url!=undefined && item.img_url!='undefined'" v-bind:src=item.img_url>
                                            <img v-if="item.img_url==undefined || item.img_url=='undefined'" src="../../assets/images/defualt.png">
                                            <!--<img src="../../images/defualt.png">-->
                                        </div>
                                        <h4 class="oa-title text" v-text="item.ProjectName"></h4>
                                        <p class="mui-clearfix"><span class="mui-pull-left">开工日期：<span class="data" v-text="item.MissionStartDateOriginal"></span></span>
                                        </p>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </section>
                </div>
                <div class="model2" v-if="model==2">
                    <header class="mui-bar mui-bar-nav">
                        <h1 class="mui-title" v-text="projectname"></h1>
                        <a class="mui-icon iconfont icon-back mui-pull-left" @click="back()"></a>
                    </header>
                    <nav class="g-bar g-bar-tab tab-zr0 nav_foot">
                        <a class="g-tab-item" href="javascript:;">
                            <button class="mui-btn mui-btn-primary mui-pull-right jump_bottom" style="margin-right: 5%;" @click="share">确定&nbsp;(<span v-text="filenum"></span>)</button>
                            <span class="mui-tab-label" style="text-align: left;text-indent: 5%;">已选择&nbsp;<span class="num_all" v-text="filesizeshow"></span></span>
                        </a>
                    </nav>
                    <section class="mui-content">
                        <div class="sift-content cloud-content" v-for="(n,index) in listcount.length" :key="index" v-if="n==1">
                            <ul class="mui-table-view mui-table-view-striped ulactive name1">
                                <li class="mui-table-view-cell liactive" v-for="(site,index) in sites" :key="index" v-if="site.type==1">
                                    <a href="javascript:;" @click="son(site.id,site.type,index,site.parentId)" :name='site.parentId'>
                                        <div class="oa-contact-cell mui-table">
                                            <div class="oa-contact-avatar mui-table-cell">
                                                <span class="my-list-icon label-folder"></span>
                                            </div>
                                            <div class="oa-contact-content mui-table-cell">
                                                <h4 class="oa-contact-name" v-text="site.name"></h4>
                                                <p class="oa-contact-email text"><span v-text='site.updateDate'></span><span v-text="site.size"></span></p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li class="mui-table-view-cell mui-checkbox" v-else @click="sonflie(site.size,site.name+site.suffix,site.path,index,site.id)">
                                    <div class="oa-contact-cell mui-table">
                                        <div class="oa-contact-input mui-table-cell">
                                            <div v-if="getSize(site.size)>=10240">
                                                <input type="checkbox" value="" disabled="disabled"/>
                                            </div>
                                            <div v-else>
                                                <input type="checkbox" value="" checked="checked" v-if="list.indexOf(site.id)>=0" />
                                                <input type="checkbox" value="" v-else/>
                                            </div>
                                        </div>
                                        <div class="oa-contact-avatar mui-table-cell">
                                            <div v-if="site.thumbnail!=''">
                                                <!--<img v-if="site.thumbnail!=null&&site.thumbnail!=''&&fileType(site.suffix).clazz=='label-img'" v-bind:src="site.thumbnail">-->
                                                <span class="my-list-icon label-img">
                                                    <img class="zrimg"  v-bind:src="site.thumbnail">
                                                </span>
                                            </div>
                                            <div v-else>
                                                <span  :class="'my-list-icon '+ fileType(site.suffix)" ></span>
                                            </div>
                                                <!--<img v-if="site.thumbnail!=null&&site.thumbnail!=''&&fileType(site.suffix).clazz=='label-img'" v-bind:src="site.thumbnail">-->
                                                <!--<img v-else src="../../images/defualt.png"/>-->
                                                <!--<img v-else :class="'my-list-icon'+fileType(site.suffix)"/>-->
                                            
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name" v-text="site.name+site.suffix"></h4>
                                            <p class="oa-contact-email text"><span v-text='site.updateDate'></span><span v-text="site.size"></span></p>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {BackCookie} from '../../playform/common'
import setting from '../../playform/config'
import util from '../../playform/util'
export default {
    data () {
        return {
            model: 1,
            items: [],
            listcount: [],
            imgurl: "http://res.winfreeinfo.com:8000",
            sites: [],
            projectname: '',
            fileshares: [],
            filenum: '',
            filesizeshow: '',
            filesizezan:0,
            listsize: [],
            listsizenum: [],
            list: [],
            parentid:[],
            backzr:'',
            backstart:'',
            userid : BackCookie.getCookie("userid"),
            // filesize: "0KB", //选中文件的大小   
        }
    },
    created() {
            this.filelists()
    },
    methods: {
        //获取列表
        filelists: function() {
            var _self = this
            //						appApi.showBack()
            this.$http.post("/chart/column/table_swprojectinfo?used=getMyPro", {}).then(function(response) {
                if(response.data.code == 200) {
                    appApi.showBack()
                    _self.items = response.data.result;
                    console.log(_self.list)
                }
            }).catch(function(error) {
                console.info(error);
            });
        },
        getSize:function (size) {
            var allsize = size.split("K")[1];
            var  newfile = 0;
            if(allsize == "B") {
                newfile = Number(size.split("K")[0])
            } else {
                newfile = Number(size.split("M")[0]) * 1024
            }
            return newfile;
        },
        //点击列表
        jump: function(projectSn, index) {
            var _self = this
            appApi.hideBack()
            if(_self.listcount.indexOf(index) == -1) {
                _self.listcount.push(index)
            }
            console.log(_self.listcount)
            //置空选中的附件
            _self.fileshares = []
            _self.list=[]
            _self.listsize=[]
            _self.parentid=[]
            _self.filesizeshow=''
            _self.filesizezan=0
            _self.filenum=0
            
            _self.model = 2
            _self.backstart=2
            _self.projectSn = projectSn
            this.init(index)
        },
        back: function() {
            var _self = this
            _self.model = 1
        },
        //点击列表跳转对应文件柜
        init: function(index) {
            var _self = this
            //						appApi.hideBack()
            console.log("/cdish/data?projectId=" + _self.projectSn + "&userid=" + this.userid)
            this.$http.post("/cdish/data?projectId=" + _self.projectSn + "&userid=" + this.userid).then(function(response) {
                console.log(response,'数据');
                if(response.data.code == 0) {
                    //								console.log(response.data)
                    // layer.close(loading("加载中"))
                    _self.sites = response.data.result.data.firstList;
                    for(let i=0;i<_self.sites.length;i++){
                        _self.sites[i].updateDate = util.fnFormat(_self.sites[i].updateDate,'yyyy-MM-dd')    
                    }
//								_self.parentid.push(response.data.result.data.firstList[0].id)
                    _self.projectname = response.data.result.data.projectName;
                    //										_self.parentId=response.data.result.data.firstList[0].parentId
                } else {
                    loading("加载中")
                }
            }).catch(function(error) {
                console.info(error);
            });

        },
        son: function(id, type, cla, parentId) {
            var _self = this
            this.$http.post("/cdish/data?projectId=" + _self.projectSn + "&pid=" + id).then(function(response) {
                if(response.data.code == 0) {
                    _self.parentid.push(response.data.result.data.result[0].parentId)
                    _self.sites = response.data.result.data.result
                }
                for(let i=0;i<_self.sites.length;i++){
                        _self.sites[i].updateDate = util.fnFormat(_self.sites[i].updateDate,'yyyy-MM-dd')    
                    }
            })
        },
        sonflie: function(size, name, urls, index, nameid, fileType) {
            var _self = this
            var checkstatus = $(event.target).parents("li").find("input").prop("checked")
            //判断附件是否选中
            if(checkstatus == false) {
                //用来记录选中的附件
                if(_self.list.indexOf(nameid) == -1) {
                    _self.list.push(nameid)
                    _self.listsize.push(size)
                    _self.fileshares.push({
                        "id":nameid,
                        "name": name,
                        "size": size,
                        "urls": urls,
                        "fileType": fileType
                    })
                }
            } else {
                //删除取消选中的附件
                console.log(index,11111111111111)
                console.log(_self.list)
                _self.list.splice(index,1)
                _self.listsize.splice(index,1)
                // console.log("nameid="+nameid)
                for(var i=0;i<_self.fileshares.length;i++){
                    if(_self.fileshares[i].id==nameid){
                        _self.fileshares.splice(i,1)
                    }
                }

            }
//												console.log(_self.fileshares)

            _self.filenum = _self.list.length
            //filenum filesizeshow 
            this.filesize()
        },
        //计算选中文件的大小
        filesize: function() {
            var _self = this
            _self.filesizezan=0
            _self.filesizeshow = ''
            for(var i = 0; i < _self.listsize.length; i++) {
                var pattKB = new RegExp('KB');
                var pattB = new RegExp('B');
                var pattM = new RegExp('MB');
                
                if(pattM.test(_self.listsize[i])) {
                    var size = (parseFloat(_self.listsize[i].split("MB")[0]).toFixed(2) * 100 * 1024 * 1024) / 100
                    _self.filesizezan = parseFloat((_self.filesizezan * 100 + size * 100)).toFixed(2) / 100
                }else if(pattB.test(_self.listsize[i])) { // KB 或者 B
                    if(pattKB.test(_self.listsize[i])) { //kb
                        var size = (parseFloat(_self.listsize[i].split("KB")[0]).toFixed(2) * 100 * 1024) / 100
                        _self.filesizezan = parseFloat((_self.filesizezan * 100 + size * 100)).toFixed(2) / 100
                    } else if(pattB.test(_self.listsize[i])){ //B
                        var size = parseFloat(_self.listsize[i].split("B")[0]).toFixed(2)
                        _self.filesizezan = parseFloat((_self.filesizezan * 100 + size * 100)).toFixed(2) / 100
                    }
                } 
                
                //转换微正常单位
                if(_self.filesizezan>=1048576){
                    _self.filesizeshow=parseFloat((_self.filesizezan*100)/104857600).toFixed(2)+'MB'
                }else if(_self.filesizezan>=1024){
                    _self.filesizeshow=parseFloat((_self.filesizezan*100)/102400).toFixed(2)+"KB"
                }else if(_self.filesizezan>0 && _self.filesizezan<1024){
                    _self.filesizeshow=_self.filesizezan+"B"
                }

            }
            //						console.log(_self.filesizeshow)
        },
        //点击返回按钮
        back: function() {
            var _self = this
            var back
            var parm
            _self.parentid.splice(_self.parentid.length-1,1);
            console.log(_self.parentid)
            var parid=_self.parentid[_self.parentid.length-1]
                if(parid==undefined){
                    back="&userid=" + this.userid
                }else{
                    back='&pid='+parid
                }
                if(_self.backstart!=1){
                this.$http.post("/cdish/data?projectId=" + _self.projectSn + back).then(function(response) {
                    if(response.data.code == 0) {
                        console.log(response.data)
                        if(parid==undefined){
                            _self.sites = response.data.result.data.firstList;
                            for(let i=0;i<_self.sites.length;i++){
                                _self.sites[i].updateDate = util.fnFormat(_self.sites[i].updateDate,'yyyy-MM-dd')    
                            }
                            _self.backstart=1
                        }else{
                            _self.sites = response.data.result.data.result
                        }
                            
                            
//										_self.parentId = response.data.result.data.result[0].parentId
                    }
                }).catch(function(error) {
                    alert(error);
                });
                }else{
                    this.filelists()
                    _self.model = 1
                }

        },
        //点击确定分享
        share: function() {
            var _self = this
            var param = []
            for(var i = 0; i < _self.fileshares.length; i++) {
//							param.push({
//								"chatType": '1',
//								"type": '0',
//								"title": _self.fileshares[i].name,
//								"content": _self.fileshares[i].size,
//								"url": _self.fileshares[i].urls,
//								"thumbImgUrl": _self.fileshares[i].urls,
//							})
                param.push({
                    "fileName":_self.fileshares[i].name,
                    "fileUrl":_self.fileshares[i].urls,
                    "fileSize":_self.fileshares[i].size,
                    "fileType":_self.fileshares[i].fileType
                })
                console.log(_self.fileshares,'发名片');
							if(i==(_self.fileshares.length-1)){
								
								appApi.setSelectData(param);
							}
            }
//						alert(JSON.stringify(param))
            appApi.setSelectData(param)
        },
        //判断文件类型
        fileType: function(suffix) {
            var clazz = "label-";
            if(suffix && suffix.indexOf(".") > 0) {
                suffix = /\.[^\.]+$/.exec(suffix).toString()
            }
            switch(suffix) {
                case ".txt":
                    clazz += "txt";
                    break;
                case ".doc":
                    clazz += "word";
                    break;
                case ".docm":
                    clazz += "word";
                    break;
                case ".dotx":
                    clazz += "word";
                    break;
                case ".dotm":
                    clazz += "word";
                    break;
                case ".docx":
                    clazz += "word";
                    break;
                case ".rtf":
                    clazz += "word";
                    break;
                case ".pdf":
                    clazz += "pdf";
                    break;
                case ".xls":
                    clazz += "excel";
                    break;
                case ".ppt":
                    clazz += "ppt";
                    break;
                case ".pptx":
                    clazz += "ppt";
                    break;
                case ".xlsx":
                    clazz += "excel";
                    break;
                case ".xlsm":
                    clazz += "excel";
                    break;
                case ".xltx":
                    clazz += "excel";
                    break;
                case ".xltm":
                    clazz += "excel";
                    break;
                case ".xlsb":
                    clazz += "excel";
                    break;
                case ".xlam":
                    clazz += "excel";
                    break;
                case ".rm":
                    clazz += "video";
                    break;
                case ".rmvb":
                    clazz += "video";
                    break;
                case ".wmv":
                    clazz += "video";
                    break;
                case ".avi":
                    clazz += "video";
                    break;
                case ".mp4":
                    clazz += "video";
                    break;
                case ".3gp":
                    clazz += "video";
                    break;
                case ".mkv":
                    clazz += "video";
                    break;
                case ".navi":
                    clazz += "video";
                    break;
                case ".mov":
                    clazz += "video";
                    break;
                case ".asf":
                    clazz += "video";
                    break;
                case ".png":
                    clazz += "img";
                    break;
                case ".jpg":
                    clazz += "img";
                    break;
                case ".gif":
                    clazz += "img";
                    break;
                case ".zip":
                    clazz += "zip";
                    break;
                case ".rar":
                    clazz += "zip";
                    break;
                case ".arj":
                    clazz += "zip";
                    break;
                case ".z":
                    clazz += "zip";
                    break;
                case ".apk":
                    clazz += "apk";
                    break;
                case ".mmap":
                    clazz += "mmap";
                    break;
                case ".mpg":
                    clazz += "mpg";
                    break;
                case ".csv":
                    clazz += "csv";
                    break;
                case ".mpp":
                    clazz += "mpp";
                    break;
                case ".html":
                    clazz += "html";
                    break;
                case ".dwg":
                    clazz += "dwg";
                    break;
                default:
                    clazz += "unkown";
                    break;
            }
            return clazz;
        },
    },
    filters: {

    }
}
</script>

<style scoped>
<<<<<<< HEAD
    .txt{
        border-bottom:1px solid #ccc;
        padding-left:10px 15px; 
        margin-left:11px
    }
=======

>>>>>>> f0d54a0c625f49e7c07f15fa5f4d88895fa16cfe
</style>
