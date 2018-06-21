/**
 * 记工记账主业务
 * @author zouxinqi
 * Created by zouxinqi on 2017/08/22.
 */
var _self = null;
var axios = null;
import laowu_common from "./laowu_common.js"
var paramMap=laowu_common.paramMap;

var laowu_main = {

    initVue: function () {//初始化vue引用和http请求，并定义全局变量方便使用
       
        _self = this._self;
        axios = _self.$http;
        laowu_common.initVue(_self);

    },
    initData: function () {//初始化数据
        console.log("初始化...")
        laowu_common.findRoomData();//加载房间信息
        var recordId = paramMap.id;//记录ID，用于查询、修改单据
        var saveType=laowu_common.saveType;
        var gongzhangId=laowu_common.gongzhangId;
        var gongzhangName=laowu_common.gongzhangName;
        var gongrenId=laowu_common.gongrenId;
        var gongrenName=laowu_common.gongrenName;
        var confirmId=laowu_common.confirmId;
        var confirmName=laowu_common.confirmName;
        var userId=laowu_common.userId;
        var userName=laowu_common.userName;
        var projectId=laowu_common.projectId;
        var projectName=laowu_common.projectName;
        var recordType=laowu_common.recordType;
        var dataType=laowu_common.dataType;
        var loginType=laowu_common.loginType;
        var date=laowu_common.date;
        var mutil=laowu_common.mutil;
        _self.loginType = loginType;//登陆类型
        _self.save_type = saveType;//记录类型
        _self.form.createTimeStr = date;//默认创建时间为当前时间
        _self.form.recordType = recordType;//设置记账类型
        
        if ((saveType == 'save' || saveType == 'update' || saveType == 'view' || saveType == 'chartview' || laowu_common.dataType == 'todoview') && laowu_common.dataType != 'todowork') {//编辑、查询详情、已办详情页
        laowu_main.loadDataById(recordId);//根据ID查询记录
        
        } else {//新建
            //初始化单据信息
            if (loginType == 0) {//如果创建这个单的是工人，那么确认人是工头，工人则是当前登陆人
                confirmId = gongzhangId;
                confirmName = gongzhangName;
            } else {//如果当前是工长创建单据，那么确认人是工人，工长则是登陆人
                confirmId = gongrenId;
                confirmName = gongrenName;
            }
            _self.form.workHourName = "8小时";//正常上班时长（名称）
            _self.form.workHour = "8";//正常上班时长（名称）
            _self.form.overHourName = "0小时";//加班时长（名称）
            _self.form.overHour = "0";//加班时长（名称）
            setTimeout(function () {//这里需要延长取值
                _self.form.confirmId = confirmId;//确认人Id
                _self.form.confirmName = confirmName;//确认人名称
                _self.form.userId = userId;
                _self.form.userName = userName;
                _self.form.projectId = projectId;
                _self.form.projectName = projectName;
                _self.form.gongzhangId = gongzhangId;
                _self.form.gongzhangName = gongzhangName;
                _self.form.gongrenId = gongrenId;
                _self.form.gongrenName = gongrenName;
                _self.form.identityType = loginType;//身份类型
            }, 100)

           // console.log(gongzhangId)
            //点工类型才需要工资标准
            if (gongzhangId && userId && recordType == 1 && mutil == 0) {
                console.log("开始查询工资标准...")
                laowu_main.initNormalData();//加载工资标准信息
                setTimeout(function () {
                    if (loginType == 0) {
                        laowu_main.setMoney(1);//计算金额(工人)
                    } else {
                        laowu_main.setMoney(2);//计算金额（工长）
                    }

                }, 50)
            }
        }
        if (recordType == 1) {//点工
            laowu_common.showTimeLists()
            _self.data.timeList=laowu_common.timeList
            _self.sindex=laowu_main.getIndex(_self.data.timeList,_self.form.workHour);
            _self.oindex=laowu_main.getIndex(_self.data.timeList,_self.form.overHour);
            _self.solt=laowu_common.timeList
        }
        if (recordType == 2) {//包工类型
            laowu_common.showUnitLists();
            _self.data.unitList=laowu_common.unitList;
        }
        if (laowu_common.dataType == 'todowork') {//房间提醒待办进来
            _self.form.createTimeStr = queryTime;
            laowu_main.updateReadStaus();
        }
        console.log("表单",_self.form)
    
    },

    getIndex:function(ary,key){
        console.log("数组",ary)
        var _self=this
        var selectindex=null
        if(ary.length>0 && key){
            for(var i=0;i<ary.length;i++){
                if(ary[i].baseId==key){
                   selectindex=i;
                   break;
                }
            }
        }
        return selectindex
    },

    setTitle:function(){
        var recordType=laowu_common.recordType;
        _self.detailType=recordType;
        var mutil=laowu_common.mutil;
        if(recordType==1){
            _self.title="记点工"
        }else if(recordType==2){
            _self.title="记包工"
        }else if(recordType==3){
            _self.title="记借支"
        }else if(recordType==4){
            _self.title="记结算"
        }
    },

    updateReadStaus: function () {//更新待办查看状态

        var _self = this;
        if (!projectId) {
            msg("项目ID不能为空")
            return
        }
        var form = new FormData();
        form.append("userId", userId)
        form.append("projectId", projectId)
        form.append("confirmId", gongzhangId)
        form.append("queryType", "readStatus")
        axios.post(getUrl() + "/project_work_api/update_quertz", form).then(function (response) {
            if (response.data.code == 200) {
                // msg("状态更新完成")
            } else {
                msg("状态更新出错!")
            }
        }).catch(function (error) {
            console.info(error);
        });
    },
    updateObject: function (id, type) {//修改记录

        var url = "/static/webstatic";
        if (type == 1) {//修改点工
            url += '/new_laowu/project_diangong_gongren.html?id=' + id + "&saveType=update" + "&recordType=" + type;
        } else if (type == 2) {//修改包工
            url += '/new_laowu/project_baogong.html?id=' + id + "&saveType=update" + "&recordType=" + type;
        } else if (type == 3) {//修改借支
            url += '/new_laowu/project_jiezhi.html?id=' + id + "&saveType=update" + "&recordType=" + type;
        } else if (type == 4) {//修改结算
            url += '/new_laowu/project_jiesuan.html?id=' + id + "&saveType=update" + "&recordType=" + type;
        }
        else {
            msg("没有找到要修改的类型")
            return
        }
        window.location.href = url + "&isRoomId=" + laowu_common.roomId;
    },
    //根据ID查询记录
    loadDataById: function (id) {
        _self.reqParams.id = id;
        var saveType=laowu_common.saveType
        var loginType=laowu_common.loginType
        var dataType=laowu_common.dataType
        var obj=new Object()
        obj.id=111
        console.log("参数",_self.reqParams)
        $.ajax({
            type: "post",
            url: "/api/project_work_api/find_record",
            async: false,
            data:  JSON.stringify(_self.reqParams),
            datatype: "json",
            contentType : 'application/json',
            success: function(data) {
               var result=data.result;
               if (data.result.length > 0) {
                var obj = data.result[0];
                console.log("根据ID查询记录", obj)
                _self.form = obj;//重新赋值
                //查询打卡记录
                if (saveType != 'save' && saveType != 'update') {
                    laowu_main.loadAttRecords();
                }
                laowu_common.confirmId = obj.confirmId;//确认人Id
                laowu_common.confirmName = obj.confirmName;//确认人名称
                laowu_common.date = obj.createTimeStr;
                laowu_common.projectId = obj.projectId;
                laowu_common.projectName = obj.projectName;
                laowu_common.gongzhangId = obj.gongzhangId;
                laowu_common.gongzhangName = obj.gongzhangName;
                laowu_common.recordType = obj.recordType;
                laowu_common.gongrenId = obj.gongrenId;
                laowu_common.gongrenName = obj.gongrenName;
                //初始化单据信息
                if (loginType == 0) {//如果创建这个单的是工人，那么确认人是工头
                    laowu_common.confirmId = laowu_common.gongzhangId;
                    laowu_common.confirmName = laowu_common.gongzhangName;
                } else {//如果当前是工长创建单据，那么确认人是工人
                    laowu_common.confirmId = laowu_common.gongrenId;
                    laowu_common.confirmName = laowu_common.gongrenName;
                }
                setTimeout(function () {
                    if ((saveType == 'view' || saveType == 'chartview' || saveType == 'update' || saveType == 'save' || dataType == 'todoview') && (obj.recordType == 1 || obj.recordType == 2)) {
                        //设置评分
                        if (obj.score) {
                            laowu_main.viewPingfen(obj.score)
                        }
                    }
                    var moneyHtml = document.getElementById("money");
                    if (moneyHtml != null) {
                        //设置金额
                        moneyHtml.innerHTML = obj.money;
                    }

                }, 10);
            } else {
                alert("未查询到记录，请检查ID是否正确")
            }
            },
            error: function() {
                console.log("err")
            }
        })
       
    },
    loadAttRecords: function () {//查询打卡记录
        _self.reqWorkParamsVO.confirmId = _self.form.gongzhangId;//工长ID
        _self.reqWorkParamsVO.userId = _self.form.gongrenId;//当前登陆ID
        _self.reqWorkParamsVO.queryTime = _self.form.createTimeStr;//当前登陆ID
        _self.reqWorkParamsVO.loginType = laowu_common.loginType;
        _self.reqWorkParamsVO.queryType = 'day';
        _self.reqWorkParamsVO.projectId = laowu_common.projectId;
        if (laowu_common.dataType == 'todoview') {//已办列表入口，参数不一致，因此需要重新设置查询类型
            _self.reqWorkParamsVO.saveType = laowu_common.dataType;
        } else {
            _self.reqWorkParamsVO.saveType = laowu_common.saveType;
        }
        axios.post("/project_work_api/find_att_record_day", _self.reqWorkParamsVO).then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.result;
                //console.log("打卡记录",result);
                if (result.length > 0) {
                    _self.data.attform = result;
                  
                } else {
                    console.log("未查询到打卡记录!")
                }
            }
        }).catch(function (error) {
            console.info(error);
        });
    },
    //初始化标准工资信息
    initNormalData: function () {
        var gongzhangId=laowu_common.gongzhangId;
        var gongrenId=laowu_common.gongrenId;
        var projectId=laowu_common.projectId;
        _self.reqParams.gongzhangId = gongzhangId;//工长ID
        _self.reqParams.userId = gongrenId;//当前登陆ID
        _self.reqParams.projectId = projectId;//当前登陆ID
        axios.post("/project_work_api/find_normal_cfg", _self.reqParams).then(function (response) {
            if (response.data.code == 200) {
               // console.log(response.data.result)
                if (response.data.result.length > 0) {
                    var result = response.data.result[0];
                    _self.form.datePrice = result.money;
                    _self.form.datePriceName = result.moneyName;//日工资（名称）
                    _self.form.workNormalHour = result.workNormalHour;//上班时长（标准）
                    _self.form.overNormalHour = result.overNormalHour;//加班时长（标准）
                    _self.form.workNormalHourName = result.workNormalHourName;//上班时长（标准）名称
                    _self.form.overNormalHourName = result.overNormalHourName;//加班时长（标准）名称
                    _self.form.gongzhongId = result.gongzhongId;
                    _self.form.gongzhongName = result.gongzhongName;
                } else {
                    console.log("未查询到标准工资!")
                }
            }
        }).catch(function (error) {
            console.info(error);
        });
    },
    open_time_popver: function (type) {//选择上班时长窗口
        _self.select_type = type;
        if (type == 1) {
            _self.select_hour = this.form.workHour;
            _self.select_name = "选择上班时长";
        } else if (type == 2) {
            _self.select_hour = this.form.overHour;
            _self.select_name = "选择加班时长";
        }
        
    },
    open_number_popver: function () {//选择数量窗口
        var _self = this;
        var param = "?type=1";
        if (_self.form.unit) {
            param += "&unit=" + _self.form.unit;
        }
        if (_self.form.number) {
            param += "&number=" + _self.form.number;
        }
        appApi.openNewWindow(pagepath + '/new_laowu/project_number_config.html' + param);

        // _self.select_unit=_self.form.unit;
        // mui('#cus_number_popver').popover('toggle');
        // appApi.setPullRefresh(false);
        // jQuery(".mui-backdrop").click(function() {
        //   _self.setNumber();//设置数量和单位
        //     appApi.setPullRefresh(true);
        // })
    },
    open_unit_popver: function () {//选择单位窗口
        var _self = this;
        $('#cus_unit_popver').popover('toggle');
        appApi.setPullRefresh(false);
        jQuery(".mui-backdrop").click(function () {
            _self.setNumber();//设置数量和单位
            appApi.setPullRefresh(true);
        })
    },
    timeClick: function (time, type,mutil) {//确定选择上班时长
       
        if (type == 1) {
            _self.form.workHour = time.baseId;
            _self.form.workHourName = time.baseName;//上班时常名称
        } else if (type == 2) {
            _self.form.overHour = time.baseId;
            _self.form.overHourName = time.baseName;//加班时长名称
        }
        laowu_main.setMoney(mutil)
        
        console.log(_self.form)
       

    },
    unitClick: function (unit) { //确定单位
        _self.form.unit = unit.baseName;
        _self.select_unit = unit.baseName;
        laowu_main.setNumber();//设置数量和单位
        _self.close_unit_popver()
    },

    setNumber: function () {//设置数量和单位
        if (_self.form.number) {
            _self.form.numberName = _self.form.number + "  " + _self.form.unit + "";
            laowu_main.setBaoGongMoney();
        }
    },
    closePop: function (id) {//关闭时间选择窗口
        setTimeout(function () {
            mui('#cus_time_popver').popover('toggle');
        }, 150)

    },

    selectDate: function () {//选择日期
        var _self = this;
        var time = _self.form.createTimeStr;
        if (time != null && time != "") {
            opt.value = time;
        } else {
            var date = getNowFormatDate();
            opt.value = date;
        }
        var picker = new mui.DtPicker(opt);
        picker.show(function (rs) {
            opt["value"] = rs.value; //控件同步
            _self.form.createTimeStr = rs.value;
            picker.dispose(); //释放资源
        })
    },
    deleteObj: function (id) {//删除记录，将操作状态设置为删除状态，并不是真正的删除
        _self.form.id = id;
        var userName=laowu_common.userName
        var userId=laowu_common.userId
        var loginType=laowu_common.loginType
        var saveType=laowu_common.saveType
        loading("请稍后...")
        axios.post(getUrl() + "/project_work_api/find_record", _self.form).then(function (response) {
            if (response.data.code == 200) {
                if (response.data.result.length > 0) {
                    _self.data.deleteForm = response.data.result[0];
                    userName = window.encodeURIComponent(userName)
                    var param = "&saveType=" + saveType + "&userId=" + userId + "&userName=" + userName + "&identityType=" + loginType;
                    axios.post("/project_work_api/update_record?type=delete" + param, _self.data.deleteForm).then(function (response) {
                        if (response.data.code == 200) {
                            alert("删除成功!");
                            //closeWindow();
                        } else {
                            alert("删除错误!");
                            //closeLayer();
                        }
                    }).catch(function (error) {
                        console.info(error);
                        closeLayer();
                    });
                }
            }
        }).catch(function (error) {
            console.info(error);

        });


    },
    openGongrenList: function (recordType) {//选择工人列表
        var date = _self.form.createTimeStr;
        var roomId=laowu_common.roomId;
        var recordType=laowu_common.recordType;
        var projectId=laowu_common.projectId;
        var selectUserIdList = [];
      
        if (_self.data.selectUserList.length > 0) {
            for (var i = 0; i < _self.data.selectUserList.length; i++) {
                selectUserIdList.push(_self.data.selectUserList[i].userId);
            }
            appApi.openNewWindow('/static/webstatic/new_laowu/gongren_list.html?recordType=' + recordType + '&date=' + date + '&param=' + JSON.stringify(selectUserIdList) + "&roomId=" + roomId + "&projectId=" + projectId);
        } else {
            appApi.openNewWindow('/static/webstatic/new_laowu/gongren_list.html?recordType=' + recordType + '&date=' + date + "&roomId=" + roomId + "&projectId=" + projectId);
        }

        laowu_main.setMoney(2);//计算金额
    },

    tongBuNormal: function (normal) {//获取最新工资标准
        var _self = this;
        _self.form.datePrice = normal.money;
        _self.form.datePriceName = normal.moneyName;
        _self.form.overNormalHour = normal.overNormalHour;
        _self.form.overNormalHourName = normal.overNormalHourName;
        _self.form.workNormalHour = normal.workNormalHour;
        _self.form.workNormalHourName = normal.workNormalHourName;
        _self.form.gongzhongId = normal.gongzhongId;
        _self.form.gongzhongName = normal.gongzhongName;
        setMoney(1);
        layer.closeAll();
        setTimeout(function () {
            _self.saveRecord(true);
        }, 100)
    },
    checkNormal: function () {//校验工资标准
        var gongrenId=laowu_common.gongrenId;
        var gongzhangId=laowu_common.gongzhangId;
        var projectId=laowu_common.projectId;
        _self.checkNormalFlag = true;
        _self.normalParams.userId = gongrenId;
        _self.normalParams.gongzhangId = gongzhangId;
        _self.normalParams.projectId = projectId;
        axios.post("/project_work_api/find_normal_cfg", _self.normalParams).then(function (response) {
            if (response.data.code == 200) {
                var flag = false;
                var result = response.data.result;
                if (result.length > 0) {
                    var normal = result[0];
                    if (_self.form.datePrice == normal.money
                        && _self.form.datePriceName == normal.moneyName
                        && _self.form.overNormalHour == normal.overNormalHour
                        && _self.form.overNormalHourName == normal.overNormalHourName
                        && _self.form.workNormalHour == normal.workNormalHour
                        && _self.form.workNormalHourName == normal.workNormalHourName
                        && _self.form.gongzhongId == normal.gongzhongId
                        && _self.form.gongzhongName == normal.gongzhongName
                    ) {
                        flag = true;
                    }
                    if (!flag) {//工资标准有差异
                        confirmLayer("当前工资标准与其他版本不一致，如果取消则保留当前工资标准，确认则将当前工资标准更新为最新标准", function () {//确定
                            // setTimeout(function () {
                            //     _self.tongBuNormal(normal);
                            // },100)
                            setTimeout(function () {
                                laowu_main.saveRecord(true);
                            }, 100)
                        }, function () {//不需要同步，则直接保存
                            setTimeout(function () {
                                laowu_main.saveRecord();
                            }, 100)
                        }, "取消", "确认");
                    } else {//无差异直接保存
                        setTimeout(function () {
                            laowu_main.saveRecord();
                        }, 100)
                    }
                } else {//没有工资标准，第一次加入项目不需要校验，直接保存
                    setTimeout(function () {
                        laowu_main.saveRecord();
                    }, 100)
                }
            } else {
                msg("工资标准查询错误!");
                return
            }
        }).catch(function (error) {
            console.info(error);
            return
        });
    },
    saveData: function () { //记单人\编辑单据
    var recordType=laowu_common.recordType;
    var loginType=laowu_common.loginType;

        if (!recordType) {
            alert("未找到记账类型recordType")
            return
        }

        if (!_self.form.userId) {
            alert('未获取到当前操作的人员信息');
            return;
        }
        if (!_self.form.projectId) {
            alert('项目不能为空');
            return;
        }
        if (!_self.form.createTimeStr) {
            alert('日期不能为空');
            return;
        }
        if (!_self.form.gongzhangName) {
            alert('工长不能为空');
            return;
        }
        if (recordType == 1) {

            if (!_self.form.workNormalHour) {
                alert('标准工资上班时长不能为空');
                return;
            }
            if (!_self.form.overNormalHour) {
                alert('标准工资加班时长不能为空');
                return;
            }
            if (!_self.form.datePrice) {
                alert('日工资不能为空');
                return;
            }
            if (!_self.form.gongzhongName) {
                alert('工种不能为空');
                return;
            }
            if (!_self.form.workHour) {
                alert('上班时长不能为空');
                return;
            }
            if ((!_self.form.score || _self.form.score == 0) && loginType == 1) {
                alert('请给工人评分');
                return;
            }
            //校验工资标准,只提示一次，用户操作之后不再提示
            laowu_main.checkNormal();

        } else if (recordType == 2) {
            if (!_self.form.fenxiangName) {
                alert('分项不能为空');
                return;
            }
            if (!_self.form.price) {
                alert('单价不能为空');
                return;
            }
            if (!_self.form.number) {
                alert('数量不能为空');
                return;
            }
            if (!_self.form.unit) {
                alert('单位不能为空');
                return;
            }
            if ((!_self.form.score || _self.form.score == 0) && loginType == 1) {
                alert('请给工人评分');
                return;
            }
            _self.form.numberName = _self.form.number + "  " + _self.form.unit + "";
            laowu_main.saveRecord();
        } else if (recordType == 3 || recordType == 4) {
            if (!_self.form.money) {
                alert('金额不能为空');
                return;
            }
            laowu_main.saveRecord();
        }

    },

    saveRecord: function (normalFlag) {//保存记录
        if (!normalFlag) {//注意，如果未传值过来，一定要设置为空，否则后台会判断错误
            normalFlag = "";
        }
        var saveType=laowu_common.saveType;
        var userId=laowu_common.userId;
        var userName=laowu_common.userName;
        var loginType=laowu_common.loginType;
        var recordType=laowu_common.recordType;
        console.log("正在保存,请稍后...");
        if (saveType == 'save' || saveType == 'update') {
            if (saveType == 'save') {
                _self.form.operateStatus = "0";//新增记录）——操作状态为0
            }
            userName = encodeURIComponent(userName);//编码
            var param = "&saveType=" + saveType + "&userId=" + userId + "&userName=" + userName + "&identityType=" + loginType + "&normalFlag=" + normalFlag;
            console.log("表单",_self.form)
            axios.post("/project_work_api/update_record?type=update" + param, _self.form).then(function (response) {
                if (response.data.code == 200) {
                    alert("保存成功!");
                    laowu_common.closeWindow();
                    appApi.broadcast("reloadData()");//返回上一页并设置标准工资页面
                } else {
                    alert("保存错误!")
                }
                laowu_common.closeLayer();
            }).catch(function (error) {
                console.info(error);
                closeLayer();
            });
        } else {
            _self.form.operateStatus = "0";//新增记录——操作状态为0
            console.log("表单",_self.form)
            axios.post("/project_work_api/save_record", _self.form).then(function (response) {
                if (response.data.code == 200) {
                    if (recordType == 1 || recordType == 2) {
                        alert("记工完成");
                    } else {
                        alert("记账完成");
                    }
                    laowu_common.closeWindow();
                } else if (response.data.code == 201) {
                    if (recordType == 1 || recordType == 2) {
                        alert("记工错误")
                    } else {
                        alert("记账错误")
                    }
                    //laowu_common.closeLayer();
                } else if (response.data.code == 202) {
                    alert("您在" + _self.form.createTimeStr + "已有一笔记工");
                    laowu_common.closeLayer();
                }
            }).catch(function (error) {
                console.info(error);
                closeLayer();
            });
        }
    },

    saveDataMutil: function (type) {//批量记工

        var _self = this;

        if (!_self.form.userId) {
            alert('未获取到当前操作的人员信息');
            return;
        }
        if (!_self.form.projectId) {
            alert('项目不能为空');
            return;
        }
        if (!_self.form.createTimeStr) {
            alert('日期不能为空');
            return;
        }
        if (!_self.form.gongzhangName) {
            alert('工长不能为空');
            return;
        }
        var ary = _self.data.selectUserList;
        if (ary.length <= 0) {
            alert('记工工人不能为空');
            return;
        }
        if (type == 1) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].datePrice == null || !ary[i].datePrice) {
                    alert('工人' + ary[i].userName + ',工资标准没有完善');
                    return;
                }
                if (ary[i].pingfen == null || !ary[i].pingfen) {
                    alert('工人' + ary[i].userName + ',还没有评分哦');
                    return;
                }
            }
            if (!_self.form.workHour) {
                alert('上班时长不能为空');
                return;
            }
        } else if (type == 2) {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].pingfen == null || !ary[i].pingfen) {
                    alert('工人' + ary[i].userName + ',还没有评分哦');
                    return;
                }
                ary[i].money = toDecimal2(_self.form.money);//计算每个工人的包工金额
            }
            if (!_self.form.fenxiangName) {
                alert('分项不能为空');
                return;
            }
            if (!_self.form.price) {
                alert('单价不能为空');
                return;
            }
            if (!_self.form.number) {
                alert('数量不能为空');
                return;
            }
            if (!_self.form.unit) {
                alert('单位不能为空');
                return;
            }
            this.form.numberName = this.form.number + "  " + this.form.unit + "";
        } else if (type == 3) {
            if (!_self.form.money) {
                alert('借支金额不能为空');
                return;
            }
            for (var i = 0; i < ary.length; i++) {
                ary[i].money = toDecimal2(_self.form.money);//计算每个工人的包工金额
            }
        } else if (type == 4) {
            if (!_self.form.money) {
                alert('结算金额不能为空');
                return;
            }
            for (var i = 0; i < ary.length; i++) {
                ary[i].money = toDecimal2(_self.form.money);//计算每个工人的包工金额
            }
        }
        var formdata = new FormData();
        //工人部分数据列表
        var jsonUser = JSON.stringify(ary);
        //工人公有数据
        var common = new Object();
        common.projectId = projectId;
        common.projectName = projectName;
        common.gongzhangId = gongzhangId;
        common.gongzhangName = gongzhangName;
        common.recordType = recordType;
        common.identityType = loginType;
        common.remark = _self.form.remark;
        common.workHour = _self.form.workHour;
        common.overHour = _self.form.overHour;
        common.workHourName = _self.form.workHourName;
        common.overHourName = _self.form.overHourName;
        common.createTimeStr = _self.form.createTimeStr;
        common.fenxiangName = _self.form.fenxiangName;
        common.price = _self.form.price;
        common.number = _self.form.number;
        common.numberName = _self.form.numberName;
        common.unit = _self.form.unit;

        var jsonCommon = JSON.stringify(common);
        formdata.append("jsonUser", jsonUser);
        formdata.append("jsonCommon", jsonCommon);
        // console.log(jsonUser)
        // return
        //保存记录
        loading("正在保存,请稍后...")
        setTimeout(function () {
            axios.post(getUrl() + "/project_work_api/save_record_mutil", formdata).then(function (response) {
                if (response.data.code == 200) {
                    if (type == 1 || type == 2) {
                        msg("记工完成!")
                    } else {
                        msg("记账完成!")
                    }
                    closeWindow();
                } else if (response.data.code == 202) {
                    msg(response.data.result + "在" + _self.form.createTimeStr + "已记工，不能重复记工");
                    closeLayer();
                    return;
                } else {
                    if (type == 1 || type == 2) {
                        msg("记工错误!")
                    } else {
                        msg("记账错误!")
                    }
                    closeLayer();
                }
            }).catch(function (error) {
                console.info(error);
                closeLayer();
            });
        }, 2000);

    },
    popup: function (content) {
        msg(content);
    },
    deleteAry: function (val) {//删除数组指定元素
        var _self = this;
        _self.data.selectUserList.removeUser(val)
    },
    selectStarMulti: function (val, userId) {//设置分数（多人）
        setPingfenMutil(val, userId);
        this.setWuXing(val, userId)
    },
    selectStar: function (val, divId) {//设置分数（单人）
        _self.form.score = val;
        laowu_main.setWuXing(val, divId)
    },
    setWuXing: function (val, divId) {//显示选择的分数
        var zrcimg = document.getElementById(divId);
        var cun = val
        for (var i = 0; i < cun; i++) {
            zrcimg.children[i].children[0].src = "../../../static/images/wuxing.png"
        }
        for (var i = cun; i < 5; i++) {
            zrcimg.children[i].children[0].src = "../../../static/images/wuxing1.png"
        }
    },
    stopEvt: function (obj) {
        stopEvt(obj);
    },
    formatDate: function (d) {
        return d == null ? "" : new Date(d).Format("hh:mm:ss");
    },

    openNormalHtml: function (user, type) {//设置标准工资

        var app=_self;
        var datePrice = "";
        var workNormalHour = "";
        var overNormalHour = "";
        var gongzhongId = "";
        var gongzhongName = "";
        var userId = "";
        var money=0;
        if (type == 1) {//工人设置单人工资标准
            datePrice = app.form.datePrice;//日工资
            workNormalHour = app.form.workNormalHour;//正常上班几个小时算一个工
            overNormalHour = app.form.overNormalHour;//加班几个小时算一个工
            gongzhongId = app.form.gongzhongId;//工种ID
            gongzhongName = app.form.gongzhongName;//工种名称
        } else {//工长设置多人工资标准
            if (user.datePrice != null) {
                datePrice = user.datePrice;//日工资
            }
            if (user.workNormalHour != null) {
                workNormalHour = user.workNormalHour;//正常上班几个小时算一个工
            }
            if (user.overNormalHour != null) {
                overNormalHour = user.overNormalHour;//加班几个小时算一个工
            }
            if (user.gongzhongId != null) {
                gongzhongId = user.gongzhongId;//工种ID
            }
            if (user.gongzhongName != null) {
                gongzhongName = user.gongzhongName;//工种名称
            }
            if (user.userId != null) {
                userId = user.userId;//工种名称
            }
            if (user.pingfen != null) {
                pingfen = user.pingfen;//工种名称
            }
            
        }
        
        //地址栏传递标准工资参数
        var param = "?datePrice=" + datePrice
            + "&workNormalHour=" + workNormalHour
            + "&overNormalHour=" + overNormalHour
            + "&gongzhongId=" + gongzhongId
            + "&gongzhongName=" + gongzhongName
            + "&userId=" + userId
            + "&type=" + type;
           var url='/static/webstatic/new_laowu/project_normal_config.html';
    
       appApi.openNewWindow(url+param);
    },
   
 
    setNumberData: function (obj) {
        if (obj.unit) {
            app.form.unit = obj.unit;
        }
        if (obj.number) {
            app.form.number = obj.number;
        }
        app.form.numberName = app.form.number + "  " + app.form.unit + "";
        //计算金额
        laowu_main.setBaoGongMoney();
    },
    setPingfenMutil: function (val, userId) {
        var ary = app.data.selectUserList;
        for (var i = 0; i < ary.length; i++) {
            if (app.data.selectUserList[i].userId == userId) {//根据用户ID设置对应的用户分数
                app.data.selectUserList[i].pingfen = val;
                break;
            }
        }
    },
    setMoney: function (type) {
       
        var app=_self;
        var saveType=laowu_common.saveType;
        setTimeout(function () {
            var workHour = app.form.workHour;
            var overHour = app.form.overHour;
            var totalMoney = 0.00;
            if (type == 1) {//工人计算(计算单人)
                var price = app.form.datePrice;
                var workNormalHour = app.form.workNormalHour;
                var overNormalHour = app.form.overNormalHour;
                var workCount = workHour / workNormalHour;//上班工数
                var overCount = overHour / overNormalHour;//加班工数
                var totalCount = workCount + overCount;//工数总数
                if (totalCount && price) {
                    totalMoney =laowu_common.toDecimal2(totalCount * price);
                    app.form.money = totalMoney;
                }
                if (saveType == 'save' || saveType == 'update') {
                    app.form.money = laowu_common.toDecimal2(totalMoney);
                } else {

                    document.getElementById("money").innerHTML = laowu_common.toDecimal2(totalMoney);
                }
            } else if (type == 2) {//工头计算（计算多人）
                var ary = app.data.selectUserList;
                if (ary.length > 0) {
                    for (var i = 0; i < ary.length; i++) {
                        var price = ary[i].datePrice;
                        var workNormalHour = ary[i].workNormalHour;
                        var overNormalHour = ary[i].overNormalHour;
                        var workCount = workHour / workNormalHour;//上班工数
                        var overCount = overHour / overNormalHour;//加班工数
                        var totalCount = workCount + overCount;//工数总数
                        var money = 0.00;
                        if (totalCount && price) {
                            money = laowu_common.toDecimal2(totalCount * price);
                            app.data.selectUserList[i].money = money;
                        }

                        totalMoney += money * 1;//总金额
                    }
                }
                if(document.getElementById("money")!=null){

                    document.getElementById("money").innerHTML = laowu_common.toDecimal2(totalMoney);
                }
            } else if (type == 3 || type == 4) {//计算借支或结算金额
                console.log(app.form.money)
                if(document.getElementById("money")!=null){
                    if (app.form.money) {
                        document.getElementById("money").innerHTML = laowu_common.toDecimal2(app.form.money);
                    } else {
                        document.getElementById("money").innerHTML = totalMoney;
    
                    }
                }
              
            }
            else {
                document.getElementById("money").innerHTML = '0.00';
                msg("金额计算出错，类型不匹配")
            }
        }, 100)

        

    },
    setJiZhangMoney: function () {
        var totalMoney = 0;
        setTimeout(function () {
            if (app.form.money) {
                totalMoney = toDecimal2(app.form.money);
            }
            if (saveType == 'save' || saveType == 'update') {
                // app.form.money=toDecimal2(totalMoney);
            } else {
                console.log(totalMoney)
                document.getElementById("money").innerHTML = toDecimal2(totalMoney);
            }
        }, 150)

    },
    viewPingfen: function (fenshu) {
        var zrimg = document.getElementById("pingfen");
        for (var i = 0; i < fenshu; i++) {
            zrimg.children[i].children[0].src = "../../images/wuxing.png"
        }
    },
    
        setBaoGongMoney:function () {
            var totalMoney=0;
            var saveType=laowu_common.saveType
            setTimeout(function () {
                var price=_self.form.price;
                var number=_self.form.number;
                if(price && number){
                    totalMoney=laowu_common.toDecimal2(number*price);
                }
                _self.form.money=totalMoney;
                if (saveType=='save'||saveType=='update'){
                    _self.form.money=laowu_common.toDecimal2(totalMoney);
                }else {
                    document.getElementById("money").innerHTML=laowu_common.toDecimal2(totalMoney);
                }
            },50)

        },

}


