<template>
  <div id="app">
    <header class="mui-bar mui-bar-nav">
		<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="goBack">
			<span class="mui-icon mui-icon-back"></span>联系人
		</button>
		<h1 class="mui-title">手机通讯录</h1>
	</header>


	<section class="mui-content" id="phone_list">
		<div id='list' class="mui-indexed-lists address-list">
			<div class="mui-indexed-list-search mui-input-row mui-search">
				<input type="search" class="mui-input-clear mui-indexed-list-search-input" id="sosuo" ref="sosuo" @keyup="search" placeholder="搜索">
			</div>
			<div class="mui-indexed-list-bar">
				<div class="align-middle">
					<div v-for="(items,index1) in phones" :key="index1">

					</div>
				</div>
			</div>
			<div class="mui-indexed-list-alert"></div>
			<div class="mui-indexed-list-inner">
				<div id="empty-view" class="mui-indexed-list-empty-alert" :class="{'showhide' : phones.length<0}">没有数据</div>
				<mt-index-list>
					<mt-index-section v-for="(items,index1) in phones" :key="index1" :index='items.first'>
						<div v-for="(item,index2) in items" :key="index2">
							<div v-if="item.name">
								<div v-if="item.isp == 1">
								<li v-text="item.first" class="mui-table-view-divider mui-indexed-list-group text" style="border-bottom:1px solid #ccc">
										{{item.first}}
									</li>
								</div>
								<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item" style="border-bottom: 1px solid #ccc">
									<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?phone='+item.phone+'&name='+item.name+'\')']">
									<div class="mui-slider-cell">
											<div class="oa-contact-cell mui-table">
												<div class="oa-contact-avatar mui-table-cell">
													<span class="oa-pic-default bgr2" v-text="item.name"></span>
												</div>
												<div class="oa-contact-content mui-table-cell">
													<h4 class="oa-contact-name" v-text="item.name"></h4>
													<p class="oa-contact-email text" v-text="item.phone"></p>
												</div>
											</div>
										</div>
									</a>
									<button v-show="item.is_add" @click="addFriends(index1, index2)" class="mui-btn">添加</button>
									<button v-show="!item.is_add" class="mui-btn mui-btn-link mui-badge mui-badge-inverted" style="margin-left:-2px">已添加</button>
								</li>
							</div>
						</div>
					</mt-index-section>
				</mt-index-list>
			</div>
		</div>
	</section>
  </div>
</template>

<script>
import contacts from '../../playform/contacts_comm'
import { Toast,IndexList } from 'mint-ui';
export default {
	data(){
		return{
			phones:[],
			newphones:[],
			phone:[]
		}
	},
	mounted(){
		window.appApi.getContacts();
		appApi.setPullRefresh(false)
		
		this.getData()
	},
	methods: {
		search(){

		},
		getData(){
			let _self = this
			appApi.callBackFun = function (callFlag, CONTENT) {
				let isLoginIm = true;
				if (callFlag === appApi.callBackFlag.CONTACTS) {
					//查询用户的好友
					var param = new FormData();
					param.append("userId", "");
					_self.$http.post("/concats_api/find_eg_list", param).then(function (response) {
						var resultArray = response.data.result;
						var resultStr = ",";
						for(var i in resultArray){
							resultStr = resultStr + resultArray[i].cellPhone + ",";
						}
						// alert(this.convertData())

						_self.phones = contacts.convertData(CONTENT.result, resultStr)
						// _self.phones = CONTENT.result, resultStr
						for(let i=0;i<_self.phones.length;i++){
							// alert(_self.phones[i])
							if(_self.phones[i] != ''){
								_self.newphones.push(_self.phones[i][0])
							}
						}
						// 获得首字母
						
						for(let i=0;i<_self.phones.length;i++){
							alert(JSON.stringify(_self.phones[i]))
							
						}


						alert(JSON.stringify(_self.phone,111111111111))
					}).catch(function (error) {
						console.info(error);
					});
				}
			}	
		},
		goBack(){
			this.$router.go(-1)
		},
		addFriends(index1, index2) {

			var phoneMap = this.phones[index1][index2];
            var addVo = {cellPhone: phoneMap.phone, receivedUserName: phoneMap.name};
            phoneMap.is_add= !(phoneMap.is_add);
            this.$http.post("/concats_api/insert_add_info", addVo).then(function (response) {
				var friendVO = response.data.result;
                if(friendVO.isOwnOrFriend=="0"){
					// msg("不可添加自己为好友!");
					Toast({
						message: '不可添加自己为好友!',
						position: 'bottom',
						duration: 1000
					});
                }else if(friendVO.isOwnOrFriend=="1"){
					// msg("此用户已是你的好友!");
					Toast({
						message: '此用户已是你的好友!',
						position: 'bottom',
						duration: 1000
					});
                }else{
                    // msg('好友请求发送成功！');
					// window.location.href = "../contacts/address_list.html";
					Toast({
						message: '好友请求发送成功!',
						position: 'bottom',
						duration: 1000
					});
                }

            }).catch(function (error) {
				// remin("好友请求发送失败，请联系管理员!", 2);
				Toast({
						message: '好友请求发送失败，请联系管理员!',
						position: 'bottom',
						duration: 1000
					});
                console.info(error);
            });
		},
		importPhones:function () {
            //loading("同步中...");
            window.appApi.getContacts()

        }
	},
	updated:function () {//DOM更新时，进行调用的方法
        document.getElementById("list").style.display = "block";
        mui.ready(function () {
            var header = document.querySelector('header.mui-bar');
            var list = document.getElementById('list');
            list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
            // alert(list.innerHTML);
            window.indexedList = new mui.IndexedList(list)
        });
    },
	// mounted(){

	// },

}
</script>

<style type="text/css" scoped>
	@import '../../assets/css/common/mui.indexedList.css';
	.mui-indexed-lists{
		position: relative;
		border-top: solid 1px #e3e3e3;
		border-bottom: solid 1px #e3e3e3;
		overflow: hidden;
		/* background-color: #fafafa; */
		cursor: default;
	}
	.showhide{
		display: block
	}
	.mui-content{
		width: 100%
	}
</style>
