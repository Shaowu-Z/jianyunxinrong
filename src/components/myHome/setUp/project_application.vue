<template>
    <div id="app">
	<header class="mui-bar mui-bar-nav">
		<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide"></button>
		<div class="search-box">
			<div class="search-inner input-row" style="margin-left:55px;">
				<span class=" mui-icon mui-icon-search"></span>
				<input type="search" class=" search-input" placeholder="搜索" v-model="search_value">
			</div>
		</div>
	</header>
	<section class="mui-content">
		<div v-for="(m, key) in search_items" :key="key">
		<div class="module01" v-if="m.items.length>0">
			<div class="module01-head text"><span class="title line-title">{{m.fenzutitle}}</span></div>
			<ul class="mui-table-view mui-grid-view module-body">
				<li class="mui-table-view-cell mui-media mui-col-xs-3 mui-text-center" @click="onFuwuclick(mm.url)" v-for="(mm,index) in m.items" :key="index">
					<div class="menu-item">
						<span :class="['mui-icon iconfont '+ (mm.iconname==''?'icon-zixun':mm.iconname)]"></span>
						<span class="menu-item-name">{{mm.name}}</span>
					</div>
				</li>
			</ul>
		</div>
		</div>
	</section>
</div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
import setting from '../../../playform/config'
export default {
    data () {
        return {
            search_value : "",
			search_items : [],
            items : [],
            paramMap:getParam(window.location.href),
            tag : '',
        }
    },
    created : function () {
        var _self = this;
        if(this.paramMap.hasOwnProperty("tagName")){
            this.tag = this.paramMap.tagName;
        }
        var formparam = new FormData();
        formparam.append("type",0);
        formparam.append("zuzhiType",this.tag);
        this.$http.post("/work_api/query_project_applications", formparam).then(function(resp){
            _self.items = resp.data.result;
            _self.search_items = resp.data.result;
        }).catch(function (error) {
            console.error(error);
        });
    },
    methods : {
        onFuwuclick: function (url) {//点击分组服务\
            var params = getParam(window.location.href);
            var teamCode = "";
            if(params.hasOwnProperty("teamCode"))
                teamCode = "&teamCode="+params.teamCode;
            var currRoomId = "";
            if(params.hasOwnProperty("room_id"))
                currRoomId = "&currRoomId="+params.room_id;

            if(url){
                //加上相应的参数
                url = url + (url.indexOf("?") == -1 ? "?" : "&") +"userId=" + BackCookie.getCookie("userid") + "&currUserType=" + this.paramMap.currUserType + "&projectSN="+ this.paramMap.projectSN+teamCode+currRoomId;

                //循环替换掉好思的通用符或者需要被替换的旧域名循环替换掉好思的通用符或者需要被替换的旧域名
                for(var i=0; i < setting.HAOSI_REPLACE.length; i++){
                    if(url.indexOf(setting.HAOSI_REPLACE[i]) > -1){
                        url = url.replace(setting.HAOSI_REPLACE[i],  setting.HAOSI_SERVER_ADDRESS);
                        break;
                    }
                }

                if(url.indexOf(setting.HAOSI_SERVER_SHORT) == 0){
                    url = url + "&__SESSIONID_=pcsessionId_" + BackCookie.getCookie("userid");
                } else if(url.indexOf("http") != 0){
                    url = getUrl() + url;
                }
                appApi.openNewWindow(url)
            }
        },
    },
    watch : {
        'search_value': function (val) {
            var result = [];
            if(val==""){
                this.search_items = this.items;

            }else {
                for (var i = 0; i < this.items.length; i++) {
                    var r1 = {};
                    var arrays = this.items[i].items;
                    r1 = {fenzutitle: this.items[i].fenzutitle, items: []};
                    for (var a = 0; a < arrays.length; a++) {
                        if (arrays[a].name.indexOf(val) > -1) {
                            r1.items.push(arrays[a]);
                        }
                    }
                    result.push(r1);
                }
                this.search_items = result;
            }
        }
    }
}
</script>

<style>

</style>
