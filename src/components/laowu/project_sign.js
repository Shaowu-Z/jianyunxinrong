/**
 * 拍照打卡
 * auth panzhenfei 
 * 2018.6.7
 */
import laowu_common from "./laowu_common.js"
var project_sign={
    
        initData: function () {

            var _self=this._self;
            var axios=this.axios;
            laowu_common._self=project_sign._self;
            laowu_common.axios=project_sign.axios;
            var userId=laowu_common.userId;
            var userName=laowu_common.userName;
            var dataType=laowu_common.dataType;
            appApi.imgPreview.init();
            _self.form.userId = userId;
            _self.form.userName = userName;
            if (dataType == 'sign') {
                laowu_common.findRoomData();
                project_sign.loadCation();
                project_sign.loadlocalProjectInfo();
                this.loadAttRecords();//查询最近两天打卡记录
                project_sign.loadNearRecord();//查询最近一次打卡记录
                project_sign.showAppDiv();

            } else if (dataType == 'todosign') {
                _self.loadCation();
                findRoomData();
                setTimeout(function () {
                    setTimeout(function () {
                        _self.loadlocalProjectInfo();
                        _self.loadAttRecords();//查询最近两天打卡记录
                        setTimeout(function () {
                            _self.loadNearRecord();//查询最近一次打卡记录
                        }, 50)

                    }, 50)
                    setTimeout(function () {
                        _self.updateReadStaus();//更新查看状态
                        showAppDiv();
                    }, 800)
                }, 500)

            } else if (dataType == 'projectlist') {
                _self.findProjectList();

            } else if (dataType == 'chart') {//组合查询根据记录docid查询打卡记录
                _self.loadAttRecordById();
            } else if (dataType == 'remind') {
                _self.showTimeLists();//提醒时间
                findRoomData();
                setTimeout(function () {
                    _self.loadRemind();
                }, 500)
                setTimeout(function () {
                    showAppDiv();
                }, 350)

            } else if (dataType == 'outroom') {//房间外面

            }

        },
    
            loadCation: function () {//加载定位信息
                var _self=project_sign._self
                window.appApi.getLocation();
                window.appApi.callBackFun = function (callFlag, CONTENT) {
                    if (callFlag == appApi.callBackFlag.LOCATION) {
                        setTimeout(function () {
                            _self.longaddress = CONTENT.longaddress;
                            _self.latitudeAndLongitude = CONTENT.latitudeAndLongitude;
                            _self.shortAddress = CONTENT.shortAddress;
                            _self.form.gpsAddress = CONTENT.longaddress + " " + CONTENT.shortAddress;//GPS地址
                            _self.form.gpsLl = CONTENT.latitudeAndLongitude;
                        }, 50)
                    }
                }
            },
            loadlocalProjectInfo: function () {//默认显示当前房间的项目信息
                var project = laowu_common.findProjectData();//加载项目
                var projectImg = laowu_common.findProjectImg();//加载项目图片
                console.log("项目图片", projectImg)
                setTimeout(function () {
                    var item = {};
                    item.serialNum = projectId;
                    if (projectImg) {
                        item.img_url = projectImg.img_url;
                    }
                    item.projectName = projectName;
                    item.cellphone = gongzhangPhone;
                    item.nickName = gongzhangName;
                    item.owerId = gongzhangId;
                    item.place = project.place;//项目地址
                    item.placeZuobiao = project.placeZuobiao;//项目坐标
                    setProject(item, 0);
                }, 50)

            },
            selectProject: function (project) {//选择项目
                appApi.closeNewWindow();
                appApi.broadcast("setProject(" + JSON.stringify(project) + ",1)");
            },
            sign: function () {//打卡拍照前进行校验
                var _self = this;
                if (!_self.form.projectSN) {
                    msg("项目ID不能为空")
                    return
                }
                if (dataType == 'todosign' || dataType == 'sign') {//从房间进来
                    _self.loadNearRecord();//查询打卡记录
                    setTimeout(function () {
                        //  console.log("最近坐标",_self.nearZuobiao)
                        var localZuobiao = _self.form.gpsLl;
                        //alert(localZuobiao)
                        if (!localZuobiao) {//默认坐标
                            msg("当前没有坐标，无法计算距离位置")
                            //localZuobiao = "113.9488800000,22.5550400000";
                            // localZuobiao = "113.954971,22.560108";
                            //113.95518,22.560106

                        }
                        if (localZuobiao) {
                            if (_self.nearRecord) {//有打卡记录的则校验坐标
                                //校验打卡坐标
                                var count = getGreatCircleDistance(localZuobiao, _self.nearZuobiao);
                                if (count > 500) {//距离大于500则提示
                                    showWarning();
                                    //_self.nearclockDate
                                    confirmLayer("您的位置与离上次打卡的位置较远，请确认在该工地上工吗？", function () {//确定
                                        layer.closeAll();
                                        setTimeout(function () {
                                            _self.openSign();//打卡
                                        }, 10)
                                    }, function () {
                                        _self.openProjectList();
                                    }, "切换项目", "继续打卡");
                                } else {
                                    _self.openSign();//打卡
                                }
                            } else {
                                _self.openSign();//打卡
                            }

                        } else {
                            msg("gps定位异常！")
                            _self.openSign();//打卡
                        }
                    }, 600);

                } else {//房间外面

                }
            },
            openSign: function () {
                //设置参数切换前置摄像头
                if (isApp && isAndroid) {
                    window.webactivity.setInputType(3, 0, true, 0);
                }
                document.getElementById("imgFile").click();
            },
            findProjectList: function () {//查询所有参与过的项目
                if (!localgps) {//默认坐标
                    msg("当前没有坐标，无法计算距离位置")
                    //  localgps = "113.9488800000,22.5550400000";
                }
                this.projectList = findWithMeList();
                var list = this.projectList;
                if (localgps && list.length > 0) {
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].gps) {
                            var count = getGreatCircleDistance(localgps, list[i].gps);
                            console.log("距离", count)
                            if (count > 0) {
                                var juli = count.toFixed(2);
                                if (juli >= 1000) {
                                    list[i].gps = (juli / 1000).toFixed(2) + "公里";
                                } else {
                                    list[i].gps = juli + "米";
                                }
                            }
                        }
                    }
                }
            },
            existProject: function (project) {//离开项目或回到项目
                var self = this;
                var formData = new FormData();
                formData.append("userId", userId);
                formData.append("confirmId", project.owerId);
                formData.append("projectId", project.serialNum);
                formData.append("saveType", project.type);
                axios.post(getUrl() + "/project_work_api/update_project_exist", formData).then(function (response) {
                    if (response.data.code == 200) {
                        //重新获取数据刷新页面
                        self.projectList = findWithMeList();
                        if (project.type == 1) {
                            msg("项目已关闭上工提醒")
                        } else {
                            msg("项目已启动上工提醒")
                        }


                    } else {
                        msg("设置错误!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            loadAttRecords: function () {//查询打卡记录
                alert(1)
                var _self = this;
                var loginType=laowu_common.loginType
                console.log(this)
                if (!loginType) {
                    loginType = "0";
                }
                _self.reqWorkParamsVO.confirmId = gongzhangId;//工长ID
                _self.reqWorkParamsVO.userId = userId;//当前登陆ID
                _self.reqWorkParamsVO.projectId = projectId;//当前登陆ID
                _self.reqWorkParamsVO.queryTime = date;//当前登陆ID
                _self.reqWorkParamsVO.loginType = loginType;//当前登陆ID
                _self.reqWorkParamsVO.queryType = 'sign';//当前登陆ID
                axios.post(getUrl() + "/project_work_api/find_att_record_mutil_day", this.reqWorkParamsVO).then(function (response) {
                    if (response.data.code == 200) {

                        var result = response.data.result;
                        console.log("打卡记录", result.todayList.length);
                        console.log("打卡记录", result.lastDayList.length);
                        if (result != null) {
                            _self.data.todayList = result.todayList;
                            _self.data.lastDayList = result.lastDayList;

                            //===============今日==============
                            if (!result.todayList || result.todayList.length < 1) {
                                showtodayWarning();
                            }
                            if (result.todayList && result.todayList.length > 0) {
                                for (var i = 0; i < result.todayList.length; i++) {
                                    _self.data.photoList.push(result.todayList[i].smallImgUrl);
                                }
                            }
                            //===============昨日==============
                            if (!result.lastDayList || result.lastDayList.length < 1) {
                                showlastdayWarning();
                            }
                            if (result.lastDayList && result.lastDayList.length > 0) {
                                for (var i = 0; i < result.lastDayList.length; i++) {
                                    _self.data.photoList.push(result.lastDayList[i].smallImgUrl);
                                }
                            }

                            // setTimeout(function () {
                            //     initImgPreview();
                            // },10)
                        } else {
                            console.log("未查询到打卡记录!")
                        }
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            loadNearRecord: function () {//查询最近一次打卡记录

                var _self = this;
                if (!loginType) {
                    loginType = "0";
                }
                if (!_self.form.projectSN) {
                    msg("获取最近一次打开记录时出差，项目ID不能为空")
                    return
                }
                _self.reqWorkParamsVO.loginType = loginType;
                _self.reqWorkParamsVO.userId = userId;//当前登陆ID
                _self.reqWorkParamsVO.confirmId = _self.form.confirmId;
                _self.reqWorkParamsVO.projectId = _self.form.projectSN;
                _self.reqWorkParamsVO.queryType = 'near';//当前登陆ID
                axios.post(getUrl() + "/project_work_api/find_att_record_mutil_day", this.reqWorkParamsVO).then(function (response) {
                    if (response.data.code == 200) {
                        localgps = _self.form.gpsLl;
                        if (!localgps) {//默认坐标
                            msg("当前没有坐标，无法计算距离位置")
                            return
                        }
                        var result = response.data.result;
                        if (result.length > 0) {
                            _self.nearRecord = true;
                            _self.nearAddress = result[0].gpsAddress;
                            _self.nearZuobiao = result[0].gpsLl;
                            if (result[0].gpsLl) {
                                var count = getGreatCircleDistance(localgps, result[0].gpsLl);
                                count = count.toFixed(2);
                                if (count > 500) {
                                    _self.rangegpsStatus = 1;
                                } else {
                                    _self.rangegpsStatus = 0;
                                }
                                // console.log("距离",count)
                                if (count >= 1000) {
                                    _self.rangegps = (count / 1000).toFixed(2) + "公里";
                                } else {
                                    _self.rangegps = count + "米";
                                }
                            }
                            var clock = new Date(result[0].clockDate).Format("yyyy-MM-dd");
                            _self.nearclockDate = clock;
                        } else {//没有查询到最近的打卡记录
                            hideWarning();
                            _self.nearRecord = false;
                            _self.nearAddress = "";//最近打卡记录的地址
                            _self.nearZuobiao = "";//最近打卡记录的坐标
                            _self.nearclockDate = "";//最近打卡记录的日期
                            _self.rangegps = "";
                            _self.rangegpsStatus = "";
                        }
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            loadAttRecordById: function () {//根据ID查询打卡记录
                var _self = this;
                var docId = paramMap.docid;
                var formData = new FormData();
                formData.append("queryType", "new_chart");
                formData.append("docId", docId);
                formData.append("type", "gongren");
                axios.post(getUrl() + "/attendance_api/findRecordList_by_userId", formData).then(function (response) {
                    if (response.data.code == 0) {
                        var result = response.data.result;
                        //new Date(result.dateConfirm).Format("yyyy-MM-dd");
                        // console.log("结果",result)
                        if (result) {
                            var day = result.day;
                            var dayList = result.dayList;
                            for (var i = 0; i < dayList.length; i++) {
                                dayList[i].clockTime = formDate(dayList[i].clockTime);
                                // if(dayList[i].gpsAddress){
                                //     dayList[i].gpsAddress=dayList[i].gpsAddress.split(" ")[1];
                                // }
                            }
                            _self.data.dayList = dayList;
                            _self.form.userName = day.userName;
                            _self.form.confirmName = day.confirmName;
                            _self.form.dateStr = day.dateStr;
                            _self.form.projectName = day.projectName;
                            setTimeout(function () {
                                initImgPreview();
                            }, 10)
                        }
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            showTimeLists: function () {//加载时间列表
                var _self = this;
                var obj = new Object();
                obj.type = 3;
                axios.post(getUrl() + "/project_work_api/find_base_cfg", obj).then(function (response) {
                    if (response.data.code == 200) {
                        var result = response.data.result;
                        if (result.length > 0) {
                            _self.$data.data.timeList = result;
                        } else {
                            msg("未查询到时间列表!")
                        }
                    } else {
                        msg("查询时间列表出错!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            openProjectList: function () {//打开项目列表
                var url = "/static/webstatic/new_laowu/project_list.html?dataType=projectlist&localgps=" + this.form.gpsLl;
                appApi.openNewWindow(url);
            },
            openRemind: function () {//打卡提醒设置
                var url = "/static/webstatic/new_laowu/project_set_remind.html?dataType=remind&isRoomId=" + roomId;
                appApi.openNewWindow(url);
            },
            open_time_popver: function () {
                mui('#cus_time_popver').popover('toggle');
                appApi.setPullRefresh(false);
                jQuery(".mui-backdrop").click(function () {
                    appApi.setPullRefresh(true);
                })
            },
            timeClick: function (time) { //确定提醒日期
                this.form.remindName = time.baseName;
                this.form.remindTime = time.baseId;
                setTimeout(function () {
                    mui('#cus_time_popver').popover('toggle');
                }, 100)
            },
            setRemind: function () { //确定提醒日期

                if (!this.form.remindTime) {
                    msg("请选择提醒时间")
                    return;
                }
                setTimeout(function () {
                    mui('#cus_time_popver').popover('toggle');
                }, 150)

            },
            updateReadStaus: function () {//更新待办查看状态
                var _self = this;
                var form = new FormData();
                form.append("userId", userId)
                form.append("queryType", "readStatus")
                form.append("name", userName)
                axios.post(getUrl() + "/project_work_api/update_quertz", form).then(function (response) {
                    if (response.data.code == 200) {
                        // msg("状态更新完成")
                    } else {
                        msg("待办阅读状态更新出错!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            delayRemind: function (queryTime) {//更新提醒期限，如果还没有记录则自动创建。
                var _self = this;
                var form = new FormData();
                form.append("userId", userId);
                form.append("queryType", "remindTime");
                form.append("name", userName)
                form.append("queryTime", queryTime);//提醒时间类型，按天提醒或按时分秒提醒  day表示按天提醒；hour表示按时分秒提醒
                axios.post(getUrl() + "/project_work_api/update_quertz", form).then(function (response) {
                    if (response.data.code == 200) {
                        if (queryTime == 'day') {
                            msg("今日不再提醒上工")
                        } else if (queryTime == 'hour') {
                            msg("推迟一个小时提醒上工")
                        }
                        setTimeout(function () {
                            appApi.closeNewWindow();
                        }, 2500)

                    } else if (response.data.code == 202) {
                        msg("设置失败，请先启动项目提醒!")
                    } else {
                        msg("保存出错!")
                    }
                }).catch(function (error) {
                    console.info(error);
                    msg("保存出错!")
                });
            },
            loadRemind: function () {//加载提醒日期
                var _self = this;
                var form = new FormData();
                form.append("userId", userId)
                form.append("queryTime", _self.form.remindTime)
                form.append("projectId", projectId)
                form.append("confirmId", gongzhangId)
                form.append("queryType", "remindTime")
                axios.post(getUrl() + "/project_work_api/find_quertz", form).then(function (response) {
                    if (response.data.code == 200) {
                        var result = response.data.result;
                        _self.form.remindTime = result.todoDays;
                        _self.form.remindName = result.todoDaysName;
                        if (!_self.form.remindTime) {
                            _self.form.remindTime = 1;
                            _self.form.remindName = "每天";
                        }
                    } else {
                        msg("查询出错!")
                    }
                }).catch(function (error) {
                    console.info(error);
                });
            },
            goShare: function () {
                var url = getUrl() + "/static/webstatic/mycenter/ext/share_detail.html?type=" + 3;
                var logo = getUrl() + "/static/images/app-logo.jpg";
                appApi.share(8, userName + "邀请您创建新项目", "工程人员都在用蜘筑侠，项目沟通找人都非常方便，赶紧用起来", url, logo, null);
            },

            /*拍照确认后执行*/
            confirmFile:function() {

                alert(1)
                var imgFile = document.getElementById("imgFile").value;
                if (imgFile == null || imgFile == "") {
                warm("照片不能为空");
                return;
                }

                loading("请稍后...")
                var imgFile = document.getElementById("imgFile");
                //拍照角度矫正
                var file = selectFileImage(imgFile);
                setTimeout(function () {
                var recordJson = JSON.stringify(app.form);
                var formData = new FormData();
                // var file = imgFile.files['0'];
                formData.append("recordJson", recordJson);
                if (!file) {
                    fileBase64 = "";
                }
                formData.append("fileName", fileBase64)
                formData.append("file", file);
                axios.post(getUrl() + "/project_work_api/sign_add", formData).then(function (response) {
                    if (response.data.code == 200) {
                        msg("打卡成功");
                        setTimeout(function () {
                            app.data.todayList = [];
                            app.data.lastDayList = [];
                            app.loadAttRecords();//查询最近两天打卡记录
                        }, 50)
                        closeLayer();
                    } else {
                        msg("打卡错误！")
                        closeLayer();
                    }
                })

                }, 800);


            },

            /**
             * 设置项目
             * @param item
             */
            setProject:function(item, type) {

                hideWarning();
                app.form.projectSN = item.serialNum;
                app.form.projectSNDetail = item.serialNum;
                app.form.projectName = item.projectName;
                app.form.projectNameDetail = item.projectName;
                app.form.confirmId = item.owerId;
                app.form.confirmUserId = item.owerId;
                app.form.confirmName = item.nickName;
                app.form.confirmPhone = item.cellphone;
                app.form.img_url = item.img_url;
                if (!item.gps) {
                    app.rangegps = "";
                } else {
                    app.rangegps = item.gps;
                }

                //重新设置项目ID和工长ID
                projectId = item.serialNum;
                gongzhangId = item.owerId;
                if (item.place) {
                    app.form.clockAddress = item.place;
                }
                if (item.placeZuobiao) {
                    app.form.clockLl = item.placeZuobiao;
                }
                if (type == 1) {
                    setTimeout(function () {
                        app.loadAttRecords();//查询最近两天打卡记录
                    }, 50)
                }

            }
 
         }

export default project_sign