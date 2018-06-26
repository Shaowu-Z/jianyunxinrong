// var isHideTeamList="n";
// var isHideProjectList="n";
// var isHideGroupChatList = "n";
// var webPath = "";
// var pagepath = "";
// var historyArr = new Array();
// var selectArr = new Array();
// var selectGroup = new Array();
// var selectGroupId = new Array();
// var selectDept = new Array();
// var backFlag = false; //默认前进
// var userId = "";
// var selectUserIds = "";//选中的userIds

// //弹出部门人员选择,(1选人,2回到群组创建主页)
// function controlUpdate (type) {
// 	if(type==1){
// 		document.getElementById("member_div2").style.display="none";
// 		document.getElementById("member_div1").style.display="block";

// 		document.getElementById("head_2").style.display="none";//
// 		document.getElementById("head_1").style.display="block";//第一次进入显示

// 		appApi.hideBack();//隐藏返回按钮
// 	}else{
// 		document.getElementById("member_div1").style.display="none";
// 		document.getElementById("member_div2").style.display="block";

// 		document.getElementById("head_1").style.display="none";
// 		document.getElementById("head_2").style.display="block";

// 		appApi.showBack();//显示返回按钮
// 	}
// }
// var backFun= function () {
// 	if(historyArr.length < 2){
// 		return true;
// 	}else{
// 		//读取history
// 		historyArr.pop(); //移除最后一位
// 		var obj = historyArr[historyArr.length-1];
// 		var _self = capp;
// 		_self.$data.navList = historyArr;
// 		console.log(obj)
// 		if(obj.type==1){
// 			project.getProjectMembers(obj.teamId,obj.teamName)
// 		}else{
// 			initChildDept(obj.teamId,obj.deptId,obj.deptName);
// 		}
// 		return false;
// 	}
// };
// // mui.init({
// // 	swipeBack:false //启用右滑关闭功能
// // });
// // var list_scroll = mui('#listScroll').scroll({
// // 	bounce: false
// // });
// // mui('.mui-scroll-wrapper').scroll({
// // 	bounce: false
// // });
// var c_scroll;
// //初始化单页view
// var viewApi;
// var view;
// window.onload=function(){
// 	viewApi = mui('#app').view({
// 		defaultPage: '#select_member',
// 		goEvent:function (target) {
// 			//用于点击跳转事件
// 			if (target.hash == "#select_children") {
// 				var obj = {teamId:target.getAttribute("data-team-id"),teamName:target.getAttribute("data-team-name"),deptId:target.getAttribute("data-dept-id"),deptName:target.getAttribute("data-dept-name"),type:2}
// 				historyArr.push(obj);
// 				var _self = capp;
// 				_self.$data.navList = historyArr;
// 				initChildDept(obj.teamId, obj.deptId, obj.deptName);//type2表示时团队，1表示时项目
// 				appApi.hideBack();
// 			}else if(target.hash == "#select_project"){
// 				var obj = {teamId:target.getAttribute("data-project-id"),teamName:target.getAttribute("data-project-name"),type:1}
// //				console.log(JSON.stringify(obj))
// //				historyArr.push(obj);
// 				var _self = project;
// //				_self.$data.navList = historyArr;
// 				_self.getProjectMembers(obj.teamId, obj.teamName);
// 				appApi.hideBack();
// 			}else{
// 				historyArr = new Array();
// 			}
// 		},
// 		backEvent:function (target) {
// 			if (target.id == "select_member") {
// 				historyArr = new Array();
// 				appApi.showBack();
// 			}
// 		}
// 	});
// 	view = viewApi.view;
// 	(function($) {
// 		var oldBack = $.back;
// 		$.back = function() {
// 			if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
// 				if(backFun()){
// 					viewApi.back();
// 				}
// 			} else { //执行webview后退
// 				//oldBack();
// 				//appApi.showBack();
// 				//appApi.resetBack();
// 				backFun();
// 			}
// 		};
// 		var myback = function () {
// 			if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
// 				if(backFun()){
// 					viewApi.back();
// 				}
// 			} else { //执行webview后退
// 				oldBack();
// 				appApi.resetBack();
// 			}
// 		};
// 		//appApi.stopBack(myback);//注销此行 2017.9.20
// 		view.addEventListener('pageBeforeShow', function(e) {
// 			//appApi.hideBack();
// 		});
// 		view.addEventListener('pageBeforeBack', function(e) {