export default laowu_main




//*********移除数组元素******开始**********

Array.prototype.indexOfUser = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};


Array.prototype.removeUser = function (val) {
    var index = this.indexOfUser(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//*********移除数组元素******结束**********

function stopEvt(e) {
    e.stopPropagation();//阻止点击事件向上冒泡
}




window.setNormalDataFromGongrenList=function (objList) {
   
    var app=_self;
    var recordType=laowu_common.recordType;
    if (recordType != 1) {
        app.data.selectUserList = [];
    }
    setTimeout(function () {
       
        if (objList.length > 0) {
            for (var i = 0; i < objList.length; i++) {
                app.data.selectUserList.push(objList[i]);
            }
        }
        if (recordType == 1) {
            laowu_main.setMoney(2);//计算金额
        } else if (recordType == 2) {
            laowu_main.setBaoGongMoney();
        } else if (recordType == 3 || recordType == 4) {
            laowu_main.setJiZhangMoney();
        }
    }, 100)

}



window.setNormalmultiData=function (obj) {
    var app=_self
    var ary = app.data.selectUserList;
    for (var i = 0; i < ary.length; i++) {
        if (app.data.selectUserList[i].userId == obj.userId) {//根据用户ID设置对应的用户工资标准
            app.data.selectUserList[i].datePrice = obj.datePrice;
            app.data.selectUserList[i].datePriceName = obj.datePrice + "(元)";//日工资（名称）
            app.data.selectUserList[i].workNormalHour = obj.workNormalHour;//正常上班时长
            app.data.selectUserList[i].workNormalHourName = obj.workNormalHour + laowu_common.time_name;//上班时长（标准）名称
            app.data.selectUserList[i].overNormalHour = obj.overNormalHour;//加班时长
            app.data.selectUserList[i].overNormalHourName = obj.overNormalHour + laowu_common.time_name;//加班时长（标准）名称
            app.data.selectUserList[i].gongzhongId = obj.gongzhongId;
            app.data.selectUserList[i].gongzhongName = obj.gongzhongName;
            break;
        }
    }
   
    laowu_main.setMoney(2);//计算金额
},

 window.setNormalData=function (obj) {
     
    _self.form.datePrice = obj.datePrice;
    _self.form.datePriceName = obj.datePrice + "(元)";//日工资（名称）
    _self.form.workNormalHour = obj.workNormalHour;//正常上班时长（标准）
    _self.form.workNormalHourName = obj.workNormalHour + laowu_common.time_name;//上班时长（标准）名称
    _self.form.overNormalHour = obj.overNormalHour;//加班时长（标准）
    _self.form.overNormalHourName = obj.overNormalHour + laowu_common.time_name;//加班时长（标准）名称
    _self.form.gongzhongId = obj.gongzhongId;
    _self.form.gongzhongName = obj.gongzhongName;
    laowu_main.setMoney(1);//计算金额
}






