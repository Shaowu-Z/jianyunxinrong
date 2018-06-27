<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav" id="js-head">
            <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>
            </button>
            <div class="search-box mui-pull-left">
                <form method="get" onsubmit="return search.search()">
                    <div class="search-inner input-row">
                        <span class=" mui-icon mui-icon-search" onclick="search.search()"></span>
                        <input type="search" v-model="keyword" class="search-input" placeholder="请输入文件名或者文件夹名">
                        <span class="mui-icon mui-icon-clear" onclick="search.cleanIpt()"></span>
                    </div>
                </form>
            </div>
        </header>
        <section class="mui-content" id="dish_content" v-show="loadStatus">
            <div id="pullrefresh" class="mui-content mui-scroll-wrapper" style="top:51px" v-bind:class="{list_select:selectMode}">
                <div class="mui-scroll">
                    <div id="js-dish-con" class="cloud-content">
                        <div v-if="curList.length != 0 && status == 1">
                            <ul class="mui-table-view mui-table-view-striped">
                                <div v-for="(obj,index) in curList" :key="index">
                                    <li class="mui-table-view-cell mui-checkbox" v-bind:class="{disabled:obj.status==1}" v-longtouch="timeOutEvent">
                                        <a class="" href="javascript:;" @click="openDir(obj.id,obj.type,obj.name,obj.suffix,obj.status,$event)">
                                            <div class="oa-contact-cell mui-table">
                                                <div v-show="selectMode && obj.status==0" class="oa-contact-input mui-table-cell">
                                                    <input type="checkbox" name="selectItem" :data-type="obj.type"  v-bind:value="obj.id" onchange="app.selectEvent(this)" />
                                                </div>
                                                <div class="oa-contact-avatar mui-table-cell">
                                                    <div v-if="obj.type==1">
                                                        <span class="my-list-icon label-folder"></span>
                                                    </div>
                                                    <div v-else>
                                                    <span :class="'my-list-icon ' + fileType(obj.suffix)" >
                                                        <div  v-if="obj.thumbnail != null ">
                                                                    <img v-bind:src="obj.thumbnail">
                                                        </div>
                                                    </span>
                                                    </div>
                                                </div>
                                                <div class="oa-contact-content mui-table-cell">
                                                    <h4 class="oa-contact-name" v-text="obj.name + obj.suffix"></h4>
                                                    <p class="oa-contact-email">
                                                        <span v-text="obj.createName"></span>
                                                        <span>{{obj.updateDate | formDate}}</span>
                                                        <span v-text="obj.size"></span>

                                                    </p>
                                                </div>
                                            </div>
                                            <!--<button class="mui-btn mui-btn-primary mui-btn-outlined">设置权限</button>-->
                                            <button v-show="itemEditShow(obj.type)" class="mui-btn mui-btn-link iconfont icon-more" @click="itemEdit(obj.id,obj.type,obj.name,obj.suffix,obj.status,obj.userId,$event)"></button>
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </div>
                        <div id="loadMore" style="display: none" class="mui-pull-bottom-tips"><div class="mui-pull-bottom-wrapper"><span class="mui-pull-loading"></span></div></div>
                    </div>
                </div>
            </div>
            <div v-if="curList.length == 0 && status == 1">
                <div id="empty-view" class="no-group">
                    <div class="no-record-img no-record-cloud"></div>
                    <p>暂无关于“{{pageParams.keyword}}”的文件和目录</p>
                </div>
            </div>

            <!--编辑文件夹弹框开始-->
            <div class="mui-backdrop" v-show="showEditBox" @click="showEditBox=!showEditBox" style="display: none;z-index: 999;"></div>
            <div id="editBox" class="floorzr" style="position: fixed;bottom: 0;width: 100%;margin-bottom: 0;display: none;" v-show="showEditBox">
                <p class="floorzr-title" v-text="editItem.name + editItem.suffix"></p>
                <ul class="mui-row mui-grid-view mui-grid-12">
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-4">
                        <div class="menu-item" @click="itemShare(editItem.id)">
                            <span class="mui-icon iconfont icon-share"></span>
                            <span class="menu-item-name" >分享</span>
                        </div>
                    </li>
                    <li v-show="editItem.type == 2" class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-4">
                        <div class="menu-item"  @click="itemDetail(editItem.id,editItem.type,editItem.name,editItem.suffix,editItem.status,$event)">
                            <span class="mui-icon iconfont icon-help"></span>
                            <span class="menu-item-name">文件详情</span>
                        </div>
                    </li>
                </ul>
                <p class="remov" onclick="app.$data.showEditBox = false">取消</p>
            </div>
            <!--编辑文件夹弹框结束-->


            <div style="position:absolute; top:0px; width: 100%; height: 100%; background-color: #000; z-index: 999; opacity: 0.3; display: none" id="shade" v-show="shareSetShow" @click="shareSetShow=!shareSetShow"></div>
            <!--底部选项卡-->
            <div class="mui-backdrop" v-show="selectEdit" @click="selectEdit=!selectEdit" style="display: none;z-index: 999;"></div>
            <nav class="g-bar g-bar-tab tab-zr0" v-show="selectMode" style="display: none">
                <a class="g-tab-item" href="javascript:;">
                    <span class="mui-icon iconfont icon-more mui-pull-right jump_bottom" @click="openSelectEdit()" style="margin-right: 5%;"></span>
                    <span class="mui-tab-label" style="text-align: left;text-indent: 5%;">已选择<span class="num_all" v-text="selectCount"></span>项</span>
                </a>
            </nav>
            <div class="floorzr" v-show="selectEdit && !shareSetShow" style="display:none;position: fixed;bottom: 0px;width: 100%;margin-bottom: 0;">
                <p class="floorzr-title" v-text="selectCount + '个文件（夹）'"></p>
                <ul class="mui-row mui-grid-view mui-grid-12">
                    <li v-show="canShare" class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-4" @click="batchShare()">
                        <div class="menu-item">
                            <span class="mui-icon iconfont icon-share"></span>
                            <span class="menu-item-name">分享</span>
                        </div>
                    </li>
                </ul>
                <p class="remov" @click="backSelectMode">取消</p>
            </div>
            <!--选择分享有效期-->
            <div class="pop-up" v-show="shareSetShow" style="display: none;z-index: 1002">
                <div class="pop-title"><span class="title">文件分享有效期</span><span class="btn-title iconfont icon-close" @click="shareSetShow=!shareSetShow"></span></div>
                <div class="pop-content select-box mui-clearfix" style="height: 150px;">
                    <div class="mui-input-row mui-radio mui-left">
                        <label>1天过期</label><input type="radio" checked="checked" name="deadType" value="1" />
                    </div>
                    <div class="mui-input-row mui-radio mui-left">
                        <label>7天过期</label><input type="radio" name="deadType"  value="2" />
                    </div>
                    <div class="mui-input-row mui-radio mui-left">
                        <label>永久有效</label><input type="radio" name="deadType"  value="3" />
                    </div>
                </div>
                <div class="pop-footer btn-contain">
                    <button type="button" class="mui-btn mui-btn-primary mui-btn-block" @click="subShare">确定</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