// 		});
// 		view.addEventListener('pageBack', function(e) {
// 			//appApi.showBack();
// 		});
// 		view.addEventListener('pageShow', function(e) {

// 			c_scroll = mui('#select_children_scroll').scroll({
// 				scrollY: false,
// 				scrollX: true,
// 				indicators: false,
// 				snap: '.mui-control-item'
// 			});
// 		});
// 		/*var list = document.getElementById("list");
// 		list.addEventListener("touchstart", function(e) {
// 			//关闭页面滚动
// 			list_scroll.setStopped(true);
// 		}, false);
// 		list.addEventListener("touchmove", function(e) {
// 			//关闭页面滚动
// 			list_scroll.setStopped(true);
// 		}, false);
// 		list.addEventListener("touchend", function(ev) {
// 			//启用页面滚动
// 			list_scroll.setStopped(false);
// 		}, false);*/
// 	})(mui);
// };
// /*---------------选择成员-----------------*/
// Array.prototype.contains = function (obj) {
// 	var i = this.length;
// 	while (i--) {
// 		if (this[i] === obj) {
// 			return true;
// 		}
// 	}
// 	return false;
// }
// Array.prototype.remove = function(val) {
// 	var index = this.indexOf(val);
// 	if(index > -1) {
// 		this.splice(index, 1);
// 	}
// };
// function selectInArr(bool,val,type) {
// 	if (type=="user") {
// 		val = val + "";
// 		if(bool){
// 			if(!selectArr.contains(val)){
// 				selectArr.push(val);
// 			}
// 		}else{
// 			if(userId != val){ //自己不能删除
// 				selectArr.remove(val);
// 			}
// 		}
// 	}else if(type=="group"){
// 		if(bool){
// 			if(!selectGroup.contains(val)){
// 				selectGroup.push(val);
// 			}
// 		}else{
// 			if(userId != val){ //自己不能删除
// 				selectGroup.remove(val);
// 			}
// 		}
// 	}
// 	var count = selectArr.length+selectGroup.length;
// 	var text = count ? "完成(" + count + ")" : "完成";
// 	var btn = jQuery(".ok-btn");
// 	btn.text(text);
// 	if (count) {
// 		if (btn.hasClass("mui-disabled")) {
// 			btn.removeClass("mui-disabled");
// 		}
// 	} else {
// 		if (!btn.hasClass("mui-disabled")) {
// 			btn.addClass("mui-disabled");
// 		}
// 	}
// 	app.$data.selArr = selectArr;
// 	capp.$data.selArr = selectArr;
// }

// function selEvent(target) {
//     if(target.checked){
//         var count = selectArr.length+selectGroup.length;
//         if(count>=9){
//             mui.toast("最多只能选择9个人或者群组进行转发");
//             target.checked = false;
//             return ;
//         }
//     }
//     var type = target.getAttribute("data-type");
// 	var value = target.value;
// 	if(type == "user"){
// 		selectInArr(target.checked,value,"user");
// 	}else if(type=="group"){
// 		if(target.checked){
// 			if(!selectGroupId.contains(value)){
// 				selectGroupId.push(value)
// 			}
// 		}else{
// 			if(selectGroupId.contains(value)){
// 				selectGroupId.remove(value)
// 			}
// 		}
// 		var nick = target.getAttribute("data-name");
// 		var avatar = "../../../assets/images/ico_groupchat.png";//普通群聊图标//target.getAttribute("data-img");
// //		var dataStr = "{'name': '"+name+"','nick': '"+nick+"','avatar': '"+avatar+"'}";
// 		//chatType:1单聊，2群聊
// 		var dataStr = '{"toImId":"'+value+'","toNickName":"'+nick+'","toAvatarUrl":"'+avatar+'","chatType":2}';
// 		selectInArr(target.checked,dataStr,"group");
// 	}else{
// 		var par = {deptId:value};
// 		axios.post("/concats_api/query_team_members",par).then(function (response) {
// 			var memberList = response.data.result;
// 			for(var i= 0;i<memberList.length;i++){
// 				selectInArr(target.checked,memberList[i].userId,"user");
// 			}
// 		}).catch(function (error) {
// 			console.info(error);
// 		});

