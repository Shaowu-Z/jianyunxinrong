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
					<div v-for="(item,index1) in items" :key="index1">
						<div v-if="item.name">
							<div v-if="item.isp == 1">
								<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group text" style="border-bottom:1px solid #ccc" v-text="item.first"></li>
							</div>
							<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item" style="border-bottom:1px solid #ccc" >
								<a @click="pagepaths(items,index1)">
									<div class="mui-slider-cell">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<!--<span class="oa-pic-default bgr2" v-if="" v-text="item.name"></span>-->
												<img :src="item.headerImage">
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.name"></h4>
												<p class="oa-contact-email text" v-text="item.phone"></p>
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
import setting from '../../playform/config'
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
			console.log(items[index1])
			this.$router.push({path:'/eg_details',query:{type:'f',userId:items[index1].friendsUserId}});
		},
        goBack(){
            this.$router.go(-1)
        },
        searchUser(){
			var _self = this;
			console.log(this.key)
            var param = new FormData();
            param.append("userId", "");
            param.append("key", _self.key);
            this.$http.post("/concats_api/find_eg_list", param).then(function (response) {
                console.info(response.data.result);
                _self.friendsList = response.data.result
            }).catch(function (error) {
                console.info(error);
            });
		},
		newFriends(){
			this.$router.push({path: '/newFriends'})
		}
    },
    created(){
		appApi.hideMenu()
        var _self = this;
        var param = new FormData();
        param.append("userId", "");
        this.$http.post("/concats_api/find_eg_list",param).then(function (response) {
            console.info(response.data.result);
            _self.friendsList = convertData(response.data.result)
            console.log(_self.friendsList);
        }).catch(function (error) {
            console.info(error);
		});
		//转换数据 wyj
		function convertData (friendArray) {
			if (friendArray && friendArray.length > 0) {

				var newArrs = new Array();
				for (var i = 0; i < 27; i++) {
					newArrs[i] = new Array();
				}
				for (var j = 0; j < friendArray.length; j++) {

					var f = friendArray[j].nameInitials.toUpperCase();
					var headerImage = !friendArray[j].avatar|| friendArray[j].avatar=="" ? "/static/images/60x60.gif" : friendArray[j].avatar;
					var obj = {name: friendArray[j].remarksName, phone:friendArray[j].cellPhone, friendsUserId: friendArray[j].friendsUserId, headerImage:headerImage};
					switch (f) {
						case 'A' :
							obj['first'] = 'A';
							if (newArrs[0].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[0][newArrs[0].length] = obj;
							break;
						case 'B' :
							obj['first'] = 'B';
							if (newArrs[1].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[1][newArrs[1].length] = obj;
							break;
						case 'C' :
							obj['first'] = 'C';
							if (newArrs[2].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[2][newArrs[2].length] = obj;
							break;
						case 'D' :
							obj['first'] = 'D';
							if (newArrs[3].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[3][newArrs[3].length] = obj;
							break;
						case 'E' :
							obj['first'] = 'E';
							if (newArrs[4].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[4][newArrs[4].length] = obj;
							break;
						case 'F' :
							obj['first'] = 'F';
							if (newArrs[5].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[5][newArrs[5].length] = obj;
							break;
						case 'G' :
							obj['first'] = 'G';
							if (newArrs[6].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[6][newArrs[6].length] = obj;
							break;
						case 'H' :
							obj['first'] = 'H';
							if (newArrs[7].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[7][newArrs[7].length] = obj;
							break;
						case 'I' :
							obj['first'] = 'I';
							if (newArrs[8].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[8][newArrs[8].length] = obj;
							break;
						case 'J' :
							obj['first'] = 'J';
							if (newArrs[9].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[9][newArrs[9].length] = obj;
							break;
						case 'K' :
							obj['first'] = 'K';
							if (newArrs[10].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[10][newArrs[10].length] = obj;
							break;
						case 'L' :
							obj['first'] = 'L';
							if (newArrs[11].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[11][newArrs[11].length] = obj;
							break;
						case 'M' :
							obj['first'] = 'M';
							if (newArrs[12].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[12][newArrs[12].length] = obj;
							break;
						case 'N' :
							obj['first'] = 'N';
							if (newArrs[13].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[13][newArrs[13].length] = obj;
							break;
						case 'O' :
							obj['first'] = 'O';
							if (newArrs[14].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[14][newArrs[14].length] = obj;
							break;
						case 'P' :
							obj['first'] = 'P';
							if (newArrs[15].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[15][newArrs[15].length] = obj;
							break;

						case 'Q' :
							obj['first'] = 'Q';
							if (newArrs[16].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[16][newArrs[16].length] = obj;
							break;
						case 'R' :
							obj['first'] = 'R';
							if (newArrs[17].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[17][newArrs[17].length] = obj;
							break;
						case 'S' :
							obj['first'] = 'S';
							if (newArrs[18].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[18][newArrs[18].length] = obj;
							break;
						case 'T' :
							obj['first'] = 'T';
							if (newArrs[19].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[19][newArrs[19].length] = obj;
							break;
						case 'U' :
							obj['first'] = 'U';
							if (newArrs[20].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[20][newArrs[20].length] = obj;
							break;
						case 'V' :
							obj['first'] = 'V';
							if (newArrs[21].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[21][newArrs[21].length] = obj;
							break;
						case 'W' :
							obj['first'] = 'W';
							if (newArrs[22].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[22][newArrs[22].length] = obj;
							break;
						case 'X' :
							obj['first'] = 'X';
							if (newArrs[23].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[23][newArrs[23].length] = obj;
							break;
						case 'Y' :
							obj['first'] = 'Y';
							if (newArrs[24].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[24][newArrs[24].length] = obj;
							break;
						case 'Z' :
							obj['first'] = 'Z';
							if (newArrs[25].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[25][newArrs[25].length] = obj;
							break;
						default:
							obj['first'] = '#';
							if (newArrs[26].length == 0) {
								obj['isp'] = 1;
							}
							newArrs[26][newArrs[26].length] = obj;

					}
				}
				return newArrs;
			}else{
				return []
			}
		}
	},
}
</script>

<style scoped>
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
</style>