import { Toast } from 'mint-ui';
import setting from '../../../playform/config'
export default {
    data () {
        return {
          	orixy: '',
            loadStatus: false,
            imageHost: setting.UPLOAD_SERVER_ADDRESS,
            status: 0,
            isIndex: 1, 
            uploadStatus: 0,
            showUpload: true,
            projectId: "", //项目id
            rooId:"",
            teamCode:"",
            pageParams: {
                projectId: "",
                pageSize: 20,
                curPage: 1,
                sortType: 4, //默认按时间倒序排序
                nodeId: "",
                from: "",
                keyword: ""
            },
            sorts: {},
            curSort: {
                type: 4,
                text: "时间倒序排序"
            },
            sortShow: false,
            sysInfo: {
                sysSize: "",
                sysName: "",
                createTime: "",
                id: ""
            },
            firstInfo: {
                size: "",
                name: "",
                createTime: "",
                id: ""
            },
            firstList: [],
            isSys: false,
            isOpe: true,
            canMove: true,
            canShare: true,
            canAffirm: true,
            canCollect: true,
            canDel: true,
            canRename: true,
            collectStatus: false,
            showCollect: false,
            showDelBox: false,
            delTitle: "",
            delMsg: "",
            delFun: void(0),
            curInfo: {},
            curUserId: 0,
            projectManageId: 0,
            curList: [],
            showShade: false,
            editItem: {
                id: 0,
                name: "",
                type: 0,
                suffix: "",
                status: 0,
                collectStatus: false,
                auth: false,
                isOpe:false
            },
            showEditBox: false,
            showEdit: false,
            selectMode: false, //选择模式
            selectEdit: false, //选择操作模式
            selectHasDir: false,
            selectCount: 0,
            timeOutEvent: 0,
            /*分享相关参数*/
            shareItems: "",
            shareSetShow: false,
            externalPerson: [],
            shareId: "",
            isShare: false,
            shareInfo: {},
            shareInfoList: [],
            /*确认相关参数*/
            affirmId: "",
            isOpeAll:false//文件操作所有权限  
        }
    },
    created: function() {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if(params.hasOwnProperty("projectSN") || params.hasOwnProperty("projectSn")) {
            if(params.hasOwnProperty("projectSN"))
				_self.$data.projectId = params.projectSN; //项目id
			else
                _self.$data.projectId = params.projectSn; //项目id
            if(params.hasOwnProperty("teamCode"))
            	_self.$data.teamCode = params.teamCode;
            _self.$data.roomId = params.roomId; //房间id
			if(params.hasOwnProperty("isSys")) {
				_self.$data.isSys = true;
			} else {
				_self.$data.showEdit = true;
			}
			if(params.hasOwnProperty("isOpe")) {
				_self.$data.isOpe = false;
			} else {
				_self.$data.isOpe = true;
			}
			if(params.hasOwnProperty("isShare")) {
				_self.$data.isShare = true;
				_self.$data.pageParams.from = "1";
			}
			if(1 == 1) {
				_self.showHeader();
			}
			if(params.hasOwnProperty("id")) {
				//显示头部
				_self.$data.isIndex = 0;
				_self.$data.id = params.id; //目录id
				if(_self.$data.roomId=="" || _self.$data.roomId=="undefined")
					_self.initData(_self.$data.id, _self.getCurData);//, _self.$data.roomId
				else
                    _self.initData(_self.$data.id, _self.getCurData);//, _self.$data.roomId
				_self.showHeader();
				_self.$data.loadStatus = true;
			} else if(params.hasOwnProperty("keyword")) {
				//搜索
				_self.$data.pageParams.keyword = params.keyword;
				_self.$data.pageParams.projectId = _self.$data.projectId;
				_self.searchData();
				_self.$data.loadStatus = true;
			} else {
				//首目录
				//不显示头部
				//数据初始化
				_self.$data.isIndex = 1;
                if(_self.$data.roomId=="" || _self.$data.roomId=="undefined")
					_self.initFirstData(_self.$data.projectId, _self.getFirstData);//, _self.$data.roomId
				else
					_self.initFirstData(_self.$data.projectId, _self.getFirstData, _self.$data.roomId);//, _self.$data.roomId
				if(!isApp) {
					_self.$data.showUpload = false;
				}
				//_self.$data.showUpload = true;
			}
			_self.uploadInit();
			_self.downLoadInit();
		} else if(params.hasOwnProperty("shareId")) {
			//分享
			_self.$data.shareId = params.shareId;
			var params = {
				shareId: _self.$data.shareId
			};
			console.info(params);
			axios.post(getUrl() + "/cdish/share/detail", params).then(function(response) {
				if(response.data.code == 0) {
//					console.info(response.data.result);
					var rs = response.data.result;
					_self.$data.status = 1;
					_self.$data.loadStatus = true;
					_self.$data.isShare = true;
					_self.$data.shareInfo = rs;
					_self.$data.projectId = rs.projectId;
					_self.$data.shareInfoList = rs.shareItems;
					_self.downLoadInit();
				} else {
					msg(response.data.message);
				}
			}).catch(function(error) {
				layer.closeAll();
				warm("查看分享失败")
			});
		} else if(params.hasOwnProperty("affirmId")) {} else {
			//选择项目
			axios.get(getUrl() + "/work_api/projectname").then(function(resp) {
				if(resp.data.code == 0) {
					var array = resp.data.result;
					document.getElementById("shade").style.display = "block";
					document.getElementById("add-style").style.display = "block";
					if(array) {
						var ht = '<li class="mui-table-view-cell" onclick="javascript:projectClick(\'$projectSN\')">$text</li>';
						var htmlstr = array.length > 0 ? '' : '<li class="mui-table-view-cell">没有参与的项目</li>';
						for(var i = 0; i < array.length; i++) {
							htmlstr += ht.replace("$projectSN", array[i].serialNum).replace("$text", array[i].ProjectName);
						}
						document.getElementById("project_list").innerHTML = htmlstr;
					}
				} else {
					msg("系统报错:" + resp.data.message);
				}
			}).catch(function(err) {
				console.log(err);
			})
		}
    },
    methods:{
        		initData: function(dirId, callback, rommId) {
			var _self = this;
			//获取数据
			var rid = "";
			if(rommId!="" && rommId!="undefined" && rommId!=undefined)
				rid = "&roomId=" + rommId;
			var teamCode = "";
			if(_self.$data.teamCode!="" && _self.$data.teamCode!="undefined" && _self.$data.teamCode!=undefined)
                teamCode = "&teamCode=" + _self.$data.teamCode;
			axios.get(getUrl() + "/cdish/data?projectId=" + _self.$data.projectId + "&dirId=" + dirId + rid+teamCode).then(function(response) {// + "&roomId=" + rommId
				if(response.data.code == 0) {
					var rs = response.data.result;
					if(callback) callback(rs);
				} else {
					msg("获取云盘目录信息失败")
				}
			})
		},
		initFirstData: function(project_id, callback, rommId) {
			var _self = this;
			//获取数据
            var rid = "";
            if(rommId!="" && rommId!="undefined" && rommId!=undefined)
                rid = "&roomId=" + rommId;
            var teamCode = "";
            if(_self.$data.teamCode!="" && _self.$data.teamCode!="undefined" && _self.$data.teamCode!=undefined)
                teamCode = "&teamCode=" + _self.$data.teamCode;
			axios.get(getUrl() + "/cdish/data?projectId=" + project_id + rid+teamCode).then(function(response) {// + "&roomId=" + rommId
				if(response.data.code == 0) {
					var rs = response.data.result;
					if(callback){
                        callback(rs);
					}
				} else {
					msg("获取云盘信息失败")
				}
			})
		},
		initScroll: function() {
			//阻尼系数
			var deceleration = mui.os.ios ? 0.003 : 0.0009;
			var scroll = mui('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true, //是否显示滚动条
				deceleration: deceleration
			});
			var _self = this;
			/*document.querySelector('.mui-scroll-wrapper' ).addEventListener('scroll', function (e) {
			 if (scroll.y <-30) {
			 _self.$data.showUpload = false;
			 } else {
			 _self.$data.showUpload = true;
			 }
			 })*/
			/***********************
			 * 函数：判断滚轮滚动方向
			 * 作者：walkingp
			 * 参数：event
			 * 返回：滚轮方向 1：向上 -1：向下
			 *************************/
			var scrollFunc = function(e) {
				var y = scroll.y;
				var direct = 0
				e = e || window.event;

				if(e.wheelDelta) { //IE/Opera/Chrome
					direct = e.wheelDelta;
				} else if(e.detail) { //Firefox
					direct = e.detail;
				}

				y += direct / 5;
				//console.info(scroll)
				var allH = scroll.element.children[0].clientHeight;
				var t = scroll.wrapperHeight - allH;
				//console.info("t:" + t)
				//console.info(y)
				/*if(t == 0){
				 scroll.scrollTo(0,y);
				 }*/
				if(y > 0 || y < t) {
					return;
				}
				scroll.scrollTo(0, y);
			}
			/*注册事件*/
			if(document.addEventListener) {
				document.addEventListener('DOMMouseScroll', scrollFunc, false);
			} //W3C
			window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari
		},
		initPageFun: function() {
			var _self = this;
			_self.$data.pageParams.curPage = 1;
			mui.init();
			mui.ready(function() {
				pullWidget = mui("#pullrefresh .mui-scroll").pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							_self.$data.pageParams.curPage = 1;
							if(_self.$data.isIndex == 1) {
								if(_self.$data.roomId!="" && _self.$data.roomId!="undefined" && _self.$data.roomId!=undefined)
									_self.initFirstData(_self.$data.projectId, _self.getFirstData, _self.$data.roomId);//, _self.$data.roomId
								else
									_self.initFirstData(_self.$data.projectId, _self.getFirstData);//, _self.$data.roomId
							}
							_self.loadData(function() {
								self.endPullDownToRefresh();
								self.refresh(true);
							});
						}
					},
					up: {
						auto: true,
						contentrefresh: '正在加载...',
						callback: function() {
							var self = this;
							_self.loadData(function(bool) {
								self.endPullUpToRefresh(bool);
							});
						}
					}
				})

			});
            mui("#pullrefresh").on('tap','.mui-checkbox a', function () {//绑定点赞事件
              this.click();
            });
		},
		getFirstData: function(rs) {
			var _self = this;
			if(rs.data.hasOwnProperty("code")) {
				msg(rs.data.message);
				_self.$data.loadStatus = false;
				return;
			}
			_self.$data.sorts = rs.sorts;
			/*系统目录start*/
			if(rs.data.hasOwnProperty("firstList") && rs.data.firstList.length != 0) {
				/*_self.$data.sysInfo.createTime = _self.formDate(rs.data.sys.updateTime);
				 _self.$data.sysInfo.id = rs.data.sys.id;
				 _self.$data.sysInfo.sysName = rs.data.sys.name;
				 _self.$data.sysInfo.sysSize = rs.data.sys_size;
				 /!*系统目录end*!/
				 _self.$data.firstInfo.createTime = _self.formDate(rs.data.first.updateTime);
				 _self.$data.firstInfo.id = rs.data.first.id;
				 _self.$data.firstInfo.name = rs.data.first.name;
				 _self.$data.firstInfo.size = rs.data.first_size;*/
				_self.$data.firstList = rs.data.firstList;
				console.log(rs.data.firstList)
				_self.$data.loadStatus = true;
			} else {
				_self.$data.loadStatus = false;
				msg("当前项目尚未被审核，无法打开云盘")
			}
		},
		getCurData: function(rs) {
			var _self = this;
			if(rs.hasOwnProperty("sorts")) {
				_self.$data.sorts = rs.sorts;
				_self.$data.projectManageId = rs.projectManageId;
				_self.$data.curUserId = rs.curUserId;
				rs = rs.data;
			}
			_self.$data.curInfo.createTime = _self.formDate(rs.updateTime);
			_self.$data.curInfo.id = rs.id;
			_self.$data.curInfo.name = rs.name;
			_self.$data.curInfo.size = rs.size;
			document.getElementById("js-head-name").innerText = _self.$data.curInfo.name;
			if (_self.$data.curInfo.name=="图纸及资料"){
				//该系统文件下可以创建文件夹
                _self.$data.isSys = false;
			}
            if (_self.$data.curInfo.name=="临时文件"){
                //临时文件放开操作所有权限
                _self.$data.isOpeAll = true;
            }

			//完善分页参数
			_self.$data.pageParams.projectId = _self.$data.projectId;
			_self.$data.pageParams.nodeId = _self.$data.curInfo.id;
			_self.initPageFun();
			_self.initSort();
		},
		searchData: function(keyword) {
			var _self = this;
			if(keyword) {
				_self.$data.pageParams.keyword = keyword;
			}
			_self.$data.pageParams.curPage = 1;
			mui.init();
			mui.ready(function() {
				pullWidget = mui("#pullrefresh .mui-scroll").pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							_self.$data.pageParams.curPage = 1;
							_self.loadSearchData(function() {
								self.endPullDownToRefresh();
								self.refresh(true);
							});
						}
					},
					up: {
						auto: true,
						contentrefresh: '正在加载...',
						callback: function() {
							var self = this;
							_self.loadSearchData(function(bool) {
								self.endPullUpToRefresh(bool);
							});
						}
					}
				})
			});
            mui("#pullrefresh").on('tap','.mui-checkbox a', function () {//绑定点赞事件
                this.click();
            });
		},
		createDir: function() {
			var _self = this;
			if(_self.$data.isSys == true || _self.$data.isSys == "true") {
				//msg("系统目录下不可新建文件夹")
				return;
			}
			appApi.openNewWindow(getPagePath() + "/dish/create_dir.html?pid=" + _self.$data.curInfo.id);
		},
		showHeader: function() {
			if(document.getElementById("pullrefresh"))
				document.getElementById("pullrefresh").style.top = "84px";
			if(document.getElementById("js-head"))
				document.getElementById("js-head").style.display = "block";
			if(document.getElementById("sort-list"))
				document.getElementById("sort-list").style.top = "94px";
			if(document.getElementById("dish-tab"))
				document.getElementById("dish-tab").style.top = "44px";
			if(document.getElementById("js-dish-con"))
				addClass(document.getElementById("js-dish-con"), "sift-content");
			if(document.getElementById("dish_content"))
				document.getElementById("dish_content").style.paddingTop = "44px";
			//绑定后退事件
		},
		openDir: function(id, type, name, suffix, status, event) {
			console.info("打开")
			var _self = this;
			if(_self.$data.selectMode) {
				return;
			}
			console.info(_self.$data.sysInfo.id);
			_self.$data.editItem.name = name;
			_self.$data.editItem.id = id;
			_self.$data.editItem.type = type;
			_self.$data.editItem.suffix = suffix;
			_self.$data.editItem.status = status;
			if(type == 1) { /*打开目录*/
                var url = "";
                if(_self.$data.roomId!="" && _self.$data.roomId!="undefined" && _self.$data.roomId!=undefined)
					url = getPagePath() + "/dish/open_dir.html?id=" + id + "&projectSN=" + _self.$data.projectId;// + "&roomId=" + _self.$data.roomId
				else
					url = getPagePath() + "/dish/open_dir.html?id=" + id + "&projectSN=" + _self.$data.projectId;// + "&roomId=" + _self.$data.roomId
				if(id == _self.$data.sysInfo.id || _self.$data.isSys == true || _self.$data.isSys == "true") {
					url = url + "&isSys=true";
				}
				if( _self.$data.isOpe == false || _self.$data.isOpe == "false") {
					url = url + "&isOpe=false";
				}
				if(_self.$data.isShare) {
					url = getPagePath() + "/dish/share_dir.html?id=" + id + "&projectSN=" + _self.$data.projectId + "&isShare=true";
				}
				window.appApi.openNewWindow(url);
			} else {
				_self.downloadFile(id, type, name, suffix, event)
			}
			_self.$data.showEditBox = false;
			event.preventDefault();
			event.stopPropagation();
			return;
		},
		openDirMini: function(id, isSys, isOpe) {
			var arrays = window.location.href.split("?")[1].split("&");
			var map = {};
			for(i = 0; i < arrays.length; i++) {
				var param = arrays[i].split("=");
				map[param[0]] = decodeURI(param[1]);
			}
			//document.cookie = "userid" + "=" + map.userId + ";path=/";
			var _self = this;
            var url;
            if(_self.$data.roomId!="" && _self.$data.roomId!="undefined" && _self.$data.roomId!=undefined){
				url = getPagePath() + "/dish/open_dir.html?id=" + id + "&projectSN=" + _self.$data.projectId + "&roomId=" + _self.$data.roomId;// + "&roomId=" + _self.$data.roomId
            }else{
				url = getPagePath() + "/dish/open_dir.html?id=" + id + "&projectSN=" + _self.$data.projectId;// + "&roomId=" + _self.$data.roomId
            }
            if(isSys) {
				url = url + "&isSys=true";
			}
			if(!isOpe){
                url = url + "&isOpe=false";
			}
			window.appApi.openNewWindow(url);
		},
		itemEditShow: function(type) {
			var _self = this;
			if(_self.$data.isSys) {
				//系统目录
				if(type == 1) {
					return !_self.$data.selectMode;
				} else {
					if(_self.$data.selectMode) {
						return false;
					}
					return true;
				}
			} else {
				return !_self.$data.selectMode;
			}
		},
		operateShow: function(type) {
			var _self = this;
            if(!_self.$data.isOpe) {
                //系统目录
                if(document.getElementById("uoload")!=null)
                    document.getElementById("uoload").style.display = "none";
                // return false;
            } else {
                if(document.getElementById("uoload")!=null)
                    document.getElementById("uoload").style.display = "";
                // return true;
            }
            // 现在只要是文件都有操作权限
			if (type==1){
				return false;
			}else {
                return true;
			}
		},
		itemEdit: function(id, type, name, suffix, status, userId, event) {

			var _self = this;
			/*if(_self.$data.selectMode){
			 msg("请先退出批量选择再进行此操作")
			 return;
			 }*/
			_self.$data.showCollect = false;
			_self.$data.editItem.name = name;
			_self.$data.editItem.id = id;
			_self.$data.editItem.type = type;
			_self.$data.editItem.suffix = suffix;
			_self.$data.editItem.status = status;
            _self.$data.editItem.isOpe = _self.$data.isOpe;
			// if(userId == _self.$data.curUserId || _self.$data.projectManageId == _self.$data.curUserId) {
			// 	_self.$data.editItem.auth = true;
			// } else {
			// 	_self.$data.editItem.auth = false;
			// }
            _self.$data.editItem.auth = false;//群主也不能删除除临时文件以外的所有文件
			console.info("打开列表")
			_self.collectCheck(id, type);
			setTimeout(function() {
				_self.$data.showEditBox = true;
			}, 200)
			if(event) {
				event.preventDefault();
				event.stopPropagation();
			}
			return;
		},
		renameItem: function(id, type, name, suffix, status, event) {
			var _self = this;
			if(type == 1) {
				appApi.openNewWindow(getPagePath() + "/dish/rename_dir.html?id=" + id + "&name=" + name);
			} else {
				appApi.openNewWindow(getPagePath() + "/dish/rename_file.html?id=" + id + "&name=" + name);
			}
			_self.$data.showEditBox = false;
		},
		cancelItem: function(id, type, name, suffix, status, event) {
			//标识作废 或取消作废
			var _self = this;
			var url = getUrl() + "/cdish/file/cancel";
			axios.post(url, {
				id: parseInt(id)
			}).then(function(response) {
				if(response.data.code == 0) {
					msg(response.data.message);
					refreshPage();
				} else {
					msg(response.data.message);
				}
				_self.$data.showEditBox = false;
			}).catch(function(error) {
				layer.closeAll();
				warm("操作失败")
			});
		},
		moveItem: function(id, type, name, suffix, status, event) {
			var _self = this;
			//appApi.openNewWindow(getPagePath() + "/dish/create_dir.html?id=" + id + "&name=" + name);
			_self.$data.showEditBox = false;
			_self.batchCut([id]);
		},
		delItem: function(id, type, name, suffix, status, event) {
			var _self = this;
			//appApi.openNewWindow(getPagePath() + "/dish/create_dir.html?id=" + id + "&name=" + name);
			var okFun = function() {
				var url = "";
				if(type == 1) {
					url = getUrl() + "/cdish/dir/delete";
				} else {
					url = getUrl() + "/cdish/file/delete";
				}
				axios.post(url, {
					id: parseInt(id)
				}).then(function(response) {
					if(response.data.code == 0) {
						msg("删除成功");
						refreshPage();
						appApi.broadcast("refreshPage()");
					} else {
						msg(response.data.message);
					}
				}).catch(function(error) {
					layer.closeAll();
					warm("删除失败")
				});
			}
			var qmsg = "该文件夹下所有的子文件夹和文件都会被删除，确认继续删除吗？";
			var qtitle = "删除文件夹";
			if(type == 2) {
				qmsg = "确认删除该文件吗？";
				qtitle = "删除文件";
			}
			_self.dishConfirm(qtitle, qmsg, okFun);
			_self.$data.showEditBox = false;
		},
		itemDetail: function(id, type, name, suffix, status, event,isOpe) {
			appApi.openNewWindow(getPagePath() + "/dish/file_detail.html?from=list&id=" + id+"&isOpe="+isOpe)
		},
		//电子签署 2017.11.21
		sign:function (id,type,name,suffix,status,event) {
			if(suffix!='.pdf'){
				msg("暂只支持PDF文件的签章!");
				return;
			}
			loading("文件签署中，请不要进行任何操作");
			var _self = this;
			axios.post(getUrl()+"/sign/sign",{id:id,projectId:_self.$data.projectId}).then(function (response) {
				console.info(response.data.result);
				layer.closeAll();
				var res = response.data;
                if(res.code==200){

                    msg("签署成功!");
                    window.location.reload();

                }
				else {
                    warm(res.message);
				}

			}).catch(function (error) {
				console.info(error);
			});
		},
		dishConfirm: function(t, m, f) {
			var _self = this;
			_self.$data.delTitle = t;
			_self.$data.delMsg = m;
			_self.$data.delFun = f;
			_self.$data.showDelBox = true;
		},
		dishConfirmOk: function() {
			var _self = this;
			_self.$data.showDelBox = false;
			var fun = _self.$data.delFun;
			if(fun && fun instanceof Function) {
				fun();
			}
		},
		formDate: function(value) {
			var date = new Date(value);
			var Y = date.getFullYear(),
				m = date.getMonth() + 1,
				d = date.getDate(),
				H = date.getHours(),
				i = date.getMinutes(),
				s = date.getSeconds();
			if(m < 10) {
				m = '0' + m;
			}
			if(d < 10) {
				d = '0' + d;
			}
			if(H < 10) {
				H = '0' + H;
			}
			if(i < 10) {
				i = '0' + i;
			}
			if(s < 10) {
				s = '0' + s;
			}
			//<!-- 获取时间格式 2017-01-03 10:13:48 -->
			//var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
			//<!-- 获取时间格式 2017-01-03 -->
			//var t = Y + '-' + m + '-' + d;
			var t = Y + '/' + m + '/' + d + ' ' + H + ':' + i;
			return t;
		},
		loadData: function(fun) {
			console.log('下拉刷新');
			var _self = this;
			var pageParams = _self.$data.pageParams;
			axios.post(getUrl() + "/cdish/list", pageParams).then(function(response) {
				// console.log(response.data)
				if(response.data.code == 200) {
					var rs = response.data;
					var allPage = rs.result.endPage;
					if(pageParams.curPage == 1) {
						//首次 加载一次
						_self.$data.curList = rs.result.list;
						undefined != fun && fun();
						if(allPage > 1) {
							document.getElementById("loadMore").style.display = "block";
						}
					} else {
						_self.$data.curList = _self.$data.curList.concat(rs.result.list);
						undefined != fun && fun(pageParams.curPage >= allPage);
					}
				} else {
					undefined != fun && fun(true);
					msg("系统出了点小状况，请稍后再试");
				}
				//console.log(_self.$data.curList);
				_self.$data.pageParams.curPage++;
				_self.initScroll();
				_self.$data.status = 1;
			}).catch(function(error) {
				console.log(error);
			});
		},
		loadSearchData: function(fun) {
			var _self = this;
			var pageParams = _self.$data.pageParams;
			axios.post(getUrl() + "/cdish/search", pageParams).then(function(response) {
				if(response.data.code == 200) {
					var rs = response.data;
					var allPage = rs.result.endPage;
					if(pageParams.curPage == 1) {
						//首次 加载一次
						_self.$data.curList = rs.result.list;
						undefined != fun && fun();
						if(allPage > 1) {
							document.getElementById("loadMore").style.display = "block";
						}
					} else {
						_self.$data.curList = _self.$data.curList.concat(rs.result.list);
						undefined != fun && fun(pageParams.curPage >= allPage);
					}
				} else {
//					alert(1)
					undefined != fun && fun(true);
					msg("系统出了点小状况，请稍后再试");
				}
				_self.$data.pageParams.curPage++;
				_self.initScroll();
				_self.$data.status = 1;
			}).catch(function(error) {
				console.log(error);
			});
		},
		uploadInit: function() {
			var _self = this;
			var html = '<form id="uploadFrom" enctype="multipart/form-data">' +
				'<input type="file" id="uploadWidget" multiple="multiple" onclick="appApi.openCamera(4,4,20)" class="mui-hidden" name="file">' +
				'</form>';
			if(isApp && isIphoneOs) { //IOS
				//IOS现在多选有问题，暂先只做单传
				html = '<form id="uploadFrom" enctype="multipart/form-data">' +
					'<input type="file" id="uploadWidget" onclick="appApi.openCamera(4,4,20)" class="mui-hidden" name="file">' +
					'</form>';
			}
			document.getElementById("dish_content").insertAdjacentHTML('afterend', html);
			widget = document.getElementById("uploadWidget");
			widget.addEventListener("change", function(event) {
				//上传文件
				event.preventDefault();
				if(_self.$data.isIndex == 1) {
					//选择要上传的目录
					console.info("选择目录");
					var url = getPagePath() + "/dish/upload_select.html?projectId=" + _self.$data.projectId;
					appApi.openNewWindow(url);
				} else {
					_self.uploadCallBack(this);
				}
			}, false);
		},
		uploadFile: function() {
			widget.value = "";
			return widget.click();
		},
		uploadCallBack: function(event, id, isSys) {
			if(widget.value == "") {
				return;
			}
			//			console.log(event.files[0])
			loading("正在上传，请稍后...");
			var _self = this;
			//添加文件
			/*var params = {
			 projectId:_self.$data.curInfo.projectId,
			 name:_self.$data.name,
			 parentId:_self.$data.curInfo.id
			 };*/
			var formData = new FormData();

			//			_self.下·(event)
			//			console.log(event.files[0])

			//如果是拍照，处理角度旋转问题
			if(event.files.length == 1) {
				_self.selectFileImage(event); //处理图片角度，得到图片的base64

				//formData.append('imageBase64', fileBase64);
				formData.append('name', event.files[0].name);
				formData.append('size', event.files[0].size);
				formData.append('files', event.files[0]);
			} else {
				for(var i = 0; i < event.files.length; i++) {
					//				console.log(event.files[i])
					//				console.log($Blob)
					formData.append('files', event.files[i]);
				}
			}

			formData.append('projectId', _self.$data.projectId);
			if(undefined != id) {
				formData.append('parentId', id);
			} else {
				formData.append('parentId', _self.$data.curInfo.id);
			}
			var config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			// setTimeout(function() {
			// 	layer.closeAll();
			// }, 1000);
			/*EXIF.getData(event.files['0'], function() {
			 var formparam = new FormData();
			 var _self = this
			 console.log(EXIF.pretty(this));
			 EXIF.getAllTags(this);
			 Orientation = EXIF.getTag(this, 'Orientation');
			 //							msg(Orientation)
			 formData.append('orixy',Orientation);
			 //							var f = event.files[0]
			 //							var f = event.files[0]
			 //							var reader = new FileReader();
			 //							reader.onload = function(e) {
			 //								var data = e.target.result;
			 //								//加载图片获取图片真实宽度和高度
			 //								var image = new Image();
			 //								image.onload = function() {
			 //									var width = image.width;
			 //									var height = image.height;
			 //			//						console.log(image.src);
			 //
			 //								};
			 //								image.src = data;
			 //							};
			 //							reader.readAsDataURL(f);
			 //return;
			 });*/
			setTimeout(function() {
				//为保证能获取到base64，延时调用服务
				if(fileBase64) {
					formData.append('imageBase64', fileBase64);
				}

				console.info("imageBase64====" + formData.imageBase64);
                // var params = getParam(window.location.href);
                // var roomId = params.roomId*1;
                // formData.append('roomId', roomId);
				axios.post(getUrl() + "/cdish/file/upload", formData, config).then(function(res) {
					layer.closeAll();
					if(res.data.code == 0) {
						var rs = res.data.result;
						if(rs.fail_num != 0) {
							msg("已上传成功" + rs.success_num + "个文件，" + rs.fail_num + "上传失败！");
						} else {
							console.log(res)
							msg("已上传成功" + rs.success_num + "个文件");
						}
						widget.value = "";
						refreshPage();
						appApi.broadcast("refreshPage()");
						if(undefined != id) {
							_self.openDirMini(id, isSys);
						}
					} else {
						msg(res.data.message);
					}
				}).catch(function(error) {
					msg("上传出错");
                    layer.closeAll();
                });
			}, 800);

		},
		/********************图片旋转**********************/
		selectFileImage: function(fileObj) {
			var _self = this;
			var zrimg;
			var file = fileObj.files['0'];
			//图片方向角 added by lzk
			var Orientation = null;

			if(file) {
				//		      console.log("正在上传,请稍后...");
				var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
				if(!rFilter.test(file.type)) {
					//showMyTips("请选择jpeg、png格式的图片", false);
					return;
				}
				// var URL = URL || webkitURL;
				//获取照片方向角属性，用户旋转控制
				EXIF.getData(file, function() {
					// alert(EXIF.pretty(this));
					EXIF.getAllTags(this);
					//alert(EXIF.getTag(this, 'Orientation'));
					//          alert(EXIF.getTag(this, 'Orientation'));
					Orientation = EXIF.getTag(this, 'Orientation');
					//                  alert(Orientation)
					//return;
				});

				var oReader = new FileReader();
				oReader.onload = function(e) {
					//var blob = URL.createObjectURL(file);
					//_compress(blob, file, basePath);
					var image = new Image();
					image.src = e.target.result;
					image.onload = function() {
						var expectWidth = this.naturalWidth;
						var expectHeight = this.naturalHeight;

						if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
							expectWidth = 800;
							expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
						} else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
							expectHeight = 1200;
							expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
						}
						var canvas = document.createElement("canvas");
						var ctx = canvas.getContext("2d");
						canvas.width = expectWidth;
						canvas.height = expectHeight;
						ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
						var base64 = null;
						//修复ios
						if(navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/ipad/i)) {
							//                  console.log('iphone');
							//alert(expectWidth + ',' + expectHeight);
							//如果方向角不为1，都需要进行旋转 
							if(Orientation != "" && Orientation != 6) {
								//                      alert('旋转处理');
								switch(Orientation) {
									//右边拍摄
									case 3: //
										_self.rotateImg(this, 'mid', canvas);
										//                                      _self.rotateImg(this, 'right', canvas);
										//                                      _self.rotateImg(this, 'right', canvas);
										break;
									case 1: //左边拍摄
										//                                      _self.rotateImg(this, 'right', canvas);
										break;
									case 8: //上边拍摄
										_self.rotateImg(this, 'right', canvas); //转两次
										//                                      _self.rotateImg(this, 'right', canvas);
										break;
								}
							} else {
								switch(Orientation) {
									case 6: //正常竖着拍摄
										_self.rotateImg(this, 'left', canvas); //转两次
										//                                      _self.rotateImg(this, 'right', canvas);
										break;
								}
							}
							//                  var mpImg = new MegaPixImage(image);
							//                  mpImg.render(canvas, {
							//                      maxWidth: 800,
							//                      maxHeight: 1200,
							//                      quality: 0.8,
							//                      orientation: 8
							//                  });
							var img = new Image();
							img.onload = function() {

								var canvas_w = Number(ctx.canvas.width);
								var canvas_h = Number(ctx.canvas.height);

								// 执行Canvas的drawImage语句
								ctx.drawImage(img, x, y, w, h);
							}
							base64 = canvas.toDataURL("image/jpeg", 0.2);
							//var base641 = canvas.toDataURL("image/jpg", 0.8);
							//fileBase64 = base64;
							//alert("IOS BASE =========999999======"+base64);

						} else if(navigator.userAgent.match(/Android/i)) { // 修复android
							var encoder = new JPEGEncoder();
							base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
						} else {
							//alert(Orientation);
							if(Orientation != "" && Orientation != 1) {
								//alert('旋转处理');
								switch(Orientation) {
									case 6: //需要顺时针（向左）90度旋转
										//                              alert('需要顺时针（向左）90度旋转');
										_self.rotateImg(this, 'right', canvas);
										break;
									case 8: //需要逆时针（向右）90度旋转
										//                              alert('需要顺时针（向w右 ）90度旋转');
										_self.rotateImg(this, 'right', canvas);
										break;
									case 3: //需要180度旋转
										//                              alert('需要180度旋转');
										_self.rotateImg(this, 'right', canvas); //转两次
										_self.rotateImg(this, 'right', canvas);
										break;
								}
							}
							base64 = canvas.toDataURL("image/jpeg", 0.8);
							//		                  console.log(base64)
						}
						//		              console.log(base64)
						//		              img.src=base64
						//uploadImage(base64);
						//              $("#myImage").attr("src", base64);
						fileBase64 = base64; //赋值给全局变量
						var base64Data = base64;

						function getBlobBydataURI(dataURI, type) {
							var binary = atob(dataURI.split(',')[1]);
							var array = [];
							for(var i = 0; i < binary.length; i++) {
								array.push(binary.charCodeAt(i));
							}
							return new Blob([new Uint8Array(array)], {
								type: type
							});
						}
						var $Blob = getBlobBydataURI(base64Data, 'image/png');
						console.log($Blob)
						sessionStorage.setItem("zrimg", $Blob)
						zrimg = $Blob
						return $Blob
						//						var formData = new FormData();
						//						formData.append('files', event.files[i]);
						//						formData.append("files", $Blob ,"file_"+Date.parse(new Date())+".png");
					};
					//					return
					console.log(image.onload())

				};
				oReader.readAsDataURL(file);
				return oReader;
				//				console.log($Blob)
				//				return $Blob
				//				console.log(oReader.onload()
			}
			//			console.log(zrimg+"***"+$Blob)
		},
		rotateImg: function(img, direction, canvas) {
			var _self = this;
			//alert(img);
			//最小与最大旋转方向，图片旋转4次后回到原方向
			var min_step = 0;
			var max_step = 3;
			//var img = document.getElementById(pid);
			if(img == null) return;
			//img的高度和宽度不能在img元素隐藏后获取，否则会出错
			var height = img.height;
			var width = img.width;
			//var step = img.getAttribute('step');
			var step = 2;
			if(step == null) {
				step = min_step;
			}
			if(direction == 'right') {
				step++;
				//旋转到原位置，即超过最大值
				step > max_step && (step = min_step);
			} 
			if(direction == 'left') {
				step--;
				step < min_step && (step = max_step);
			}
			if(step=='mid'){
				step=2
			}
			//img.setAttribute('step', step);
			/*var canvas = document.getElementById('pic_' + pid);
			 if (canvas == null) {
			 img.style.display = 'none';
			 canvas = document.createElement('canvas');
			 canvas.setAttribute('id', 'pic_' + pid);
			 img.parentNode.appendChild(canvas);
			 }  */
			//旋转角度以弧度值为参数
			var degree = step * 90 * Math.PI / 180;
			var ctx = canvas.getContext('2d');
			switch(step) {
				case 0:
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0);
					break;
				case 1:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, 0, -height);
					break;
				case 2:
					canvas.width = width;
					canvas.height = height;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, -height);
					break;
				case 3:
					canvas.width = height;
					canvas.height = width;
					ctx.rotate(degree);
					ctx.drawImage(img, -width, 0);
					break;
			}
		},
		/*****************************************/
		downLoadInit: function() {
			//下载初始化
			var _self = this;
			var html = '<iframe id="downloadWidget" class="mui-hidden"></iframe>';
			document.getElementById("dish_content").insertAdjacentHTML('afterend', html);
			downloadWidget = document.getElementById("downloadWidget");
		},
		getFileUrl: function(id) {
			return getUrl() + "/cdish/file/download?id=" + id;
		},
		downloadFile: function(id, type, name, suffix, event) {
			var _self = this;
			if(isApp) {
				appApi.openFile(_self.getFileUrl(id));
			} else {
				downloadWidget.src = _self.getFileUrl(id);
			}
			_self.$data.showEditBox = false;
		},
		initSort: function() {
			var _self = this;
			//获取缓存排序方式
			if(undefined != getDishSort()) {
				_self.$data.curSort = getDishSort();
			}
			_self.$data.pageParams.sortType = _self.$data.curSort.type;
		},
		fileType: function(suffix) {
			var clazz = "label-";
			if(suffix && suffix.indexOf(".") > 0) {
				suffix = suffix.substring(suffix.indexOf("."), suffix.length);
			}

			switch(suffix) {
				case ".txt":
					clazz += "txt";
					break;
                case ".TXT":
                    clazz += "txt";
                    break;
				case ".doc":
					clazz += "word";
					break;
                case ".DOC":
                    clazz += "word";
                    break;
				case ".docm":
					clazz += "word";
					break;
                case ".DOCM":
                    clazz += "word";
                    break;
				case ".dotx":
					clazz += "word";
					break;
                case ".DOTX":
                    clazz += "word";
                    break;
				case ".dotm":
					clazz += "word";
					break;
                case ".DOTM":
                    clazz += "word";
                    break;
				case ".docx":
					clazz += "word";
                    break;
                case ".DOCX":
                    clazz += "word";
                    break;
				case ".rtf":
					clazz += "word";
					break;
                case ".RTF":
                    clazz += "word";
                    break;
				case ".pdf":
					clazz += "pdf";
					break;
                case ".PDF":
                    clazz += "pdf";
                    break;
				case ".xls":
					clazz += "excel";
					break;
                case ".XLS":
                    clazz += "excel";
                    break;
				case ".ppt":
					clazz += "ppt";
					break;
                case ".PPT":
                    clazz += "ppt";
                    break;
				case ".pptx":
					clazz += "ppt";
					break;
                case ".PPTX":
                    clazz += "ppt";
                    break;
				case ".xlsx":
					clazz += "excel";
					break;
                case ".XLSX":
                    clazz += "excel";
                    break;
				case ".xlsm":
					clazz += "excel";
					break;
                case ".XLSM":
                    clazz += "excel";
                    break;
				case ".xltx":
					clazz += "excel";
					break;
                case ".XLTX":
                    clazz += "excel";
                    break;
				case ".xltm":
					clazz += "excel";
					break;
                case ".XLTM":
                    clazz += "excel";
                    break;
				case ".xlsb":
					clazz += "excel";
					break;
                case ".XLSB":
                    clazz += "excel";
                    break;
				case ".xlam":
					clazz += "excel";
					break;
                case ".XLAM":
                    clazz += "excel";
                    break;
				case ".rm":
					clazz += "video";
					break;
                case ".RM":
                    clazz += "video";
                    break;
				case ".rmvb":
					clazz += "video";
					break;
                case ".RMVB":
                    clazz += "video";
                    break;
				case ".wmv":
					clazz += "video";
					break;
                case ".WMV":
                    clazz += "video";
                    break;
				case ".avi":
					clazz += "video";
					break;
                case ".AVI":
                    clazz += "video";
                    break;
				case ".mp4":
					clazz += "video";
					break;
                case ".MP4":
                    clazz += "video";
                    break;
				case ".3gp":
					clazz += "video";
					break;
                case ".3GP":
                    clazz += "video";
                    break;
				case ".mkv":
					clazz += "video";
					break;
                case ".MKV":
                    clazz += "video";
                    break;
				case ".navi":
					clazz += "video";
					break;
                case ".NAVI":
                    clazz += "video";
                    break;
				case ".mov":
					clazz += "video";
					break;
                case ".MOV":
                    clazz += "video";
                    break;
				case ".asf":
					clazz += "video";
					break;
                case ".ASF":
                    clazz += "video";
                    break;
				case ".png":
					clazz += "img";
					break;
				case ".jpg":
					clazz += "img";
					break;
				case ".jpeg":
					clazz += "img";
					break;
				case ".gif":
					clazz += "img";
					break;
                case ".JPEG":
                    clazz += "img";
                    break;
                case ".PNG":
                    clazz += "img";
                    break;
                case ".JPG":
                    clazz += "img";
                    break;
                case ".GIF":
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
                case ".ZIP":
                    clazz += "zip";
                    break;
                case ".RAR":
                    clazz += "zip";
                    break;
                case ".ARJ":
                    clazz += "zip";
                    break;
                case ".Z":
                    clazz += "zip";
                    break;
                case ".apk":
                    clazz += "apk";
                    break;
				case ".APK":
					clazz += "apk";
					break;
				case ".mmap":
					clazz += "mmap";
					break;
                case ".MMAP":
                    clazz += "mmap";
                    break;
				case ".mpg":
					clazz += "mpg";
					break;
                case ".MPG":
                    clazz += "mpg";
                    break;
				case ".csv":
					clazz += "csv";
					break;
                case ".CSV":
                    clazz += "csv";
                    break;
				case ".mpp":
					clazz += "mpp";
					break;
                case ".MPP":
                    clazz += "mpp";
                    break;
				case ".html":
					clazz += "html";
					break;
                case ".HTML":
                    clazz += "html";
                    break;
				case ".dwg":
					clazz += "dwg";
					break;
                case ".DWG":
                    clazz += "dwg";
                    break;
				default:
					clazz += "unkown";
					break;
			}
			return clazz;
		},
		selectSort: function(type, text) {
			var _self = this;
			var val = {
				type: type,
				text: text
			};
			setDishSort(val);
			_self.$data.curSort = val;
			_self.$data.pageParams.sortType = type;
			_self.$data.sortShow = false;
			refreshPage();
		},
		goSelectMode: function(e) {
			var _self = this;
			if(_self.$data.selectMode) {
				return;
			}
			_self.$data.selectMode = true;
			_self.$data.showEdit = false;
			//监听返回键
			appApi.stopBack(function() {
				app.$data.selectMode = false;
				appApi.resetBack();
				app.backSelectMode();
			})
			//监听选中
			//取消所有多选
			var obj = document.getElementsByName("selectItem");
			var select_arr = [];
			for(var k in obj) {
				obj[k].checked = false;
			}
			//头部处理
			//头部处理
			curHead.intoSelect();
			//选中
			var path = e.path;
			var node;
			for(var i = 0; i < path.length; i++) {
				if(path[i].className == "oa-contact-cell mui-table") {
					node = path[i];
					break;
				}
			}
			if(node) {
				var input = node.firstChild.firstChild;
				input.click();
				input.checked = true;
			}
		},
		backSelectMode: function() {
			console.info(1)
			var _self = this;
			console.info(_self.getSelectVal());
			_self.$data.selectMode = false;
			appApi.resetBack(); //使返回键生效
			_self.$data.selectEdit = false;
			_self.$data.selectCount = 0;
			_self.$data.showEdit = true;
			//取消所有多选
			var obj = document.getElementsByName("selectItem");
			var select_arr = [];
			for(var k in obj) {
				obj[k].checked = false;
			}
			//头部处理
			curHead.backSelect();
		},
		selectEvent: function(e) {
            console.info(2)
			var _self = this;
			_self.$data.selectCount = _self.getSelectVal().length;
			var obj = document.getElementsByName("selectItem");
			for(var i = 0; i < obj.length; i++) {
				var c = obj[i];
				if(c.getAttribute("data-type") == "1" && c.checked) {
					if(_self.$data.isSys) {
						_self.$data.canMove = false;
						_self.$data.canAffrim = false;
					}
					_self.$data.canCollect = false;
					_self.$data.selectHasDir = true;
					break
				} else {
					//不包含文件夹
					_self.$data.selectHasDir = false;
					_self.$data.canMove = true;
					_self.$data.canAffrim = true;
					_self.$data.canCollect = true;
				}
			}
		},
		allSelect: function() { //全选
			var _self = this;
			if(_self.$data.selectMode) {
				var obj = document.getElementsByName("selectItem");
				for(var k in obj) {
					obj[k].checked = true;
				}
				for(var i = 0; i < obj.length; i++) {
					var c = obj[i];
					if(c.getAttribute("data-type") == "1") {
						if(_self.$data.isSys) {
							_self.$data.canMove = false;
							_self.$data.canAffrim = false;
						}
						_self.$data.selectHasDir = true;
						break
					} else {
						//包含文件夹
						_self.$data.selectHasDir = false;
						_self.$data.canMove = true;
						_self.$data.canAffrim = true;
					}
				}
                console.info(3)
				_self.$data.selectCount = _self.getSelectVal().length;
			}
		},
		openSelectEdit: function(e) {
			var _self = this,
				items = [],
				itemStr = "";
            console.info(4)
			items = _self.getSelectVal();
			if(items.length == 1) {
				//获取选中的一项
				var obj = document.getElementsByName("selectItem");
				var selected;
				for(var k in obj) {
					if(obj[k].checked && undefined != obj[k].value)
						selected = obj[k];
				}
				var id = selected.getAttribute("data-id");
				var type = selected.getAttribute("data-type");
				var name = selected.getAttribute("data-name");
				var status = selected.getAttribute("data-status");
				var suffix = selected.getAttribute("data-suffix");
				var userId = selected.getAttribute("data-userId");
				_self.itemEdit(id, type, name, suffix, status, userId);
				return;
			}
			itemStr = items.join(",");
			//获取收藏状态
			_self.collectCheck(itemStr)
			_self.$data.selectEdit = true;
		},
		batchDel: function() {
			//msg("功能开发中");
			var _self = this,
				items = [],
				itemStr = "";
            console.info(5)
			items = _self.getSelectVal();
			if(items.length == 0) {
				msg("请选择要删除的文件或者文件夹");
				return;
			}
			loading("删除中..")
			itemStr = items.join(",");
			//批量删除
			var _self = this;
			//appApi.openNewWindow(getPagePath() + "/dish/create_dir.html?id=" + id + "&name=" + name);
			var okFun = function() {
				var url = getUrl() + "/cdish/batch/delete";
				axios.post(url, {
					batchIds: itemStr
				}).then(function(response) {
					if(response.data.code == 0) {
						layer.closeAll();
						var rs = response.data.result;
						if(rs.fail_num != 0) {
							msg("已成功删除" + rs.success_num + "项，" + rs.fail_num + "项删除失败！");
						} else {
							msg("已成功删除" + rs.success_num + "项");
						}
						//msg("已成功删除" + response.data.result + "个文件或者文件夹");
						refreshPage();
					} else {
						msg(response.data.message);
					}
				}).catch(function(error) {
					layer.closeAll();
					warm("删除失败")
				});
			}
			var qmsg = "所选中文件夹和文件都会被删除，确认继续删除吗？";
			layer.closeAll();
			_self.dishConfirm("文件（夹）删除", qmsg, okFun);
			_self.backSelectMode();
		},
		batchCopy: function() {
			msg("功能开发中");
		},
		batchCut: function(ids) {
			//移动
			var _self = this,
				items = [],
				itemStr = "";
			if(ids) {
				items = ids;
			} else {
                console.info(6)
				items = _self.getSelectVal();
			}
			if(items.length == 0) {
				msg("请选择要移动的文件或者文件夹");
				return;
			}
			//loading("移动中..")
			itemStr = items.join(",");
			//批量移动
			var _self = this;
			var moveType = 0;
			if(_self.$data.isSys) {
				if(_self.$data.selectHasDir) {
					msg("标准目录下文件夹不允许移动");
					return;
				} else {
					moveType = 1;
				}
			} else {
				if(_self.$data.selectHasDir) {
					moveType = 2;
				} else {
					moveType = 0;
				}
			}
			var url = getPagePath() + "/dish/move_select.html?moveItems=" + itemStr + "&projectId=" + _self.$data.projectId + "&moveType=" + moveType;
			appApi.openNewWindow(url);
		},
		getSelectVal: function() {
			//获取所有返回的值
			var obj = document.getElementsByName("selectItem");
			var select_arr = [];
			for(var k in obj) {
				if(obj[k].checked && undefined != obj[k].value)
					select_arr.push(obj[k].value);
			}
			console.info(select_arr);
			return select_arr;
		},
		/**
		 * 文件发送-
		 */
		batchSendFile:function(){
			var _self = this,
				items = [],
				itemStr = "";
            console.info(7)
			items = _self.getSelectVal();
			if(items.length == 0) {
				msg("请选择要发送的文件");
				return;
			}
			itemStr = items.join(",");
			console.info(itemStr);
			window.location.href=getPagePath()+"/dish/fileSendCreate.html?ids="+itemStr;

		},
		sendFile: function(id){
			window.location.href=getPagePath()+"/dish/fileSendCreate.html?ids="+id;
		},
		/**
		 * 分享
		 */
		batchShare: function() {
			var _self = this,
				items = [],
				itemStr = "";
            console.info(8)
			items = _self.getSelectVal();
			if(items.length == 0) {
				msg("请选择要分享的文件或者文件夹");
				return;
			}
			itemStr = items.join(",");
			console.info(itemStr);
			_self.$data.shareItems = itemStr;
			_self.$data.showEditBox = false;
			//弹出失效时间
			_self.$data.shareSetShow = true;

		},
		itemShare: function(id) {
			var _self = this;
			_self.$data.shareItems = id;
			_self.$data.showEditBox = false;
			//弹出失效时间
			_self.$data.shareSetShow = true;
		},
		subShare: function() {
			loading("创建分享中...")
			var _self = this;
			var type = 1;
			var types = document.getElementsByName("deadType");
			var select_arr = [];
			for(var k in types) {
				if(types[k].checked)
					type = types[k].value;
			}
			var deadTime = new Date();
			if(type == 1) {
				//1天
				deadTime.setDate(deadTime.getDate() + 1);
			} else if(type == 2) {
				//2天
				deadTime.setDate(deadTime.getDate() + 7);
			} else {
				deadTime = null;
			}
			var params = {
				items: _self.$data.shareItems,
				projectId: _self.$data.projectId,
				deadTime: deadTime
			};
			axios.post(getUrl() + "/cdish/share", params).then(function(response) {
				console.log(response);
				if(response.data.code == 0) {
					console.info(response.data.result);
					var rs = response.data.result;
					console.info("创建分享成功");
					msg("分享创建成功");
					/*var url = getUrl() + "/share/detail?shareId=" + rs.shareId;
					 var name = 'Hi，我正在使用建云信融，给大家分享"'+rs.shareName;
					 if(rs.shareSize = 1){
					 name+='"，快来看看吧~';
					 }else{
					 name+='"(等"'+rs.shareSize+'"个文件)，快来看看吧~';
					 }*/
					//var share id =
					var url = getPagePath() + "/contacts/select_friend.html?operate=1&token=" + rs.shareId;
					appApi.openNewWindow(url);
					setTimeout(function() {
						appApi.resetBack();
						history.go(0);
					}, 1000)
				} else {
					msg(response.data.message);
				}
				setTimeout(function () {
                    layer.closeAll();
                },1000)
			}).catch(function(error) {
				layer.closeAll();
				warm("创建分享出错")
			});

		},
		showAffirmPerson: function() {
			var _self = this;
			var formparam = new FormData();
			formparam.append("projectSN", _self.$data.projectId);
			// 获取项目信息
			axios.post(getUrl() + "/pro_api/get_user_set", formparam).then(function(response) {
				if(response.data.code == 200) {
					var result = response.data.result;
					if(result) {
						var o = result.obj;
						////1  项目负责人 2 设计师 3 监理员 4 审计人
						if(undefined != o.userFinalID && o.userFinalID != "") {
							_self.$data.externalPerson.push({
								type: 1,
								personId: o.userFinalID,
								personName: o.companyFinalName
							})
						}
						if(undefined != o.userShejiID && o.userShejiID != "") {
							_self.$data.externalPerson.push({
								type: 2,
								personId: o.userShejiID,
								personName: o.companyShejiName
							})
						}
						if(undefined != o.userJianliID && o.userJianliID != "") {
							_self.$data.externalPerson.push({
								type: 3,
								personId: o.userJianliID,
								personName: o.companyJianliName
							})
						}
						if(undefined != o.userShenjiID && o.userShenjiID != "") {
							_self.$data.externalPerson.push({
								type: 4,
								personId: o.userShenjiID,
								personName: o.companyShenjiName
							})
						}
						if(_self.$data.externalPerson.length == 0) {
							msg("外部人员均未设置，无法发起文件确认")
						} else {
							//显示外部人员列表
						}
					}
				}
			}).catch(function(error) {
				console.info(error);
			});
		},
		batchAffirm: function() {
			msg("功能开发中");
		},
		batchCollect: function() {
			var _self = this,
				items = [],
				itemStr = "";
            console.info(9)
			items = _self.getSelectVal();
			if(items.length == 0) {
				msg("请选择要收藏的文件");
				return;
			}
			itemStr = items.join(",");
			_self.collect(itemStr);
			_self.backSelectMode();
		},
		doSearch: function() {
			var _self = this;
			appApi.openNewWindow(getPagePath() + "/dish/search.html?projectSN=" + _self.$data.projectId);
		},
		collectCheck: function(_id, _type) {
			var _self = this;
			_id = _id + "";
			axios.post(getUrl() + "/collect/status?id=" + _id + "&type=3").then(function(response) {
				if(response.data.code == 0) {
					//console.info(response.data.result);
					var rs = response.data.result;
					if(rs && (rs == true || rs == "true")) {
						//收藏
						if(_id.indexOf(",") > -1) {
							_self.$data.collectStatus = true;
						} else {
							_self.$data.editItem.collectStatus = true;
						}
					} else {
						if(_id.indexOf(",") > -1) {
							_self.$data.collectStatus = false;
						} else {
							_self.$data.editItem.collectStatus = false;
						}
					}
					_self.$data.showCollect = true;
				} else {
					msg(response.data.message);
				}
				layer.closeAll();
			}).catch(function(error) {
				layer.closeAll();
				warm("查询收藏出错")
			});
		},
		collect: function(_id) {
			var _self = this;
			_id = _id + "";
			axios.get(getUrl() + "/collect/do?id=" + _id + "&type=3").then(function(response) {
				if(response.data.code == 4001) { // 收藏成功
					if(_id.indexOf(",") > -1) {
						_self.$data.collectStatus = true;
					} else {
						_self.$data.editItem.collectStatus = true;
					}
				} else if(response.data.code == 4003) { //取消收藏
					if(_id.indexOf(",") > -1) {
						_self.$data.collectStatus = false;
					} else {
						_self.$data.editItem.collectStatus = false;
					}
				} else {
					msg(response.data.message);
				}
				layer.closeAll();
				msg(response.data.message);
				_self.$data.showEditBox = false;
			}).catch(function(error) {
				layer.closeAll();
				warm("查询收藏出错")
			});
		}
	}
}
</script>

<style>

</style>
