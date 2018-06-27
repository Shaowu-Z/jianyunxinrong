<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title" id="titleName"></h1>
            <button class="mui-btn mui-btn-link mui-pull-right" @click="appApi.closeNewWindow()">取消</button>
        </header>
        <section class="mui-content" id="move_select" v-show="loadStatus">
            <div class="mui-scroll">
                    <div id="js-dish-con" class="cloud-content" style="padding-bottom: 50px">
                        <div v-if="curList.length != 0 && loadStatus">
                            <ul class="mui-table-view mui-table-view-striped">
                                <div v-for="(obj,index) in curList" :key="index">
                                    <li class="mui-table-view-cell mui-checkbox">
                                        <a class="" href="javascript:;" @click="nextDir(obj.id,obj.type,obj.name,obj.sysDir,obj.status,$event)">
                                            <div class="oa-contact-cell mui-table">
                                                <div class="oa-contact-avatar mui-table-cell">
                                                    <div v-if="obj.type==1">
                                                        <span class="my-list-icon label-folder"></span>
                                                    </div>
                                                    <div v-else>
                                                <span :class="'my-list-icon ' + fileType(obj.suffix)" >
                                                    <div  v-if="obj.thumbnail != null ">
                                                                <img v-bind:src="imageHost + obj.thumbnail">
                                                    </div>
                                                </span>
                                                    </div>
                                                </div>
                                                <div class="oa-contact-content mui-table-cell">
                                                    <h4 class="oa-contact-name" v-text="obj.name + obj.suffix"></h4>
                                                    <p class="oa-contact-email">
                                                        <span v-text="obj.createName"></span>
                                                        <span>{{obj.updateDate}}</span>
                                                        <span v-text="obj.size"></span>

                                                    </p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </div></div>
                </div>
            <div v-if="curList.length == 0 && loadStatus">
                <div id="empty-view" class="no-group">
                    <div class="no-record-img no-record-cloud"></div>
                    <p>将文件移动到此目录</p>
                </div>
            </div>
            <div class="fixed-bottom" v-show="loadStatus">
                <div class="mui-table no-vline mui-text-center">
                    <div class="mui-table-cell">
                        <div v-if="createBtnStatus">
                            <a class="mui-text-left" @click="createDir">新建文件夹</a>
                        </div>
                        <div v-else>
                            <a class="mui-text-left" v-bind:class="{disabled:!createBtnStatus}">新建文件夹</a>
                        </div>
                    </div>
                    <div class="mui-table-cell">
                        <div v-if="moveBtnStatus">
                            <a class="mui-text-right" @click="doMove">移动到当前目录</a>
                        </div>
                        <div v-else>
                            <a class="mui-text-right" v-bind:class="{disabled:!moveBtnStatus}">移动到当前目录</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import setting from '../../../playform/config'
