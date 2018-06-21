/**
 * 劳务待办确认操作业务
 * auther panzf
 * 2018.6.17
 */
var _self = null;
var axios = null;
var paramMap=null;
var userId=null;
var queryTime=null;
var projectId=null;
import laowu_common from "./laowu_common.js"
import wuxing1 from '@/assets/images/wuxing1.png'
var laowu_confirm = {

    initVue: function () {//初始化vue引用和http请求，并定义全局变量方便使用

        _self = this._self;
        axios = _self.$http;
        laowu_common.initVue(_self);
        paramMap=laowu_common.paramMap;
        userId=laowu_common.userId
        queryTime=laowu_common.queryTime
        projectId=laowu_common.projectId

    },
    initData: function () {
        laowu_common.findRoomData(); //加载房间信息
        var dataType = laowu_common.dataType
        _self.loginType = laowu_common.loginType;
        if (dataType == "calendar") {
            //我创建的、带我确认的
            laowu_confirm.loadAboutDatas();
            setTimeout(function () {
                laowu_confirm.loadAttRecords();
            }, 100);
        } else if (dataType == "confirm") {
            //待我确认的
            laowu_confirm.loadConfirmDatas();
        } else if (dataType == "hasconfirm") {
            //已确认列表
            laowu_confirm.loadHasConfirmDatas();
        } else if (dataType == "tododetail") {
            //待办入口的待确认详情
            laowu_confirm.loadConfirmDetail();
        }
       
    },
    backSelectMode: function () {
        var obj = this.form;
        //appApi.broadcast("reLoad()");//返回上一页刷新
        window.appApi.closeNewWindow();
    },
    loadConfirmDatas: function () {//查询待确认列表（待确认列表）
        var _self = this;
        _self.reqParams.queryType = 'confirm';
        _self.reqParams.confirmId = userId;
        _self.reqParams.projectId = projectId;
        axios.post(getUrl() + "/project_work_api/find_record_list", _self.reqParams).then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.result;
                if (result.length > 0) {
                    _self.data.confirmList = result;
                    _self.showPingfenList();//显示分数
                } else {
                    _self.data.confirmList = [];
                    //msg("未查询到待我确认的记录")
                }
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
        });
    },
    loadHasConfirmDatas: function () {//查询已确认
        var _self = this;
        _self.reqParams.queryType = 'hasConfirm';
        _self.reqParams.confirmId = userId;
        _self.reqParams.projectId = projectId;
        axios.post(getUrl() + "/project_work_api/find_record_list", _self.reqParams).then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.result;
                console.log("已确认", result)
                // if(result.length>0){
                //     _self.data.confirmList=result;
                //     _self.showPingfenList();//显示分数
                // }else {
                //     _self.data.confirmList=[];
                //     msg("未查询到待我确认的记录")
                // }
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
        });
    },
    loadAboutDatas: function () {//加载与我相关的数据列表(从日历列表)
        _self.reqParams.userId = userId;
        _self.reqParams.queryTime = queryTime;
        _self.reqParams.queryStatus = 3;
        _self.reqParams.projectId = projectId;
        axios.post("/project_work_api/find_record_create_confirm", _self.reqParams).then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.result;
                console.log("记录",result)
                if (result.length > 0) {
                    _self.data.confirmList = result;
                    laowu_confirm.showPingfenList();//显示分数
                } 
            }
        }).catch(function (error) {
            
            console.info(error);
        });

    },
    loadAttRecords: function () {//查询打卡记录
        var obj = new Object();
        if (laowu_common.loginType == 0) {
            obj.userId = laowu_common.gongrenId;//当前登陆ID
        }
        obj.confirmId = laowu_common.gongzhangId;//工长ID
        obj.queryTime = laowu_common.queryTime;//当前登陆ID
        obj.loginType = laowu_common.loginType;
        obj.queryType = 'day';
        obj.projectId = laowu_common.projectId;
        axios.post("/project_work_api/find_att_record_day", obj).then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.result;
                console.log("打卡记录", result);
                if (result.length > 0) {
                    _self.data.attrecordList = result;
                   
                } 
            }
        }).catch(function (error) {
            console.info(error);
        });
    },
    showPingfenList: function () {//显示分数
        setTimeout(function () {
            for (var i = 0; i < _self.data.confirmList.length; i++) {
                if (_self.data.confirmList[i].recordType == 1 || _self.data.confirmList[i].recordType == 2) {
                    laowu_confirm.viewPingfen(_self.data.confirmList[i].id, _self.data.confirmList[i].score);
                }
            }
        }, 10)
    },
    open_confirm_popver: function (type, time, obj) {//从待确认列表点击，弹出选择修改确认窗口
        var _self = this;
        var fenshu = 0;
        setTimeout(function () {
            if (type == 1 || type == 2) {//点工或包工需要显示分数
                fenshu = _self.getPingfen(obj.id);
            }
            //跳转详情页
            appApi.openNewWindow('/static/webstatic/new_laowu/project_confirm_detail.html?dataType=tododetail&type=' + type + '&time=' + time + '&id=' + obj.id + '&fenshu=' + fenshu + "&serialNum=" + obj.serialNum);

        }, 100);


        //弹出对比窗口**********结束*************
    },
    loadConfirmDetail: function () {//确认详情页
        
        var serialNum = paramMap.serialNum;
        laowu_confirm.loadContrastData(paramMap.type, paramMap.time, serialNum);
        if (paramMap.type == 1 || paramMap.type == 2) {//点工或包工需要显示分数
            /*设置评分*/
            var fenshu = paramMap.fenshu;
            _self.score = fenshu;
            if (serialNum != null && fenshu) {
                setTimeout(function () {
                    viewPingfen(serialNum, fenshu);
                }, 80)
            }
        }
    },
    loadContrastData: function (type, time, serialNum) {//待确认加载对比窗口数据
        if (serialNum) {//查询关联数据
            var param = new Object();
            param.serialNum = serialNum;
            axios.post("/project_work_api/find_record?queryType=serialNum", param).then(function (response) {
                if (response.data.code == 200) {
                    var result = response.data.result;
                    console.log(result)
                    var data = null;
                    if (result.length > 0) {
                        data = result[0];
                    } else {
                        data = null;
                    }
                    _self.selectobj = data;
                    setTimeout(function () {
                        _self.createTimeStr = time;
                        _self.select_user_name = _self.selectobj.userName;
                        if (_self.selectobj.correlationId) {//查询关联数据
                            var param = new Object();
                            param.id = _self.selectobj.correlationId;
                            axios.post("/project_work_api/find_record", param).then(function (response) {
                                if (response.data.code == 200) {
                                    var result = response.data.result;
                                    var data = null;
                                    if (result.length > 0) {
                                        data = result[0];
                                    } else {
                                        data = null;
                                    }
                                    _self.myobj = data;
                                }
                            }).catch(function (error) {
                                msg(error)
                                console.info(error);
                            });
                        } else {
                            _self.myobj = null;
                        }
                    }, 10)
                }
            }).catch(function (error) {
                msg(error)
                console.info(error);
            });
        } else {
            _self.selectobj = null;
        }

        if (type == 1) {
            _self.select_name = "点工确认";
        } else if (type == 2) {
            _self.select_name = "包工确认";
        } else if (type == 3) {
            _self.select_name = "借支确认";
        } else if (type == 4) {
            _self.select_name = "结算确认";
        }
        _self.select_user_type = type;
    },
    open_calendar_popver: function (type, time, obj) {//从日历列表点击，弹出选择修改确认窗口(obj是自己的记录)
        if (obj.operateStatus == 2 || obj.operateStatus == 3) {//弹出记录对比窗口
            _self.createTimeStr = time;
            _self.myobj = obj;
            _self.select_user_name = obj.confirmName;
            if (obj.correlationId) {//查询关联数据
                var param = new Object();
                param.id = obj.correlationId;
                axios.post(getUrl() + "/project_work_api/find_record", param).then(function (response) {
                    if (response.data.code == 200) {
                        var result = response.data.result;
                        var data = null;
                        if (result.length > 0) {
                            data = result[0];
                        } else {
                            data = null;
                        }
                        _self.selectobj = data;
                    }
                }).catch(function (error) {
                    msg(error)
                    console.info(error);
                });
            } else {
                _self.selectobj = null;
            }
            if (type == 1) {
                _self.select_name = "点工确认";
            } else if (type == 2) {
                _self.select_name = "包工确认";
            } else if (type == 3) {
                _self.select_name = "借支确认";
            } else if (type == 4) {
                _self.select_name = "结算确认";
            }
            _self.select_user_type = type;

            //*********弹窗显示分数开始*************
            setTimeout(function () {
                if (type == 1 || type == 2) {//点工或包工需要显示分数
                    /*设置评分*/
                    var fenshu = _self.getPingfen(obj.id);
                    console.log(fenshu)
                    if (obj != null) {
                        setTimeout(function () {
                            viewPingfen(obj.id, fenshu);
                        }, 10)

                    }
                }
                mui('#cus_calendar_popver').popover('toggle');
                appApi.setPullRefresh(false);
                jQuery(".mui-backdrop").click(function () {
                    appApi.setPullRefresh(true);
                })
            }, 300)

            //*********弹窗显示分数结束*************

        } else {//跳转详情页
                
            var paramRoomId = "&isRoomId=" + laowu_common.roomId;
            var pagepath="/static/webstatic"
            if (type == 1) {//点工详情
                appApi.openNewWindow(pagepath + '/new_laowu/project_diangong_detail.html?saveType=view&id=' + obj.id + paramRoomId);
            } else if (type == 2) {//包工详情
                appApi.openNewWindow(pagepath + '/new_laowu/project_baogong_detail.html?saveType=view&id=' + obj.id + paramRoomId);
            } else if (type == 3) {//借支详情
                appApi.openNewWindow(pagepath + '/new_laowu/project_jiezhi_detail.html?saveType=view&id=' + obj.id + paramRoomId);
            } else if (type == 4) {//结算详情
                appApi.openNewWindow(pagepath + '/new_laowu/project_jiesuan_detail.html?saveType=view&id=' + obj.id + paramRoomId);
            }
        }

    },
    /**
     *
     * @param id  要修改的记录ID
     * @param saveType 只是修改还是修改并新增记录
     * @param recordType 记录类型，1表示点工...
     */
    update: function (id, saveType, recordType, openType) {
        if (!id) {
            msg("没有找到要修改的记录")
            return;
        }
        if (!recordType) {
            msg("没有找到要修改的类型")
        }

        var url = "";
        if (recordType == 1) {
            url += '/static/webstatic/new_laowu/project_diangong_gongren.html?saveType=' + saveType + '&id=' + id + "&recordType=" + recordType;
        } else if (recordType == 2) {
            url += '/static/webstatic/new_laowu/project_baogong.html?saveType=' + saveType + '&id=' + id + "&recordType=" + recordType;
        } else if (recordType == 3) {
            url += '/static/webstatic/new_laowu/project_jiezhi.html?saveType=' + saveType + '&id=' + id + "&recordType=" + recordType;
        } else if (recordType == 4) {
            url += '/static/webstatic/new_laowu/project_jiesuan.html?saveType=' + saveType + '&id=' + id + "&recordType=" + recordType;
        }
        console.log("编辑页面。。。")
        // appApi.openNewWindow(url);
        window.location.href = url + "&isRoomId=" + laowu_common.roomId;
    },
    agree_calendar: function (selectObj, myObj) {//同意别人的操作（从日历列表）
        var _self = this;
        var pingfen = "";//设置评分
        var recordType = "";//记录类型
        if (selectObj == null) {//别人的记录ID
            _self.agreeParams.otherId = null;
            _self.agreeParams.queryStatus = null;
        } else {
            _self.agreeParams.otherId = selectObj.id
            _self.agreeParams.queryStatus = selectObj.operateStatus;//别人的记录状态
        }
        if (myObj == null) {//我的记录ID
            _self.agreeParams.id = null;
        } else {
            recordType = myObj.recordType;
            _self.agreeParams.id = myObj.id;
        }
        _self.agreeParams.userId = userId;
        // userName=encodeURIComponent(userName);//编码
        _self.agreeParams.name = userName;
        //***************评分校验***************
        pingfen = _self.getPingfen(_self.agreeParams.id);//获取分数
        if (loginType == 1 && (recordType == 1 || recordType == 2)) {//当前登陆人是工头，记录类型为点工或包工则校验分数
            if (!pingfen) {
                msg("请先给工人评分");
                return;
            }
        }
        loading("请稍后...")
        axios.post(getUrl() + "/project_work_api/agree_record?identityType=" + loginType + "&pingfen=" + pingfen, this.agreeParams).then(function (response) {
            if (response.data.code == 200) {
                msg("确认操作成功");
                setTimeout(function () {
                    mui('#cus_calendar_popver').popover('toggle');
                    _self.data.confirmList = [];
                    _self.loadAboutDatas();
                }, 50)
                closeLayer();
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
            closeLayer();
        });
    },
    agree_confirm: function (selectObj, myObj) {//同意别人的操作(从待确认列表)(app待办详情页面使用)
        var _self = this;
        var recordType = "";//获取记录类型
        var pingfen = "";//设置评分
        if (selectObj == null) {//别人的记录ID
            _self.agreeParams.otherId = null;
            _self.agreeParams.queryStatus = null;
        } else {
            recordType = selectObj.recordType;
            _self.agreeParams.otherId = selectObj.id
            _self.agreeParams.queryStatus = selectObj.operateStatus;//别人的记录状态
        }
        if (myObj == null) {//我的记录ID
            _self.agreeParams.id = null;
        } else {
            _self.agreeParams.id = myObj.id;
        }
        _self.agreeParams.userId = userId;
        //userName =encodeURIComponent(userName);//编码
        _self.agreeParams.name = userName;
        //***************评分校验***************
        pingfen = _self.score;//获取分数
        if (loginType == 1 && (recordType == 1 || recordType == 2)) {//当前登陆人是工头，记录类型为点工或包工则校验分数
            if (!pingfen) {
                msg("请先给工人评分");
                return;
            }
        }
        loading("请稍后...")
        axios.post(getUrl() + "/project_work_api/agree_record?identityType=" + loginType + "&pingfen=" + pingfen, this.agreeParams).then(function (response) {
            if (response.data.code == 200) {
                msg("确认操作成功");
                closeWindow();
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
            closeLayer();
        });
    },
    agreeBtn_calendar: function (item, list) {//快速确认,item是我的(日历入口)
        var _self = this;
        _self.agreeParams.id = item.id;
        _self.agreeParams.userId = userId;
        //userName=encodeURIComponent(userName);//编码
        _self.agreeParams.name = userName;
        _self.agreeParams.otherId = item.correlationId;//别人的记录ID
        if (item.correlationId) {
            var param = new Object();
            param.id = item.correlationId;
            axios.post(getUrl() + "/project_work_api/find_record", param).then(function (response) {
                if (response.data.code == 200) {
                    var result = response.data.result;
                    if (result.length > 0) {
                        var data = result[0];
                        _self.agreeParams.queryStatus = data.operateStatus;//别人的记录状态
                    } else {
                        _self.agreeParams.queryStatus = null;//别人的记录状态
                    }
                }
            }).catch(function (error) {
                msg(error)
                console.info(error);
            });
        }
        var pingfen = item.score;//获取评分
        //***********评分校验***********
        if (_self.loginType == 1 && (item.recordType == 1 || item.recordType == 2)) {//如果是工长需要评分,且记录类型为点工或包工
            if (!item.score || item.score == 0) {
                msg("请先给工人评分");
                return
            }
        }
        loading("请稍后...")
        setTimeout(function () {
            axios.post(getUrl() + "/project_work_api/agree_record?identityType=" + loginType + "&pingfen=" + pingfen, _self.agreeParams).then(function (response) {
                if (response.data.code == 200) {
                    msg("确认操作成功");
                    setTimeout(function () {
                        _self.data.confirmList = [];
                        _self.loadAboutDatas();
                    }, 50);
                    closeLayer();
                }
            }).catch(function (error) {
                msg(error)
                console.info(error);
                closeLayer();
            });
        }, 100)

    },

    agreeBtn_confirm: function (item, list) {//快速确认,item是别人的（待确认入口）(h5页面使用)

        var _self = this;
        _self.agreeParams.id = item.correlationId;
        _self.agreeParams.userId = userId;
        _self.agreeParams.name = userName;
        _self.agreeParams.otherId = item.id;//别人的记录ID
        _self.agreeParams.queryStatus = item.operateStatus;//别人的记录状态
        //***********评分校验***********
        if (_self.loginType == 1 && (item.recordType == 1 || item.recordType == 2)) {//如果是工长需要评分,且记录类型为点工或包工
            if (!item.score || item.score == 0) {
                msg("请先给工人评分");
                return
            }
        }
        var pingfen = item.score;//获取评分
        var formData = new FormData();
        formData.append("recordId", recordId);
        formData.append("otherRecordId", otherRecordId);
        formData.append("operateStatus", operateStatus);
        formData.append("loginType", loginType);
        formData.append("userId", userId);
        formData.append("userName", userName);
        formData.append("pingfen", pingfen);
        var param = "/project_work_api/agree_todo?recordId=" + recordId + "&otherRecordId=" + otherRecordId + "&queryStatus=" + queryStatus + "&pingfen=" + pingfen
        loading("请稍后...")
        axios.post(getUrl() + "/project_work_api/agree_todo?identityType=" + loginType + "&pingfen=" + 3, this.agreeParams).then(function (response) {
            if (response.data.code == 200) {
                msg("确认操作成功");
                setTimeout(function () {
                    removeData(item.id)//从数组中移除所确认的数据
                }, 50);
                closeLayer();
            }
        }).catch(function (error) {
            msg(error)
            console.info(error);
            closeLayer();
        });
    },
    popup: function (content) {
        msg(content);
    },
    stopEvt: function (obj) {
        stopEvt(obj);
    },
    selectStarMulti: function (val, id) {//设置分数（多人）
        this.score = val;
        this.setPingfenMutil(val, id);
        this.setWuXingMutil(val, id);
    },
    selectStarDetail: function (val, serialNum) {//确认详情设置分数
        this.score = val;
        this.setWuXingMutil(val, serialNum);
    },
    setWuXingMutil: function (val, name) {//显示选择的分数
        var zrcimg = document.getElementsByName(name);
        for (var j = 0; j < zrcimg.length; j++) {
            var cun = val
            for (var i = 0; i < cun; i++) {
                zrcimg[j].children[i].children[0].src = "../../images/wuxing.png"
            }
            for (var i = cun; i < 5; i++) {
                zrcimg[j].children[i].children[0].src = "../../images/wuxing1.png"
            }
        }

    },
    setPingfenMutil: function (val, recordId) {
        var _self = this;
        for (var i = 0; i < _self.data.confirmList.length; i++) {
            if (_self.data.confirmList[i].id == recordId) {//根据用户ID设置对应的用户分数
                _self.data.confirmList[i].score = val;
                break;
            }
        }
    },
    getPingfen: function (recordId) {
        var _self = this;
        var pingfen = 0;
        //console.log("数组",_self.data.confirmList)
        for (var i = 0; i < _self.data.confirmList.length; i++) {
            if (_self.data.confirmList[i].id == recordId) {//根据用户ID设置对应的用户分数
                pingfen = _self.data.confirmList[i].score;
                break;
            }
        }
        return pingfen;
    },
    /*显示分数*/
 viewPingfen:function(name,fenshu) {
    this.clearPingfen(name);//显示之前先清除旧的评分
    setTimeout(function () {
        var zrimg=document.getElementsByName(name);
        for(var i=0;i<zrimg.length;i++ ){
            for(var j=0;j<fenshu;j++){
                zrimg[i].children[j].children[0].src="../../images/wuxing.png"
            }
        }
    },10)


},

 clearPingfen:function(name) {

    var zrimg=document.getElementsByName(name);
    for(var i=0;i<zrimg.length;i++ ){
        for(var j=0;j<5;j++){
            zrimg[i].children[j].children[0].src="../../images/wuxing1.png"
        }
    }

},

 clickCalendar:function(queryTime) {
     var app=_self
     console.log(queryTime)
    if(!queryTime){
        msg("请选择查询日期")
        return
    }
    app.reqParams.userId=laowu_common.userId;
    app.reqParams.queryTime=queryTime;
    app.reqParams.queryStatus=3;
    app.reqParams.projectId=laowu_common.projectId;
    axios.post("/project_work_api/find_record_create_confirm",app.reqParams).then(function (response) {
        if(response.data.code==200){
            var result=response.data.result;
            console.log("级攻击了",result)
            if(result.length>0){
                app.data.confirmList=result;
                setTimeout(function () {
                    laowu_confirm.showPingfenList();//显示分数
                },10)
            }else {
                app.data.confirmList=[];
            }
        }
    }).catch(function (error) {
        msg(error)
        console.info(error);
    });

    var obj=new Object();
    if(laowu_common.loginType==0){
        obj.userId=laowu_common.gongrenId;//当前登陆ID
    }
    obj.confirmId=laowu_common.gongzhangId;//工长ID
    obj.queryTime=laowu_common.queryTime;//当前登陆ID
    obj.loginType=laowu_common.loginType;
    obj.queryType='day';
    obj.projectId=laowu_common.projectId;
    axios.post("/project_work_api/find_att_record_day",obj).then(function (response) {
        if(response.data.code==200){
            var result=response.data.result;
            console.log("打卡记录",result);
            if(result.length>0){
                app.data.attrecordList=result;
            }else {
                 app.data.attrecordList=[];
            }
        }
    }).catch(function (error) {
        console.info(error);
    });

}


}

export default laowu_confirm