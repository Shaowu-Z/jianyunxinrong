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
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<div class="mui-indexed-list-empty-alert" :class="{'hide':this.friendsList.length != 0}">没有数据</div>
			<mt-index-list>
				<mt-index-section v-for="(items,index) in friendsList" :key="index" :index="items.nameInitials">
					<li :data-group="items.nameInitials" class="mui-table-view-divider mui-indexed-list-group text" style="border-bottom:1px solid #ccc">
						{{items.nameInitials}}
					</li>
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
				console.log(response.data.result)
				for(let i=0;i<response.data.result.length;i++){
					for(let l=0;l<response.data.result.length-1;l++){
						if(response.data.result[i].nameInitials<response.data.result[l].nameInitials){
							let c = response.data.result[i]
							response.data.result[i] = response.data.result[l]
							response.data.result[l] = c
						}
					}
				}
				console.log(response.data.result)
				_self.friendsList = response.data.result
            }).catch(function (error) {
                console.info(error);
			});
			if(_self.key == ''){
				this.fundata()	
			}
		},
		newFriends(){
			this.$router.push({path: '/newFriends'})
		},
		fundata(){
			var _self = this;
			var param = new FormData();
			param.append("userId", "");
			this.$http.post("/concats_api/find_eg_list",param).then(function (response) {
				for(let i=0;i<response.data.result.length;i++){
						for(let l=0;l<response.data.result.length-1;l++){
							console.log(response.data.result[i].nameInitials)
							console.log(response.data.result[l].nameInitials)
							if(response.data.result[i].nameInitials<response.data.result[l].nameInitials){
								console.log(response.data.result[i].nameInitials)
								let c = response.data.result[i]
								response.data.result[i] = response.data.result[l]
								response.data.result[l] = c
							}
						}
					}
					console.log(response.data.result)
					_self.friendsList = response.data.result
			}).catch(function (error) {
				console.info(error);
			});
		}
    },
    mounted(){
		appApi.hideMenu()
		this.fundata()
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
	.mint-indexsection-index{
		display: none!important
	}
</style>