import {getParam} from '../../../playform/common'
import { Toast } from 'mint-ui'
export default {
    data () {
        return {
            loadStatus:false,
            imageHost:setting.UPLOAD_SERVER_ADDRESS,
            curInfo:{},
            curList:[],
            moveType:0,//0 待归档文件移动（不包括文件夹）（全部显示）  1 标准目录内进行文件移动 （显示标准目录）2 待归档目录下文件和文件夹移动  （显示待归档目录）
            reqParams:{
                nodeId:-1, //文件夹id
                projectId:""
            },
            moveParams:{
                batchIds:"", //多文件（夹）
                id:0, //单文件夹
                projectId:"",
                parentId:0,//目标文件夹id
            },
            isSys:false, //判断是否为待归档目录
            createBtnStatus:false, //新建文件夹显示状态
            moveBtnStatus:false, //移动显示状态
            lastDirId:0, //上一个文件夹id
            curDirId:0 //当前文件夹id
        }
    },
    created: function () {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if (params.hasOwnProperty("moveType") && params.hasOwnProperty("moveItems") &&  undefined != params.moveItems && params.hasOwnProperty("projectId")) {
			_self.moveType = params.moveType;
			_self.moveParams.batchIds = params.moveItems;
			/*if(params.moveItems.indexOf(",") >-1){

			}else if(!isNaN(params.moveItems)){
				_self.moveParams.id = parseInt(params.moveItems);
			}else{
				return;
			}*/
			_self.moveParams.projectId = params.projectId;
			_self.reqParams.projectId = params.projectId;
			_self.initData(); //加载目录结构
		}
    },
    	methods: {
		initData:function (id) {
            // loading("正在加载目录信息...")
            Toast({
                message: "正在加载目录信息...",
                position: 'bottom',
                duration: 1000
            });
			var _self = this;
			//获取数据
			if(id){
				_self.reqParams.nodeId = id;
				_self.lastDirId = id;
				_self.moveBtnStatus = true;
			}else{
				_self.moveBtnStatus = false;
			}
			this.$http.post("/cdish/mlist", _self.reqParams).then(function (response) {
				if (response.data.code == 0) {
					var list = response.data.result;
					if(undefined == id && _self.moveType != 0){
						//说明此时仅显示标准目录或且待归档目录
						for(var i=0;i<list.length;i++){
							if(list[i].sysDir && _self.moveType == 1){
								_self.curList.push(list[i])
							}else if(!list[i].sysDir && _self.moveType == 2){
								_self.curList.push(list[i])
							}
						}
					}else{
						_self.curList = list;
					}
					_self.loadStatus = true;
				} else {
                    // msg("获取云盘目录信息失败")
                    Toast({
                        message: "获取云盘目录信息失败",
                        position: 'bottom',
                        duration: 1000
                    });
				}
				layer.closeAll();
			})
		},
		fileType:function (suffix) {
			var clazz = "label-";
			if(suffix && suffix.indexOf(".") > 0){
				suffix = suffix.substring(suffix.indexOf("."),suffix.length);
			}
			switch (suffix){
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
		nextDir: function (id,type,name,sysDir,status,event) {
			var _self = this;
            var arrs = _self.moveParams.batchIds.split(",");
            console.log(id)
			if(arrs.indexOf(id) != -1){ 
                // msg("无法移动到此文件夹");
                Toast({
                    message: "无法移动到此文件夹",
                    position: 'bottom',
                    duration: 1000
                });
				return;
			}
			if(type == 1){
				_self.lastDirId = _self.curDirId;
				_self.curDirId = id;
				_self.moveParams.parentId = id;
				_self.initData(id);
				if(sysDir){
					//标准目录不允许创建文件夹
					_self.createBtnStatus = false;
					_self.isSys = true;
				}else{
					_self.createBtnStatus = true;
					_self.isSys = false;
				}
			}
		},
		createDir: function () {
			var _self = this;
			if(_self.isSys == true ||  _self.isSys == "true"){
                // msg("系统目录下不可新建文件夹")
                Toast({
                    message: "系统目录下不可新建文件夹",
                    position: 'bottom',
                    duration: 1000
                });
				return;
			}
            // appApi.openNewWindow(getPagePath() + "/dish/create_dir.html?pid=" + _self.curDirId);
            this.$router.push({path:'/dish/create_dir.html',query:{pid:_self.curDirId}})
		},
		doMove:function () {
            // loading("移动中...");
            Toast({
                message: "移动中...",
                position: 'bottom',
                duration: 1000
            });
			var _self = this;
			_self.moveParams.parentId = _self.curDirId;
			this.$http.post("/cdish/batch/move", _self.moveParams).then(function (response) {
				if (response.data.code == 0) {
					var rs = response.data.result;
					if(rs.fail_code == 5018){
						layer.closeAll();
                        // msg(rs.fail_message);
                        Toast({
                            message: rs.fail_message,
                            position: 'bottom',
                            duration: 1000
                        });
						return;
					}
					if(rs.fail_num!=0){
                        // msg("已成功移动" + rs.success_num + "项，" +  rs.fail_num + "项移动失败！");
                        Toast({
                            message: "已成功移动" + rs.success_num + "项，" +  rs.fail_num + "项移动失败！",
                            position: 'bottom',
                            duration: 1000
                        });
					}else{
                        // msg("已成功移动" + rs.success_num + "项");
                        Toast({
                            message: "已成功移动" + rs.success_num + "项",
                            position: 'bottom',
                            duration: 1000
                        });
					}
					setTimeout(function () {
						layer.closeAll();
						appApi.broadcast("refreshPage()");
						if(appApi.isApp){
							appApi.closeNewWindow();
						}
						_self.openDirMini(_self.moveParams.parentId,_self.isSys);
					},2000)
				} else {
					msg(response.data.message)
				}

				setTimeout(function () {
					layer.closeAll()
				},1000)
			})
		},
		openDirMini:function (id,isSys) {
			var _self = this;
			var url = setting.getPagePath() + "/dish/open_dir.html?id=" + id + "&projectSN=" + _self.moveParams.projectId;
			if(isSys){
				url = url + "&isSys=true";
			}
			window.appApi.openNewWindow(url);
		},
	}
}
</script>

<style>

</style>
