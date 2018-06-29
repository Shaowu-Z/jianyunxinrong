<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <button id="btn-referrer" class="mui-btn mui-action-back mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>返回
            </button>
            <h1 class="mui-title">修改文件名</h1>
            <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right" @click="renameFile();">确定</button>
        </header>
        <section class="mui-content" id="file_info">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-input-row">
                    <input type="text" class="mui-input-clear" v-model="name" placeholder="请输入文件名"/>
                    <span class="mui-icon mui-icon-clear mui-hidden"></span>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import {getParam} from '../../../playform/common'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            status:false,
            name:"",
            curInfo:{}
        }
    },
    created: function () {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if (params.hasOwnProperty("pid")) {
			 //添加文件夹
			_self.initData(params.pid);
		}
		if (params.hasOwnProperty("name")) {
			//修改文件夹
			_self.name = params.name;
		}
		if (params.hasOwnProperty("id")) {
			//修改文件夹
			_self.initData(params.id);
		}
    },
    methods: {
		initData:function (dirId) {
			var _self = this;
			//获取数据
			this.$http.get("/cdish/data?dirId=" + dirId).then(function (response) {
				if (response.data.code == 0) {
					var rs = response.data.result;
					_self.curInfo = rs.data;
					_self.name = _self.curInfo.name;
				} else {
                    msg(response.data.message)
                    Toast({
                        message: response.data.message,
                        position: 'bottom',
                        duration: 1000
                    });
				}
			})
		},
		renameFile:function () {
			var _self = this;
			if(_self.status){
				return;
			}
			_self.status = true;
			if(_self.name == ""){
                // warm("请输入文件名")
                Toast({
                    message: "请输入文件名",
                    position: 'bottom',
                    duration: 1000
                });
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
			this.$http.post("/cdish/file/rename",params).then(function (response) {
				if (response.data.code == 0) {
					_self.status = false;
					//所有页面刷新
					if(appApi.isApp){
						appApi.broadcast("refreshPage()");
						appApi.closeNewWindow();
					}else{
						window.history.back();
					}
				} else {
					_self.status = false;
                    // msg(response.data.message)
                    Toast({
                        message: response.data.message,
                        position: 'bottom',
                        duration: 1000
                    });
				}
			})

		}

	}
}
</script>

<style>

</style>
