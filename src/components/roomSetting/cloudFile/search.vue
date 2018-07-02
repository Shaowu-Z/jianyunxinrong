<template>
    <div>
        <header class="mui-bar mui-bar-nav" id="js-head">
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                <span class="mui-icon mui-icon-back"></span>
            </button>
            <div class="search-box mui-pull-left" >
                <form method="get" onsubmit="return search.search()">
                    <div class="search-inner input-row">
                        <span class=" mui-icon mui-icon-search" @click="search()"></span>
                        <input type="search" v-model="keyword" class="search-input" id="searchIpt" placeholder="请输入文件名或者文件夹名">
                        <span class="mui-icon mui-icon-clear" @click="cleanIpt()"></span>
                    </div>
                </form>
            </div>
        </header>
        	<section class="mui-content" id="JSearch">
            <!--模糊匹配-->

            <div v-if="searchHistory.length > 0">
                <div class="title-block bgr text">
                    最近搜索<button class="mui-btn mui-btn-link mui-pull-right" @click="clear()">清除历史</button>
                </div>
                <ul class="mui-table-view eg-table-view">
                    <div v-for="(item,index) in searchHistory" :key="index">
                        <li class="mui-table-view-cell text">
                            <a href="javascript:;" @click="search(item)" v-text="item"></a>
                        </li>
                    </div>
                </ul>
            </div>
            <div v-else>
                <div class="s-empty">暂无搜索痕迹</div>
            </div>
            <div class="c-scroll" v-show="showSearch" style="display: none">
                <ul class="mui-table-view mui-table-view-striped">
                    <li class="mui-table-view-cell text">
                        <a href="javascript:;" id="searchBtn" @click="search()">搜索""</a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            keyword:"",
            projectId:"",
            showSearch:false,
            searchHistory: [],
            HISTORY_KEY: "CLOUD_DISH_SEARCH_HISTORY_LIST_" + Number(BackCookie.getCookie("userid")) ,
        }
    },
    created: function () {
		var _self = this;
		//获取参数
		var params = getParam(window.location.href);
		if (params.hasOwnProperty("projectSN")) {
			if(document.getElementById("pullrefresh")){
				document.getElementById("pullrefresh").style.top = "51px";
			}
			_self.projectId = params.projectSN;
			if(params.hasOwnProperty("keyword")){
				_self.keyword = params.keyword;
			}
        }
        //获取搜索历史
		_self.searchHistory = this.getSearchHistory();
    },
    watch: {
		'keyword': function (val, oldVal) {
			var _self = this;
			if(val != oldVal){
				_self.changeBtn(val);
			}
		}
    },
    methods: {
        saveSearchHistory:function (keyword) {

            var h = localStorage.getItem(this.HISTORY_KEY);
            if(h){
                var j = JSON.parse(h);

                if(j.hasOwnProperty("keywords")){
                    console.info("save keyword success:" + keyword);
                    console.log(j.keywords[0])
                    let keywords = j.keywords[0];
                    var newKeywords = [];
                    for(var i in keywords){
                        if(keyword != keywords[i] && !(keywords[i] instanceof Function)){
                            newKeywords.push(keywords[i]);
                        }
                    }
                    newKeywords.unshift(keyword);
                    j.keywords = newKeywords;
                    localStorage.setItem(this.HISTORY_KEY,JSON.stringify(j));
                    console.info("save history success:" + JSON.stringify(j));
                }
            }else{
                localStorage.setItem(this.HISTORY_KEY,JSON.stringify({keywords:[keyword]}));
            }
        },
        getSearchHistory:function () {
            var h = localStorage.getItem(this.HISTORY_KEY);
            if(h){
                var j = JSON.parse(h);
                if(j.hasOwnProperty("keywords")){
                    return j.keywords;
                }
            }
            return [];
        },
        clear:function () {
			var _self = this;
			_self.searchHistory = [];
			localSearch.clear();
            msg("清除成功")
            Toast({
                message: '清除成功',
                position: 'center',
                duration: 1000
            });
		},
        search:function (keyword) {
			this.search(keyword);
		},
		search:function (keyword) {
			var _self = this;
			if(	_self.projectId== ""){
                // msg("非法搜索")
                Toast({
                    message: '非法搜索',
                    position: 'center',
                    duration: 1000
                });
				return false;
			}
			if(keyword){
				_self.keyword = keyword;
			}
			if(_self.keyword == ""){
                // msg("请输入要搜索的文件或者文件夹")
                Toast({
                    message: '请输入要搜索的文件或者文件夹',
                    position: 'center',
                    duration: 1000
                });
				return;
			}
            // loading("搜索中...");
            Toast({
				message: '搜索中...',
				position: 'center',
				duration: 1000
			});
			setTimeout(function () {
				_self.saveSearchHistory(_self.keyword);
				this.searchHistory = _self.getSearchHistory();
				if(location.href.indexOf("search_result.html") == -1){
                    // appApi.openNewWindow(getPagePath() + "/dish/search_result.html?projectSN=" + _self.projectId + "&keyword=" + _self.keyword);
                    _self.$router.push({path:'/dish/search_result.html',query:{projectSN:_self.projectId,keyword:_self.keyword}})
				}else{
					//异步搜索
					if(_self){
						_self.keyword =  _self.keyword;
						_self.projectId = _self.projectId;
						_self.searchData();
					}
					//location.href = url;
				}
				layer.closeAll();
			},200)
			//appApi.openNewWindow(getPagePath() + "/dish/search_result.html?projectSN=" + _self.projectId + "&keyword=" + _self.keyword);
			return false;
		},
		changeBtn:function (val) {
			var _self = this;
			if(val != ""){
				this.showSearch = true;
			}else{
				this.showSearch = false;
			}
			if(document.getElementById("searchBtn")){
				document.getElementById("searchBtn").innerText = '搜索"' + _self.keyword+ '"';
			}
		},
		cleanIpt:function () {
			var _self = this;
			_self.keyword = "";
		}
	}
}
</script>

<style type="text/css">

</style>
