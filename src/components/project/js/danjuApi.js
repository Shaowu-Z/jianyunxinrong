/**
	 * 单据公用js
	 * 张冉
     * 2018-06-08
	 */
	import { DatetimePicker } from "mint-ui";
	import { Toast } from "mint-ui";
var _self
var danjuApi={
	initVue:function(){
		_self=danjuApi.vue
	 },
	/**
	 * 打开日期
	 * */ 
	openPicker() {
		// console.log(this)
		_self.$refs.picker.open();
	},
	/**
	 * 确认日期
	 * */
	handleConfirm(value) {
		// this.form.MissionStartDate = value.toString();
		var localtime = value.toLocaleDateString().replace(/[/]/g, "-");

		_self.form.MissionStartDate = localtime;
		_self.show = true;
		Toast({
			message: "已选择 " + localtime,
			// message: '已选择 ' + value.toString(),
			position: "bottom"
		});
	},
    /**
	 * 附件图标类样式适配
	 * @param {Object} suffix
	 */
   

    fileType: function(suffix) {
		var clazz = "label-";
		if(suffix && suffix.indexOf(".") > 0) {
			suffix = /\.[^\.]+$/.exec(suffix).toString()
		}
		switch(suffix) {
			case ".txt":
				clazz += "txt";
				break;
			case ".doc":
				clazz += "word";
				break;
			case ".docm":
				clazz += "word";
				break;
			case ".dotx":
				clazz += "word";
				break;
			case ".dotm":
				clazz += "word";
				break;
			case ".docx":
				clazz += "word";
				break;
			case ".rtf":
				clazz += "word";
				break;
			case ".pdf":
				clazz += "pdf";
				break;
			case ".xls":
				clazz += "excel";
				break;
			case ".ppt":
				clazz += "ppt";
				break;
			case ".pptx":
				clazz += "ppt";
				break;
			case ".xlsx":
				clazz += "excel";
				break;
			case ".xlsm":
				clazz += "excel";
				break;
			case ".xltx":
				clazz += "excel";
				break;
			case ".xltm":
				clazz += "excel";
				break;
			case ".xlsb":
				clazz += "excel";
				break;
			case ".xlam":
				clazz += "excel";
				break;
			case ".rm":
				clazz += "video";
				break;
			case ".rmvb":
				clazz += "video";
				break;
			case ".wmv":
				clazz += "video";
				break;
			case ".avi":
				clazz += "video";
				break;
			case ".mp4":
				clazz += "video";
				break;
			case ".3gp":
				clazz += "video";
				break;
			case ".mkv":
				clazz += "video";
				break;
			case ".navi":
				clazz += "video";
				break;
			case ".mov":
				clazz += "video";
				break;
			case ".asf":
				clazz += "video";
				break;
			case ".png":
				clazz += "img";
				break;
			case ".jpg":
				clazz += "img";
				break;
			case ".gif":
				clazz += "img";
				break;
			case ".zip":
				clazz += "zip";
				break;
			case ".rar":
				clazz += "zip";
				break;
			case ".arj":
				clazz += "zip";
				break;
			case ".z":
				clazz += "zip";
				break;
			case ".apk":
				clazz += "apk";
				break;
			case ".mmap":
				clazz += "mmap";
				break;
			case ".mpg":
				clazz += "mpg";
				break;
			case ".csv":
				clazz += "csv";
				break;
			case ".mpp":
				clazz += "mpp";
				break;
			case ".html":
				clazz += "html";
				break;
			case ".dwg":
				clazz += "dwg";
				break;
			default:
				clazz += "unkown";
				break;
		}
		return clazz;
	},
	/**
	 * 上传图片、附件
	 * @param {Object} suffix
	 */
	upfile: function(event) {
		// loading("上传中")
		sessionStorage.removeItem("cunnews")
		// var _self = this
		var file = document.getElementById(event.target.id).files;
		var zrid = document.getElementById(event.target.id).getAttribute("id")
		var url = "/api/sass_api/upload_file";
		var form = new FormData();
		var forimg = []
		var forfile = []
		var imgName = [];
		for(var i = 0; i < file.length; i++) {
			form.append("file", file[i]);
			//读取图片数据
			var f = document.getElementById(event.target.id).files[i];
			var imgtype = f.type.split('/')[0]
			if(zrid == "file") {
				imgName.push(file[i].name);
				var reader = new FileReader();
				reader.onload = function(e) {
					var data = e.target.result;
					//加载图片获取图片真实宽度和高度
					var image = new Image();
					image.onload = function() {
						var width = image.width;
						var height = image.height;

					};

					image.src = data;
					forimg.push({
						src: image.src
					})
				};
				sessionStorage.setItem("cunnews", "1")
				reader.readAsDataURL(f);
			} else if(zrid == "files") {
				sessionStorage.setItem("cunnews", "2")
				var na = file[i].name
				forfile.push({
					name: f.name
				})
				// console.log(_self.fujians)
			}

		}
		_self.imgsrc = forimg
		if(sessionStorage.getItem("cunnews") == 1) {
			form.append("type", "1");
		} else {
			form.append("type", "2");
		}
		form.append("module", "contractnote");
		form.append("userid", _self.userid);
		var xhr = new XMLHttpRequest();
		xhr.open("post", url, true);
		xhr.onload = function(evt) {
			//请求完成
			// layer.close(loading("上传中"))
		};
		xhr.onreadystatechange = function(evt) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log(xhr.responseText);
				var data = JSON.parse(evt.target.responseText);
				var rtnfiles = data.result.success;
				if(sessionStorage.getItem("cunnews") == 1) {
					_self.imgs = _self.imgs.concat(rtnfiles)
					for(var i=0;i<rtnfiles.length;i++){
						_self.imgid.push(rtnfiles[i].fileId);
					}
					if(_self.imgid.toString()){
						_self.zrimg = _self.imgid.toString().split(',')
					}
				} else {
					for(var i=0;i<rtnfiles.length;i++){
						_self.fujianid.push(rtnfiles[i].fileId);
					}
					_self.fujians = _self.fujians.concat(forfile)
					if(_self.fujianid.toString()){
						_self.zrfujian = _self.fujianid.toString().split(',')
					}

				}
				// ludan("上传成功", 1, 1)
			} else if(xhr.readyState == 4 && xhr.status == 500) {
				// ludan("上传失败", 1, 1)
			}
		}
		xhr.onerror = function(evt) {
			//请求失败
			var data = JSON.parse(evt.target.responseText);
			// ludan("请求失败", 1, 1)
			console.log("data");
		};
		console.log(_self.imgid)
		xhr.send(form);

	},

	/**
	 *删除图片 
	*/
	moveimg:function(n){
		// var _self=danjuApi.vue;
		console.log(">>"+n)
		console.log(_self.imgid)
		_self.$http.post("/sass_api/delete_file?userId="+_self.userid+"&fileId=" + _self.imgid[n-1]).then(function(response) {
			if(response.data.code == 0) {
				console.log(response.data)
				// ludan("删除成功",1,2)
				layer.open({
					type:1,
					time:2,
					title:"删除成功",
					content:""
				})
			}
		}).catch(function(error) {
			// ludan(error, 1, 3);
			layer.open({
					type:1,
					time:2,
					title:"请求失败",
					content:error
				})
		})
		_self.imgs.splice(n-1,1)
		_self.imgid.splice(n - 1, 1)
		_self.zrimg.splice(n-1,1)
		console.log("///////////////"+_self.zrimg)
		console.log(typeof JSON.stringify(_self.zrimg))
//						console.log(_self.imgid[1])
//						_self.imgid.remove(n-1)
	},
	/**
	 *删除附件 
	*/
	movefj: function(n) { 


		// var _self = danjuApi.vue;
		_self.$http
		  .post(
			"/sass_api/delete_file?userId="+_self.userid+"&fileId=" +
			  _self.fujianid[n - 1]
		  )
		  .then(function(response) {
			if (response.data.code == 0) {
			  console.log(response.data);
			  // ludan("删除成功",1,2)
			  layer.open({
				type: 1,
				time: 2,
				title: "删除成功",
				content: ""
			  });
			}
		  })
		  .catch(function(error) {
			// ludan(error, 1, 3);
			layer.open({
			  type: 1,
			  time: 2,
			  title: "请求失败",
			  content: error
			});
		  });
		_self.fujians.splice(n - 1, 1);
		_self.fujianid.splice(n - 1, 1)
		_self.zrfujian.splice(n - 1, 1);
		console.log(_self.zrfujian);
		console.log(typeof JSON.stringify(_self.zrfujian));
		//						console.log(imgid[1])
		//						imgid.remove(n-1)
	  },

	/*
	 * header 返回箭头 
	*/
	goBack:function(){
		var _self=danjuApi.vue
		_self.$router.go(-1)
	},
	/*
	 * 查询用户信息
	*/
	userInfo:function(sn,userid){
		// var _self = this;
		this.$http
		  .post(
			"/pcontact_api/getroombyprojectsn?projectSn=" +
			  sn +
			  "&userId=" +
			  _self.userid
		  )
		  .then(function(response) {

		  })
	},
	// 获取上传图片的url
	getimgurl: function(n) {
		// var _self = this;
		_self.imgurl = []
		console.log(_self.zrimg)
		if(_self.zrimg != '') {
			_self.$http.post(
					"/sass_api/ get_uploadfile_info?fileIdStr=" + _self.zrimg).then(function(response) {
				if(response.data.code == 200) {
					console.log("data"+response.data.result)
					if(_self.tijao == 1 && _self.baocun != 1) { //保存不提交

						for(var i = 0; i < response.data.result.length; i++) {
							_self.imgurl.push({
								src: response.data.result[i].thumbnailurl
							})
						}
						danjuApi.save_send(n)
					} else if(_self.tijao != 1 && _self.baocun == 1) { //直接提交
						for(var i = 0; i < response.data.result.length; i++) {
							_self.imgurl.push({
								src: response.data.result[i].thumbnailurl
							})
						}
						danjuApi.save_send(n)
					} else if(_self.tijao == 1 && _self.baocun == 1) { //保存 再提交
						for(var i = 0; i < response.data.result.length; i++) {
							_self.imgurl.push({
								src: response.data.result[i].longurl
							})
						}
						danjuApi.save_send(n)
					}
				}
			})
		} else {
			if(_self.tijao == 1 && _self.baocun != 1) { //保存不提交
				danjuApi.save_send(n)
			} else if(_self.tijao != 1 && _self.baocun == 1) { //直接提交
				alert(n)
				danjuApi.save_send(n)
			} else if(_self.tijao == 1 && _self.baocun == 1) { //保存 再提交
				danjuApi.save_send(n)
			}
		}
	},
	/**
	 * 单据保存提交
	 * */ 
	save_send:function(n){
		// var _self = this;
		if(n==1){
			var baocun=layer.open({
				type:1,
				title:"保存中",
				content:""
			})
			// ludan("提交中",0,1)
		}else{
			var tijaio=layer.open({
				type:1,
				title:"提交中",
				content:""
			})
			// ludan("保存中",0,1)
		}
		//获取数据
		// var _self = this;
		// console.log(_self.pa_cigid)
		var fjid
		if(_self.attachmentIds == '') {
			_self.attachmentIds = ''
		} else {
			_self.attachmentIds = "," + _self.attachmentIds
		}
		console.log("图片11",_self.imgid);
		if(_self.imgid.toString() == '') {
			fjid = _self.fujianid.toString()
		} else if(_self.fujianid.toString() == '') {
			fjid = _self.imgid.toString()
		} else {
			fjid = _self.imgid.toString() + "," + _self.fujianid.toString()
		}
		if(n==1){
			//使用单据状态判断，无法满足需求。2018-5-21新增字段postType(提交保存状态)1=保存 2=提交
			_self.confirm = '0';
		}else{
			_self.confirm = '1';
			_self.postType = '1';
		}
		console.log("//////////"+_self.contractType)



		//收付款
		if (_self.jine == "") {
			_self.jine = 0;
		}
		var contractName,contractType,companySaleName,companySaleID,companySaleRoomID,companyBuyName,companyBuyID,companyBuyRoomID,
		money,htTotal,fapiaoTitle,fapiaoTaxLv,name,type,toimid,htTotal,fapiaoTitle,fapiaoTaxLv,dateShenqing,gongsialllei,personAccept,personAcceptID,personDistribute,
		personDistributeID,dateChengnuo 
		if(_self.$refs.title_name.innerText=="收付款"){
			contractName= _self.htong
			contractType= _self.contractType
			companySaleName= _self.companySaleName
			companySaleID= _self.companySaleID
			companySaleRoomID= _self.companySaleRoomID
			companyBuyName= _self.companyBuyName
			companyBuyID= _self.companyBuyID
			companyBuyRoomID= _self.companyBuyRoomID
			toimid=_self.companyBuyRoomImID
			money= parseFloat(_self.jine)
			dateShenqing= _self.dateShenqing
			htTotal= _self.jine
			fapiaoTitle= _self.piao
			fapiaoTaxLv= _self.fapiaoTaxLv
		}else if(_self.$refs.title_name.innerText=="收发件"){
			companySaleName= _self.pa_isroomname
			companySaleID= _self.pa_isRoomCreditCode
			gongsialllei: _self.nowCompany,
			companySaleRoomID= _self.pa_isroomid
			companyBuyName= _self.nowCompanyname.toString()
			companyBuyID= _self.nowCompanyid.toString()
			companyBuyRoomID= _self.nowCompanyroomid.toString()
			dateShenqing=_self.form.MissionStartDate
			name= _self.title
			type= _self.yewu
			toimid=_self.nowCompanyroomimid.toString()
		}else if(_self.$refs.title_name.innerText=="微承诺"){
			personAccept: _self.personAccept
			personAcceptID= _self.personAcceptID		
			personDistribute=_self.personDistribute
			personDistributeID= _self.personDistributeID
			companySaleName= _self.companySaleName
			companySaleID=_self.companySaleID
			companySaleRoomID= _self.companySaleRoomID
			companyBuyName= _self.companyBuyName
			companyBuyID= _self.companyBuyID
			companyBuyRoomID= _self.companyBuyRoomID
			dateShenqing=_self.shenqing
			dateChengnuo=_self.chengnuiriqi

			type= _self.type
		}
		var tablefields = {
			userName: _self.username,
			userID: _self.userid,
			dateShenqing: dateShenqing + " " + _self.nowtime,
			projectName: _self.pa_projectName,
			projectSN: _self.pa_projectsn,
			companySaleName: companySaleName,
			contractName: contractName,
			companySaleID: companySaleID,
			companySaleRoomID: companySaleRoomID,
			companyBuyName: companyBuyName,
			companyBuyID: companyBuyID,
			companyBuyRoomID: companyBuyRoomID,
			personAccept: personAccept,
			personAcceptID: personAcceptID	,	
			personDistribute:personDistribute,
			personDistributeID: personDistributeID,
			name: name,
			type: type,
			money:money,
			htTotal: htTotal,
        	fapiaoTitle:fapiaoTitle,
       		fapiaoTaxLv: fapiaoTaxLv,
			contractType:contractType,
			dateFasheng: _self.form.MissionStartDate + " " + _self.nowtime,
			dateChengnuo:_self.form.MissionStartDate+" "+ _self.nowtime,
			beizhu: _self.beizhu,
			confirmStatus: "", //确认状态

			confirmPersonName: "",
			confirmPersonID: "",
		}






		if(_self.id != '') {
			tablefields["id"] = _self.id
		}
		var param = {
			uid: _self.userid,
			table: {
				
				id: _self.pa_cigid,
				projectid: _self.pa_projectsn,
				roomid: _self.pa_isroomid,
				roomname: _self.pa_isroomname,
				userId: _self.userid,
				//								uid:'10395'
			},
			confirm: _self.confirm,
			postType: _self.postType ,
			attachment: fjid + _self.attachmentIds,
			toroomimid: toimid,
			gongsialllei: _self.nowCompany,
			currRoomImId: _self.currRoomImId,
			curRoomName: _self.currRoomClassName,
			roomid: _self.pa_isroomid,
			toImid: toimid,
			imgs: _self.imgurl,
			imgid: _self.zrimg,
			fujians: _self.fujians,
			fjid: _self.zrfujian,
			tablefields: tablefields,
			subtablefields: [],
			createRoomId:_self.$route.query.currRoomId,
		}
		// _self.attachmentIds = ''
		console.log("param",param)
		// alert(569)
		// alert(JSON.stringify(_self.imgurl))
		alert(JSON.stringify(param))
		_self.$http.post("/contract/save", param).then(function(response) {
			if(response.data.code == 200) {
				console.log(response.data)
				_self.first = 1
				_self.id = response.data.result.id
				// var succname = []
				// var faliename = []
				if(n == 2) {
					alert(5896)
					// layer.clsose(ludan("提交中",0,1))
					danjuApi.sendtodo(toimid)
				} else {
					layer.close(baocun)
					layer.open({
						type:1,
						title:"保存成功",
						content:"",
						time:2
					})
					// ludan("保存成功", 2, 2)
				}
			} else {
				// ludan("保存失败", 2, 1)
			}
		}).catch(function(error) {
			// ludan(error, 2, 1);
		})
	},
	//推送单据到房间 和代办
	sendtodo: function(toimid) {
		// var _self = this
		var titletype = encodeURIComponent(encodeURIComponent("收发件"));
		var title = encodeURIComponent(encodeURIComponent(_self.title));
		var todo_title,todo_content,todo_url
		if(_self.$refs.title_name.innerText=="收付款"){
			todo_title=decodeURI(_self.username) + "的收付款"
			todo_content="名称=" + _self.htong + "|金额=" + _self.jine +"元"
			todo_url="/static/newwebstatic/shoufukuan/transfer.html?id="
		}else if(_self.$refs.title_name.innerText=="收发件"){
			todo_title=decodeURI(_self.username) + "的收发件：" + _self.title
			todo_content="类别=" + _self.yewu + "|日期=" + _self.form.MissionStartDate
			todo_url="/static/newwebstatic/lianxi/transfer.html?id="
		}else if(_self.$refs.title_name.innerText=="微承诺"){
			if (_self.type == "单方承诺") {
				todo_title =
				 encodeURIComponent(_self.personAccept) +
				  "向" 
				  _self.personDistribute +
				  "的微承诺";
				  todo_content="承诺日期=" + _self.shenqing
				  todo_url="/static/newwebstatic/chengnuo/transfer.html?id="
			  } else {
				todo_title =
				  encodeURIComponent(_self.personAccept)+
				  "与" +
				  _self.personDistribute +
				  "的双向承诺";
				  todo_content="承诺日期=" + _self.shenqing
				  todo_url="/static/newwebstatic/chengnuo/transfer.html?id="
			  }
		}

		console.log()
		var todojson = {
			"title":todo_title,
			"titileTwo": _self.currRoomClassName + "-" + _self.pa_isroomname,
			"content": todo_content,
			"fileCount": "0",
			"url":  todo_url + _self.id,
			"colorString": "",
			"todoViewableMember": "0",
			"toImId": toimid,
			"formuserid": _self.userid,
			"currentRoomImid": _self.currRoomImId,
			"chatType": "2",
			"relation": _self.id,
			"score": "", //评分待办必要参数，设置分数
			"todoType": "3", //1评分待办，生成带有确认按钮待办，生成带有确认拒绝待办，必要参数
			"setButton": [{
				"type": 1, //按钮点击类型 1=请求url 2=打开url
				"name": "确认",
				"url":  "/contract/do_todobtu?type=1&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.pa_projectsn+"&sendtype=1"+"&titletype="+titletype,
			}, {
				"type": 1, //按钮点击类型 1=请求url 2=打开url
				"name": "退回",
				"url":  "/contract/do_todobtu?type=4&pingfen=0&docid=" + _self.id + "&projectSn=" + _self.pa_projectsn+"&title="+title+"&titletype="+titletype+"&sendtype=1",
			}]

		}
		console.log(todojson)
		window.appApi.sendTodo(todojson, function(d) {
			if(d.code == 200) {
				// ludan("提交成功", 2, 2, function() {
					appApi.refreshData(2);
					// setTimeout(function(){window.location.reload(),200})
				// })
			}else{
				// ludan(d, 2, 3)
			}

		})
	}

}
export default danjuApi