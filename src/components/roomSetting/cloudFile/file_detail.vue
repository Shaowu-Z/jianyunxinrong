<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">详情</h1>
        </header>
        <section class="mui-content" id="file_detail" v-show="status" style="display:none;">
            <ul class="mui-table-view eg-table-view">
                <li class="mui-table-view-cell text">
                    <template v-if="curInfo.projectId == null || curInfo.projectId == undefined || curInfo.projectId == ''">
                        <a class="" @click="rename(isOpe)">文件名
                            <span class="mui-badge mui-badge-inverted" v-text="curInfo.fileName"></span>
                        </a>
                    </template>
                    <template v-else>
                        <a class="mui-navigate-right" @click="rename(isOpe)">文件名
                            <span class="mui-badge mui-badge-inverted" v-text="curInfo.fileName"></span>
                        </a>
                    </template>
                </li>
                <li class="mui-table-view-cell text">
                    文件大小
                    <span class="mui-badge mui-badge-inverted" v-text="curInfo.fileSize"></span>
                </li>
                <li class="mui-table-view-cell text">
                    创建人
                    <span class="mui-badge mui-badge-inverted" v-text="curInfo.createName"></span>
                </li>
                <li class="mui-table-view-cell text">
                    创建时间
                    <span class="mui-badge mui-badge-inverted" v-text="curInfo.createTime"></span>
                </li>
                <li class="mui-table-view-cell">
                    <div v-if="curInfo.projectId == null || curInfo.projectId == undefined || curInfo.projectId == ''">
                        <div class="mui-navigate-right text" @click="openDirMini()">
                            文件路径
                            <span class="mui-badge mui-badge-inverted textspan" v-text="curInfo.pathStr">
                        </span>
                        </div>
                    </div>
                    <div v-else>
                        <div class="mui-navigate-right text" @click="openDirMini()">
                            文件路径
                            <span class="mui-badge mui-badge-inverted textspan" v-text="curInfo.pathStr">
                        </span>
                        </div>
                    </div>
                </li>
                <li class="mui-table-view-cell text">
                    <a class="mui-navigate-right" @click="downloadFile()">来源
                        <span class="mui-badge mui-badge-inverted" v-text="curInfo.createFrom"></span>
                    </a>
                </li>
                <!--<template v-if='reqParams.shareId != "" '>
                    <div class="list-item">
                        <div class="product-info-box">
                            <div class="gray-pro-info">
                                <label class="mui-pull-left">分享给：</label>
                                <div class="rg-con"><span class="value">李四</span><span class="value">王五</span></div>
                            </div>
                            <div class="gray-pro-info"><label class="mui-pull-left">分享期限：</label><span class="value">永久</span></div>
                        </div>
                    </div>
                </template>
                <template v-if='reqParams.affirmId != "" '>
                    <div class="list-item">
                        <div class="product-info-box">
                            <div class="gray-pro-info">
                                <label class="mui-pull-left">应确认人：</label>
                                <div class="rg-con"><span class="value">李四</span><span class="value">王五</span></div>
                            </div>
                            <div class="gray-pro-info">
                                <label class="mui-pull-left">已确认人：</label>
                                <div class="rg-con">
                                    <p><span class="value">赵六 <span class="mui-pull-right">2017-08-12&nbsp;23:25:54</span></span></p>
                                    <p><span class="value">小七 <span class="mui-pull-right">2017-08-11&nbsp;16:20:25</span></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>-->
            </ul>
        </section>
    </div>
</template>

<script>
import {getParam} from '../../../playform/common'
import setting from '../../../playform/config'
import util from '../../../playform/util'
export default {
    data () {
        return {
            from:"list",
            status:false,
            curInfo:{},
            reqParams:{
                id:"",
                shareId:"",
                affirmId:""
            },
            isOpe:false
        }
    },
    created: function () {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if (params.hasOwnProperty("id")) {
			if (params.hasOwnProperty("from")) {
				_self.from = params.from;
				if(_self.from == "share"  && params.hasOwnProperty("shareId")){
					_self.reqParams.shareId = params.shareId;
				}
				if(_self.from == "affirm" && params.hasOwnProperty("affirmId")){
					_self.reqParams.affirmId = params.affirmId;
				}
			}
			if (params.isOpe=='false'||params.isOpe==false){
                _self.isOpe = true;
			}else{
                _self.isOpe = false;
			}
			_self.initData(params.id);
			_self.downLoadInit();
		}
    },
    methods: {
		initData:function (id) {
			var _self = this;
			//获取数据
			_self.reqParams.id = id;
			this.$http.post("/cdish/dish/detail",_self.reqParams).then(function (response) {
				if (response.data.code == 0) {
					var rs = response.data.result;
                    _self.curInfo = rs;
                    console.log(_self.curInfo.createTime)
					_self.curInfo.createTime = util.fnFormat(_self.curInfo.createTime,'yyyy-MM-dd');
					_self.status = true;
				} else {
					msg(response.data.message)
				}
			})
		},
		rename:function (isOpe) {
			if (isOpe){
				return;
			}
			var _self = this;
			if(_self.curInfo.projectId == null || _self.curInfo.projectId == undefined || _self.curInfo.projectId == ""){
				return;
			}
			// appApi.openNewWindow(setting.getPagePath() + "/dish/rename_file.html?id=" + _self.curInfo.id + "&name=" + _self.curInfo.fileName);
            this.$router.push({path:'/static/webstatic/dish/rename_file.html',query:{id:_self.curInfo.id,name:_self.curInfo.fileName}})
		},
		openDirMini:function () {
			var _self = this;
			if(_self.curInfo.projectId == null || _self.curInfo.projectId == undefined || _self.curInfo.projectId == ""){
				return;
			}
			var url = setting.getPagePath() + "/dish/open_dir.html?id=" + _self.curInfo.dirId + "&projectSN=" +  _self.curInfo.projectId;
			if(_self.curInfo.sys){
				url = url + "&isSys=true";
			}
			window.appApi.openNewWindow(url);
		},
		downLoadInit:function () {
			//下载初始化
			var _self = this;
            var html =  '<iframe id="downloadWidget" class="mui-hidden"></iframe>';
            console.log(document.getElementById("file_detail").insertAdjacentHTML)
            document.getElementById("file_detail").insertAdjacentHTML('afterend', html);
			downloadWidget = document.getElementById("downloadWidget");
		},
		getFileUrl:function (id) {
			return "http://java.winfreeinfo.com/cdish/file/download?id=" + id;
		},
		downloadFile:function () {
			var _self = this;
			var id = _self.curInfo.id;
			if(appApi.isApp){
				appApi.openFile( _self.getFileUrl(id));
			}else{
				downloadWidget.src = _self.getFileUrl(id);
			}
			_self.showEditBox = false;
		},
	}
}
</script>

<style type="text/css" scoped>
    .textspan{
        display: inline-block;
        width: 74%;
        text-align: right;
    }
</style>
