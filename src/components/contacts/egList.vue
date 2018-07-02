<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
            <span class="mui-icon mui-icon-back"></span>联系人
        </button>
        <h1 class="mui-title">建云好友</h1>
        <button @click="tianjia" class="mui-btn mui-btn-link mui-pull-right">添加好友</button>
    </header>
<section class="mui-content" id="eg_list">
	<div id='list' class="mui-indexed-lists address-list">
		<div class="singlebox mui-singlebox text">
			<a @click="newFriends" class="mui-navigate-right">新的好友</a>
		</div>
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input type="search"  @keyup="searchUser" v-model="key" class="" placeholder="搜索">
		</div>
<<<<<<< HEAD
=======

		<div class="mui-indexed-list-bar">
			<div class="align-middle">
				<div v-for="(items,index) in friendsList" :key="index">
					<div v-for="(item,index) in items"  :key="index">
						<div v-if="item.name && item.isp == 1">
							<a v-text="item.first" class="xxx"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
>>>>>>> 249c3732ab1e0ae0ff116855465f99ae30142be7
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<div class="mui-indexed-list-empty-alert" :class="{'hide':this.friendsList.length != 0}">没有数据</div>
			<mt-index-list>
				<mt-index-section v-for="(items,index) in friendsList" :key="index" :index="items.nameInitials">
					<li class="mui-table-view-cell mui-indexed-list-item" style="border-bottom:1px solid #ccc">
						<div @click="pagepaths(items,index)">
							<div class="mui-slider-cell">
								<div class="oa-contact-cell mui-table">
									<div class="oa-contact-avatar mui-table-cell">
										<img :src="items.avatar">
									</div>
									<div class="oa-contact-content mui-table-cell">
										<h4 class="oa-contact-name" v-text="items.remarksName"></h4>
										<p class="oa-contact-email text" v-text="items.cellPhone"></p>
									</div>
								</div>
							</div>
						</div>
					</li>
				</mt-index-section>
			</mt-index-list>
		</div>
	</div>
</section>
  </div>
</template>

<script>
import setting from '../../playform/config'
import { IndexList,IndexSection } from 'mint-ui';
export default {
    data(){
        return{
            friendsList:[],
            key:""
        }
    },
    methods:{
		tianjia(){
			// appApi.openNewWindow(setting.pagepath+'/phone_list')
			this.$router.push({path:'/phoneList'});
		},
		pagepaths(items,index1){
			console.log(items)
			this.$router.push({path:'/eg_details',query:{type:'f',userId:items.friendsUserId}});
		},
        goBack(){
            this.$router.go(-1)
        },
        searchUser(){
			var _self = this;
			_self.friendsList = []
			console.log(this.key)
            var param = new FormData();
            param.append("userId", "");
            param.append("key", _self.key);
            this.$http.post("/concats_api/find_eg_list", param).then(function (response) {
                _self.friendsList = response.data.result
            }).catch(function (error) {
                console.info(error);
            });
		},
		newFriends(){
			this.$router.push({path: '/newFriends'})
		},
    },
    mounted(){
		appApi.hideMenu()
        var _self = this;
        var param = new FormData();
        param.append("userId", "");
        this.$http.post("/concats_api/find_eg_list",param).then(function (response) {
            _self.friendsList = response.data.result
            console.log(_self.friendsList);
        }).catch(function (error) {
            console.info(error);
		});
	},
}
</script>

<style type="text/css" scoped>
	@import '../../assets/css/common/mui.indexedList.css';
	.text{
		text-align: left
	}
	.mui-indexed-lists{
		position: relative;
		border-top: solid 1px #e3e3e3;
		border-bottom: solid 1px #e3e3e3;
		overflow: hidden;
		/* background-color: #fafafa; */
		cursor: default;
	}
	.mui-table-view-cell{
		background: #fff
	}
</style>
