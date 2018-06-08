<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">新建文件夹</h1>
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="addDir()">确定</button>
        </header>
        <section class="mui-content" id="dir_info">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-input-row">
                    <input type="text" class="mui-input-clear" v-model="name" placeholder="请输入文件夹名"/>
                    <span class="mui-icon mui-icon-clear mui-hidden"></span>
                </li>
            </ul>

        </section>
    </div>
</template>

<script>
import {getParam} from '../../../playform/common'
export default {
    data () {
        return {
            status:false,
            name:"",
            curInfo:{}
        }
    },
    created () {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if (params.hasOwnProperty("pid")) {
			 //添加文件夹
			var callBack = function (rs) {
				_self.curInfo = rs.data;
        }
			_self.initData(params.pid,callBack);
		}
		if (params.hasOwnProperty("name")) {
			//修改文件夹
			_self.name = params.name;
		}

		if (params.hasOwnProperty("id")) {
			//修改文件夹
			var callBack = function (rs) {
				_self.curInfo = rs.data;
				_self.name = _self.curInfo.name;
			}
			_self.initData(params.id,callBack);
		}
    },
    methods: {
		initData (dirId,callBack) {
			var _self = this;
			//获取数据
			this.$http.get("/cdish/data?dirId=" + dirId).then(function (response) {
				if (response.data.code == 0) {
					var rs = response.data.result;
					if(callBack) callBack(rs)
				} else {
					msg(response.data.message)
				}
			})
		},
		addDir () {
			var _self = this;
			if(_self.status){
				return;
			}
			_self.status = true;
			if(_self.name == ""){
				warm("请输入文件名")
				_self.status = false;
				return;
			}
			//添加文件夹
			var params = {
				projectId:_self.curInfo.projectId,
				name:_self.name,
				parentId:_self.curInfo.id,
				sysDir:_self.curInfo.sysDir,
				// roomId:_self.curInfo.roomId
			};
			this.$http.post("/cdish/dir/add",params).then(function (response) {
				if (response.data.code == 0) {
                    //所有页面刷新
					if(appApi.isApp){
						appApi.broadcast("refreshPage()");
						appApi.closeNewWindow();
					}else{
						window.history.back();
					}
				} else {
					msg(response.data.message)
				}
				/*_self.status = false;*/
			})

		},
		renameDir () {
			var _self = this;
			if(_self.status){
				return;
			}
			_self.status = true;
			if(_self.name == ""){
				warm("请输入文件名")
				_self.status = false;
				return;
			}
			var params = getParam(window.location.href);
			if(_self.name == params.name){
				//未修改
				appApi.closeNewWindow();
				return;
			}
			//修改文件夹
			var params = {
				name:_self.name,
				id:_self.curInfo.id
			};
			this.$http.post("/cdish/dir/rename",params).then(function (response) {
				if (response.data.code == 0) {
					//所有页面刷新
					if(appApi.isApp){
						appApi.broadcast("refreshPage()");
						appApi.closeNewWindow();
					}else{
						window.history.back();
					}
				} else {
					msg(response.data.message)
				}
				_self.status = false;
			})

		}

	}
}
</script>

<style>

</style>
