<template>
  <div>
      <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>返回
	</button>
	<h1 class="mui-title">合作过的工长</h1>
	<button @click="openFriends" class="mui-btn mui-btn-link mui-pull-right">建云好友</button>
</header>

 <section class="mui-content" >
	<div id='list' class="mui-indexed-list address-list hide">
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input type="search" @keyup="searchUser" v-model="key" class="" placeholder="搜索">
		</div>
		<div class="mui-indexed-list-bar" >
			<div class="align-middle">
				<div v-for="(items,index) in friendsList" :key="index">
					<div v-for="(item,index) in items" :key="index">
						<div v-if="item.name && item.isp == 1">
							<a v-text="item.first" ></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<!-- <div class="mui-indexed-list-empty-alert">没有数据</div> -->

			<ul class="mui-table-view" id="strHtml">

				<div v-for="(items,index) in friendsList" :key="index">
					<div v-for="(item,index) in items" :key="index">
						<div v-if="item.name">
							<div v-if="item.isp == 1">
								<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group" v-text="item.first"></li>
							</div>
							<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item">
								<a @click="selectUser(item)">
									<div class="mui-slider-cell">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
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
<!--遮罩层-->
<div id="backdrop" class="mui-backdrop" style="display:none ;z-index: 999;"></div>

<!--长按收藏弹框-->
<div id="window" class="mui-popup mui-popup-in" style="display:none ;">
	<div class="send-box">
		<div class="send-title">发送给：</div>

		<div class="oa-contact-cell mui-table">
			<div class="oa-contact-avatar mui-table-cell">
				<img :src="headerImage">
			</div>
			<div class="oa-contact-content mui-table-cell">
				<h4 class="oa-contact-name" v-text="name"></h4>
				<p class="oa-contact-email">1人</p>
			</div>
		</div>

		<div class="send-con">
			<p class="mui-ellipsis-2 mui-text-left">您正在邀请<span v-text="name"></span>登记新项目</p>
		</div>

		<ul class="mui-table-view input-box">
			<li class="mui-table-view-cell mui-input-row">
				<input v-model="remark" type="text" autofocus placeholder="我想说"/>
			</li>
		</ul>
		<div class="footer">
			<button class="mui-btn mui-btn-link btn-normal" @click="cancel()">取消</button>
			<button class="mui-btn mui-btn-link" @click="confirm()">发送</button>
		</div>
	</div>
</div>

  </div>
</template>

<script>
import laowu_common from "./js/laowu_common.js";
export default {
  data () {
    return {
        friendsList:[],
        key:"",
        name:"",
        phone:"",
        gongzhangId:"",
        headerImage:"",
        remark:"",

    }
  },
   created: function () {
        var _self = this;
        laowu_common.initVue(this);
        var list =  laowu_common.findTotgetTherList("");
        _self.$data.friendsList = _self.convertData(list);

    },
  mounted:function(){
    this.showList();
  },
    methods:{
       showList:function () {
            document.getElementById("list").style.display = "block";
            //mui.ready(function () {
                var header = document.querySelector('header.mui-bar');
                var list = document.getElementById('list');
                //calc hieght
                list.style.height = ( window.screen.availHeight - header.offsetHeight-18) + 'px';
                //create
              //  window.indexedList = new mui.IndexedList(list);
            //});
        },
        clickshow: function () {
            return true;
        },
        searchUser:function () {
            var _self = this;
            var list =  laowu_common.findTotgetTherList(_self.$data.key);
            _self.$data.friendsList = _self.convertData(list);
        },
        selectUser:function (item) {
            console.log(item)
            app.name=item.name;
            app.headerImage=item.headerImage;
            app.gongzhangId=item.userId;
            app.phone=item.phone;
            setTimeout(function () {
                laowu_common.showbackdrop();
                laowu_common.showwindow();
            },100)

        },
        cancel:function () {
            setTimeout(function () {
                laowu_common.hidebackdrop();
                laowu_common.hidewindow();
            },100)

        },
        confirm:function () {
            var list=[];
            list.push(this.phone);
            laowu_common.findTotgetinvite(list,this.remark);

        },
        getIndexShow:function (index_) {
            if(this.$data.firendsList[index_].length > 0) return false;
            return true;
        },

        updated:function () {
              document.getElementById("list").style.display = "block";
              mui.ready(function () {
                  var header = document.querySelector('header.mui-bar');
                  var list = document.getElementById('list');
                  //calc hieght
                  list.style.height = ( window.screen.availHeight - header.offsetHeight-18) + 'px';
                  //create
                  window.indexedList = new mui.IndexedList(list);
              });
       },
      openFriends:function(){
        var pagepath="/static/webstatic"
        appApi.openNewWindow(pagepath+'/new_laowu/select_member.html')
      },

    //转换数据 wyj
 convertData:function(friendArray) {
    if (friendArray && friendArray.length > 0) {

        var newArrs = new Array();
        for (var i = 0; i < 27; i++) {
            newArrs[i] = new Array();
        }
        for (var j = 0; j < friendArray.length; j++) {

            var f = friendArray[j].userNameInitials.toUpperCase();
            var headerImage = !friendArray[j].ucon|| friendArray[j].ucon=="" ? getUrl()+"/static/images/60x60.gif" : friendArray[j].ucon;
            var obj = {name: friendArray[j].userName, phone:friendArray[j].phone, userId: friendArray[j].userId, headerImage:headerImage};
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
<style type="text/css" scoped>
		html,
		body {
			height: 100%;
			overflow: hidden;
		}

		.mui-bar {
			-webkit-box-shadow: none;
			box-shadow: none;
		}

		/* .mui-indexed-list-inner {
			-webkit-transform-style: preserve-3d;
			-webkit-backface-visibility: hidden;
			-webkit-perspective: 1000;
		} */
		.mui-indexed-list-bar .mui-hidden{
			display: block!important;
		}
    .oa-contact-email{
      text-align: left
    }
	</style>
