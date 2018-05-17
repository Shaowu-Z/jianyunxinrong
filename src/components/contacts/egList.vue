<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
        <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
            <span class="mui-icon mui-icon-back"></span>联系人
        </button>
        <h1 class="mui-title">建云好友</h1>
        <button onclick="appApi.openNewWindow(pagepath+'/contacts/phone_list.html')" class="mui-btn mui-btn-link mui-pull-right">添加好友</button>
    </header>
<section class="mui-content" id="eg_list">
	<div id='list' class="mui-indexed-list address-list">
		<div class="singlebox mui-singlebox">
			<a @click="newFriends" class="mui-navigate-right">新的好友</a>
		</div>
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input type="search"  @keyup="searchUser" v-model="key" class="" placeholder="搜索">
		</div>
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
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<div class="mui-indexed-list-empty-alert" :class="{'hide':this.friendsList.length != 0}">没有数据</div>

			<ul class="mui-table-view" id="strHtml">
				<div v-for="(items,index) in friendsList" :key="index">
					<div v-for="(item,index) in items" :key="index">
						<div v-if="item.name">
							<div v-if="item.isp == 1">
								<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group" v-text="item.first"></li>
							</div>
							<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item">
								<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?type=f&userId='+item.friendsUserId+'\')']">
									<div class="mui-slider-cell">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<!--<span class="oa-pic-default bgr2" v-if="" v-text="item.name"></span>-->
												<img :src="item.headerImage">
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.name"></h4>
												<p class="oa-contact-email" v-text="item.phone"></p>
											</div>
										</div>
									</div>
								</a>
							</li>
						</div>
					</div>
				</div>
			</ul>
		</div>

	</div>
</section>
  </div>
</template>

<script>
export default {
    data(){
        return{
            friendsList:[],
            key:""
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        searchUser(){
            var _self = this;
            var param = new FormData();
            param.append("userId", "");
            param.append("key", _self.$data.key);
            this.$http.post("/api/concats_api/find_eg_list", param).then(function (response) {
                console.info(response.data.result);
                _self.$data.friendsList = appApi.convertData(response.data.result);
            }).catch(function (error) {
                console.info(error);
            });
		},
		newFriends(){
			this.$router.push({path: '/newFriends'})
		}
    },
    created(){
        var _self = this;
        var param = new FormData();
        param.append("userId", "");
        this.$http.post("/api/concats_api/find_eg_list",param).then(function (response) {
            console.info(response.data.result);
            _self.$data.friendsList = appApi.convertData(response.data.result);
            console.log(_self.$data.friendsList);
        }).catch(function (error) {
            console.info(error);
        });
    }
}
</script>

<style>
    @import '../../assets/css/common/mui.indexedList.css';
</style>