// 		if(target.checked){
// 			if(!selectDept.contains(value)){
// 				selectDept.push(value);
// 			}
// 		}else{
// 			selectDept.remove(value);
// 		}
// 		capp.$data.selDept = selectDept;
// 		app.$data.selDept = selectDept;
// 	}
// }
// mui('#project_scroll').on('tap', '.mui-control-item', function(e) {
// 	var target = e.target;
// 	var teamId = target.getAttribute("data-team-id");
// 	if(undefined != teamId){
// 		var deptName = target.getAttribute("data-team-name");
// 		project.getProjectMembers(teamId,deptName);
// 	}else{
// 		viewApi.back('#select_member');
// 	}
// });

// //把自加进去
// var init = function () {
// 	selectInArr(true,userId);
// 	//绑定完成方法
// 	mui('#app__').on('tap', '.ok-btn', function(e) {
// 		var target = e.target;
// 		if(target.classList.contains("mui-disabled")){
// 			return;
// 		}else{
// 			//alert("共选择了：" + selectArr);
// 			document.getElementById("member_div1").style.display="none";
// 			document.getElementById("member_div2").style.display="block";

// 			document.getElementById("head_1").style.display="none";
// 			document.getElementById("head_2").style.display="block";

// 			viewApi.back();//关闭选择子部门div
// 		}
// 	});
// }
// //init();
// function initChildDept(teamId,deptId,deptName) {
// 	if(undefined == teamId){
// 		teamId = 0;
// 	}
// 	if(undefined == deptId){
// 		deptId = 0;
// 	}
// 	//清除原有选中
// 	//jQuery("#select_children").find('input[type="checkbox"]').removeAttr("checked").removeAttr("disabled");
// 	capp.$data.selDept = selectDept;
// 	app.$data.selDept = selectDept;
// 	var _self = capp;
// 	var par = {deptId:deptId,teamId:teamId};
// 	axios.post("/concats_api/query_dept_list",par).then(function (response) {
// 		_self.$data.deptList = response.data.result;
// 		setTimeout(function () {
// 			$(".dept-select").each(function(){
// 				var id = $(this).val();
// 				if(selectDept.contains(id)){
// 					$(this).attr("checked","checked");
// 				}else{
// 					$(this).removeAttr("checked");
// 				}
// 			});
// 			mui('.dept-select').input();
// 		},200)
// 	}).catch(function (error) {
// 		console.info(error);
// 	});
// 	if(deptId!=0){
// 		par = {deptId:deptId};
// 	}else{
// 		par = {teamId:teamId};
// 	}
// 	axios.post("/concats_api/query_team_members",par).then(function (response) {
// 		_self.$data.memberList = response.data.result;
// 	}).catch(function (error) {
// 		console.info(error);
// 	});
// 	if(c_scroll){
// 		setTimeout(function () {
// 			mui('#select_children_scroll').scroll().refresh();
// 			var w = document.getElementById("children_scroll").scrollWidth;
// 			var s = c_scroll.wrapperWidth - w;
// 			if(s<0){
// 				mui('#select_children_scroll').scroll().scrollTo(s,0,100);
// 			}
// //			var _self = capp;
// 		},500)
// 	}
// }

// mui('#children_scroll').on('tap', '.mui-control-item', function(e) {
// 	var target = e.target;
// 	var teamId = target.getAttribute("data-team-id");
// 	var deptId = target.getAttribute("data-dept-id");
// 	if(undefined != teamId){
// 		var teamName = target.getAttribute("data-team-name");
// 		capp.selectTeam(teamId,teamName,e)
// 	}else if(undefined != deptId){
// 		var deptName = target.getAttribute("data-dept-name");
// 		capp.selectDept(deptId,deptName,e);
// 	}else{
// 		viewApi.back('#select_member');
// 	}
// });

// function convertData (friendArray) {
// 	if (friendArray && friendArray.length > 0) {

// 		var newArrs = new Array();
// 		for (var i = 0; i < 27; i++) {
// 			newArrs[i] = new Array();
// 		}
// 		for (var j = 0; j < friendArray.length; j++) {

