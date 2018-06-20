<template>
  <div>
    <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>返回
	</button>
	<h1 class="mui-title">手机通讯录</h1>
</header>
      <section class="mui-content" id="phone_list">
	<div id='list' class="mui-indexed-list address-list hide">
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input type="search"  @keyup="searchPhone" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
		</div>
		<div class="mui-indexed-list-bar">
			<div class="align-middle">
				<div v-for="(items,index) in phones" :key="index">
					<div v-for="(item,index) in items" :key="index">
						<div v-if="item.name && item.isp == 1">
							<a v-text="item.first"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<!-- <div id="empty-view" class="mui-indexed-list-empty-alert">没有数据</div> -->
			<ul class="mui-table-view">
				<div v-for="(items,index) in phones" :key="index">
					<div v-for="(item,index) in items" :key="index">
						<div v-if="item.name">
							<div v-if="item.isp == 1">
								<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group">
									{{item.first}}
								</li>
							</div>
							<li :data-value="item.first" name="phoneData" @click="selectPhone(item)" class=" mui-table-view-cell mui-indexed-list-item mui-checkbox">
								<div class="mui-slider-cell">
									<div class="oa-contact-cell mui-table">
										<div class="oa-contact-avatar mui-table-cell">
											<span class="oa-pic-default bgr2" v-text="item.name"></span>
										</div>
										<div class="oa-contact-content mui-table-cell">
											<h4 class="oa-contact-name" v-text="item.name"></h4>
											<p class="oa-contact-email" v-text="item.phone"></p>
										</div>
									</div>
								</div>
							</li>
						</div>
					</div>
				</div>
			</ul>
		</div>

	</div>
</section>

<!--长按收藏弹框-->
<div id="windowdiv" class="mui-popup mui-popup-in" style="display:none;">
    <div class="send-box">
        <div class="send-title">发送给：</div>

        <div class="oa-contact-cell mui-table">
			<div class="oa-contact-avatar mui-table-cell">
				<span class="oa-pic-default bgr2 p-label" v-text="name"></span>
			</div>
            <div class="oa-contact-content mui-table-cell">
                <h4 class="oa-contact-name" v-text="name"></h4>
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
  data() {
    return {
      phones: [],
      phone:"",
      name:"",
      remark:"",
    };
  },
  created: function() {
   
    var _self=this
    laowu_common.initVue(this);
    window.appApi.getContacts();
    appApi.callBackFun = function(callFlag, CONTENT) {
      if (callFlag == appApi.callBackFlag.CONTACTS) {
       _self.findFrieds(CONTENT);
      }
    };
   
  },
   methods: {
     searchPhone:function(){
        console.log("搜索...")
     },
        findFrieds:function(CONTENT){
          var _self=this
        //查询用户的好友
        var param = new FormData();
        param.append("userId", "");
        this.$http
          .post("/concats_api/find_eg_list", param)
          .then(function(response) {
            var resultArray = response.data.result;
            var resultStr = ",";
            for (var i in resultArray) {
              resultStr = resultStr + resultArray[i].cellPhone + ",";
            }
            _self.$data.phones = _self.convertData(CONTENT.result, resultStr);
          })
          .catch(function(error) {
            console.info(error);
          });
        },
        
        importPhones:function () {
            //loading("同步中...");
            window.appApi.getContacts()

        },
        selectPhone:function (item) {//选择手机号邀请
              this.phone=item.phone;
              this.name=item.name;
              laowu_common.showwindowDiv();
              laowu_common.showbackdrop();
        },
          cancel:function () {
            setTimeout(function () {
                laowu_common.hidebackdrop();
                laowu_common.hidewindowDiv();
            },100)

        },
        confirm:function () {//确定f
            var list=[];
            list.push(this.phone);
            laowu_common.hidebackdrop();
            laowu_common.hidewindowDiv();
            laowu_common.findTotgetinvite(list,this.remark);

        },
         convertData:function (resultCon, resultPhone) {
           var _self=this
          if (resultCon && resultCon != "") {

        //加载手机号码
        var phoneArray = resultCon.split(",");
        var newArrs = new Array();
        for (var i = 0; i < 27; i++) {
            newArrs[i] = new Array();
        }
        for (var j = 0; j < phoneArray.length; j++) {
            var personPhoneArray = phoneArray[j].split("=");
            var remarksName = personPhoneArray[0];
            var f = _self.phonePy.makePy(remarksName.charAt(0))[0].toUpperCase();
            var obj = {name: remarksName, phone: personPhoneArray[1]};
            if(resultPhone.indexOf(personPhoneArray[1])>-1){
                obj['is_add']=false;
            }else{
                obj['is_add']=true;
            }
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
      updated:function () {//DOM更新时，进行调用的方法
        document.getElementById("list").style.display = "block";
       // mui.ready(function () {
            var header = document.querySelector('header.mui-bar');
            var list = document.getElementById('list');
            list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
            // alert(list.innerHTML);
          //  window.indexedList = new mui.IndexedList(list)
       // });
    }
};
</script>

<style>
.oa-contact-email{
  text-align: left
}
</style>