// 			var f = friendArray[j].nameInitials.toUpperCase();
// 			var headerImage = !friendArray[j].avatar || friendArray[j].avatar == "" ? "../../../assets/images/60x60.gif" : friendArray[j].avatar;
// 			var obj = {
// 				name: friendArray[j].remarksName,
// 				phone: friendArray[j].cellPhone,
// 				friendsUserId: friendArray[j].friendsUserId,
// 				headerImage: headerImage,
// 				imId: friendArray[j].imId
// 			};
// 			switch (f) {
// 				case 'A' :
// 					obj['first'] = 'A';
// 					if (newArrs[0].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[0][newArrs[0].length] = obj;
// 					break;
// 				case 'B' :
// 					obj['first'] = 'B';
// 					if (newArrs[1].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[1][newArrs[1].length] = obj;
// 					break;
// 				case 'C' :
// 					obj['first'] = 'C';
// 					if (newArrs[2].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[2][newArrs[2].length] = obj;
// 					break;
// 				case 'D' :
// 					obj['first'] = 'D';
// 					if (newArrs[3].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[3][newArrs[3].length] = obj;
// 					break;
// 				case 'E' :
// 					obj['first'] = 'E';
// 					if (newArrs[4].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[4][newArrs[4].length] = obj;
// 					break;
// 				case 'F' :
// 					obj['first'] = 'F';
// 					if (newArrs[5].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[5][newArrs[5].length] = obj;
// 					break;
// 				case 'G' :
// 					obj['first'] = 'G';
// 					if (newArrs[6].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[6][newArrs[6].length] = obj;
// 					break;
// 				case 'H' :
// 					obj['first'] = 'H';
// 					if (newArrs[7].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[7][newArrs[7].length] = obj;
// 					break;
// 				case 'I' :
// 					obj['first'] = 'I';
// 					if (newArrs[8].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[8][newArrs[8].length] = obj;
// 					break;
// 				case 'J' :
// 					obj['first'] = 'J';
// 					if (newArrs[9].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[9][newArrs[9].length] = obj;
// 					break;
// 				case 'K' :
// 					obj['first'] = 'K';
// 					if (newArrs[10].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[10][newArrs[10].length] = obj;
// 					break;
// 				case 'L' :
// 					obj['first'] = 'L';
// 					if (newArrs[11].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[11][newArrs[11].length] = obj;
// 					break;
// 				case 'M' :
// 					obj['first'] = 'M';
// 					if (newArrs[12].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[12][newArrs[12].length] = obj;
// 					break;
// 				case 'N' :
// 					obj['first'] = 'N';
// 					if (newArrs[13].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[13][newArrs[13].length] = obj;
// 					break;
// 				case 'O' :
// 					obj['first'] = 'O';
// 					if (newArrs[14].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[14][newArrs[14].length] = obj;
// 					break;
// 				case 'P' :
// 					obj['first'] = 'P';
// 					if (newArrs[15].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[15][newArrs[15].length] = obj;
// 					break;

// 				case 'Q' :
// 					obj['first'] = 'Q';
// 					if (newArrs[16].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[16][newArrs[16].length] = obj;
// 					break;
// 				case 'R' :
// 					obj['first'] = 'R';
// 					if (newArrs[17].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[17][newArrs[17].length] = obj;
// 					break;
// 				case 'S' :
// 					obj['first'] = 'S';
// 					if (newArrs[18].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[18][newArrs[18].length] = obj;
// 					break;
// 				case 'T' :
// 					obj['first'] = 'T';
// 					if (newArrs[19].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[19][newArrs[19].length] = obj;
// 					break;
// 				case 'U' :
// 					obj['first'] = 'U';
// 					if (newArrs[20].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[20][newArrs[20].length] = obj;
// 					break;
// 				case 'V' :
// 					obj['first'] = 'V';
// 					if (newArrs[21].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[21][newArrs[21].length] = obj;
// 					break;
// 				case 'W' :
// 					obj['first'] = 'W';
// 					if (newArrs[22].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[22][newArrs[22].length] = obj;
// 					break;
// 				case 'X' :
// 					obj['first'] = 'X';
// 					if (newArrs[23].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[23][newArrs[23].length] = obj;
// 					break;
// 				case 'Y' :
// 					obj['first'] = 'Y';
// 					if (newArrs[24].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[24][newArrs[24].length] = obj;
// 					break;
// 				case 'Z' :
// 					obj['first'] = 'Z';
// 					if (newArrs[25].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[25][newArrs[25].length] = obj;
// 					break;
// 				default:
// 					obj['first'] = '#';
// 					if (newArrs[26].length == 0) {
// 						obj['isp'] = 1;
// 					}
// 					newArrs[26][newArrs[26].length] = obj;

// 			}
// 		}
// 		return newArrs;
// 	} else {
// 		return []
// 	}
// }

// function stopEvt(e) {  
//     e.stopPropagation();//阻止点击事件向上冒泡  
// }
// export default selectMemberShare