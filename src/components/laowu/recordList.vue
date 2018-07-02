<template>
  <div>
      <header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">上工日历</h1>
	</header>

   	<section class="mui-content">
    <div name="need_hide_div" id="app" >
    <div class="mui-table-view address-item">
        <div class="mui-content">
            <div id="Gallery" class="mui-sliders">
                <div class="datatop">
                    <span @click="lastMonth()" class="lastm mm-btn"></span>
                    <span class="data"></span>
                    <span @click="nextMonth()" class="nextm mm-btn"></span>
                </div>
                <ul class="mui-table ex-case">
                    <li class="mui-table-cell mui-text-center">日</li>
                    <li class="mui-table-cell mui-text-center">一</li>
                    <li class="mui-table-cell mui-text-center">二</li>
                    <li class="mui-table-cell mui-text-center">三</li>
                    <li class="mui-table-cell mui-text-center">四</li>
                    <li class="mui-table-cell mui-text-center">五</li>
                    <li class="mui-table-cell mui-text-center">六</li>
                </ul>
                <v-touch @swipeleft="prev" @swiperight="next">
                    <div class="mui-slider-group">
                    </div>
                </v-touch>
            </div>
        </div>
        <p class="cc" hidden="hidden"></p>
    </div>
    <div id="uldiv"  >

        <ul  class="mui-table-view mui-table-view-striped confirm-list sign-view">
            <li :id="item.id"  v-for="(item,index) in data.confirmList" :key="index"  class="mui-table-view-cell" @click="open_calendar_popver(item.recordType,item.createTimeStr,item)">

                <!--点工确认列表-->
                <div v-if="item.recordType==1" class="oa-contact-cell mui-table sign-body sign-header" >
                    <div>
                        <div class="prolist-line project-list">
                            <div class="list-item">
                                <div class="product-info-box">

                                    <div class="oa-contact-cell mui-table gray-pro-info namelist">
                                        <div class="oa-contact-avatar mui-table-cell square">
                                            <img v-if="item.imageUrl!=null" v-bind:src="item.imageUrl" alt="..." />
                                            <img v-else :src="imgbase" />
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name"><span v-text="item.gongrenName+'的点工'"></span></h4>
                                            <!--<p class="oa-contact-email">创建人<small v-text="item.userName"></small></p>-->
                                        </div>
                                    </div>
                                    <div class="zr-left">
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>上班时长</label><span v-text="item.workHourName" class="value"></span></div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>加班时长</label><span v-text="item.overHourName" class="value"></span></div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>日工资</label><span  v-text="item.datePrice" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>点工金额</label><span  v-text="item.money" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>工长</label><span v-text="item.gongzhangName" class="value"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="oa-contact-cell mui-table zr_wuxing">
                            <div class="oa-contact-avatar mui-table-cell square">
                                评分<!--点工评分-->
                            </div>
                            <!--工头看到评分（可修改）-->
                            <div v-if="loginType==1 && item.operateStatus==2" class="oa-contact-content mui-table-cell" :name="item.id" >
                                <span @click.stop="selectStarMulti(1,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(2,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(3,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(4,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(5,item.id)"><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <div v-if="loginType==1 && item.operateStatus!=2" class="oa-contact-content mui-table-cell" :name="item.id" >
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <!--工人看到评分或者是确认状态（不可修改）-->
                            <div v-if="loginType==0" class="oa-contact-content mui-table-cell" :name="item.id">
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <div class="oa-contact-content mui-table-cell  mui-table-view-cell">
                                <button v-if="item.operateStatus==2" @click.stop="agreeBtn_calendar(item,data.confirmList);" class="mui-btn zryes mui-btn-primary mui-btn-outlined">确认</button>
                                <button v-if="item.operateStatus!=2" @click.stop="open_calendar_popver(item.recordType,item.createTimeStr,item)" class="mui-btn zryes mui-btn-primary mui-btn-outlined">查看</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!--包工确认列表-->
                <div v-if="item.recordType==2" class="oa-contact-cell mui-table sign-body sign-header" >
                    <div>
                        <div class="prolist-line project-list">
                            <div class="list-item">
                                <div class="product-info-box">

                                    <div class="oa-contact-cell mui-table gray-pro-info namelist">
                                        <div class="oa-contact-avatar mui-table-cell square">
                                            <img v-if="item.imageUrl!=null" v-bind:src="item.imageUrl" alt="..." />
                                            <img v-else :src="imgbase" />
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name"><span v-text="item.gongrenName+'的包工'"></span></h4>
                                            <!--<p class="oa-contact-email">创建人<small v-text="item.userName"></small></p>-->
                                        </div>
                                    </div>
                                    <div class="zr-left">
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>分项</label><span v-text="item.fenxiangName" class="value"></span></div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>单价</label><span v-text="item.price" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>数量</label><span  v-text="item.numberName" class="value"></span></div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>包工金额</label><span v-text="item.money" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>工长</label><span v-text="item.gongzhangName" class="value"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="oa-contact-cell mui-table zr_wuxing">
                            <div class="oa-contact-avatar mui-table-cell square">
                                评分<!--包工评分-->
                            </div>
                            <!--工头看到评分（可修改）-->
                            <div v-if="loginType==1 && item.operateStatus==2 " class="oa-contact-content mui-table-cell" :name="item.id" >
                                <span @click.stop="selectStarMulti(1,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(2,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(3,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(4,item.id)"><img class="imgx" :src="wuxing1" /></span>
                                <span @click.stop="selectStarMulti(5,item.id)"><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <div v-if="loginType==1 && item.operateStatus!=2 " class="oa-contact-content mui-table-cell" :name="item.id" >
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <!--工人看到评分（不可修改）-->
                            <div v-if="loginType==0 " class="oa-contact-content mui-table-cell" :name="item.id">
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                                <span><img class="imgx" :src="wuxing1" /></span>
                            </div>
                            <div class="oa-contact-content mui-table-cell  mui-table-view-cell">
                                <button v-if="item.operateStatus==2" @click="agreeBtn_calendar(item,data.confirmList);" class="mui-btn zryes mui-btn-primary mui-btn-outlined">确认</button>
                                <button v-if="item.operateStatus!=2" @click="open_calendar_popver(item.recordType,item.createTimeStr,item)" class="mui-btn zryes mui-btn-primary mui-btn-outlined">查看</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!--借支窗口-->
                <div v-if="item.recordType==3" class="oa-contact-cell mui-table sign-body sign-header" >

                    <div>
                        <div class="prolist-line project-list">
                            <div class="list-item">
                                <div class="product-info-box">

                                    <div class="oa-contact-cell mui-table gray-pro-info namelist">
                                        <div class="oa-contact-avatar mui-table-cell square">
                                            <img v-if="item.imageUrl!=null" v-bind:src="item.imageUrl" alt="..." />
                                            <img v-else :src="imgbase" />
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name"><span v-text="item.gongrenName+'的借支'"></span></h4>
                                            <!--<p class="oa-contact-email">创建人<small v-text="item.userName"></small></p>-->
                                        </div>
                                    </div>
                                    <div class="zr-left">
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>借支金额</label><span v-text="item.money" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>工长</label><span v-text="item.gongzhangName" class="value"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="oa-contact-cell mui-table zr_wuxing">
                            <div class="oa-contact-avatar mui-table-cell square">

                            </div>

                            <div class="oa-contact-content mui-table-cell" :name="item.id" >
                            </div>

                            <div class="oa-contact-content mui-table-cell  mui-table-view-cell">
                                <button v-if="item.operateStatus==2||item.operateStatus==3" @click.stop="agreeBtn_calendar(item,data.confirmList);" class="mui-btn zryes mui-btn-primary mui-btn-outlined">确认</button>
                                <button v-if="item.operateStatus!=2 && item.operateStatus!=3" @click.stop="open_calendar_popver(item.recordType,item.createTimeStr,item)" class="mui-btn zryes mui-btn-primary mui-btn-outlined">查看</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="item.recordType==4" class="oa-contact-cell mui-table sign-body sign-header" >

                    <div>
                        <div class="prolist-line project-list">
                            <div class="list-item">
                                <div class="product-info-box">

                                    <div class="oa-contact-cell mui-table gray-pro-info namelist">
                                        <div class="oa-contact-avatar mui-table-cell square">
                                            <img v-if="item.imageUrl!=null" v-bind:src="item.imageUrl" alt="..." />
                                            <img v-else :src="imgbase" />
                                        </div>
                                        <div class="oa-contact-content mui-table-cell">
                                            <h4 class="oa-contact-name"><span v-text="item.gongrenName+'的结算'"></span></h4>
                                            <!--<p class="oa-contact-email">创建人<small v-text="item.userName"></small></p>-->
                                        </div>
                                    </div>
                                    <div class="zr-left">
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>结算金额</label><span v-text="item.money" class="value"></span>元</div>
                                        </div>
                                        <div class="gray-pro-info">
                                            <div class="rg-con"><label>工长</label><span v-text="item.gongzhangName" class="value"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  class="oa-contact-cell mui-table zr_wuxing">
                            <div class="oa-contact-avatar mui-table-cell square">

                            </div>

                            <div class="oa-contact-content mui-table-cell" :name="item.id" >
                            </div>

                            <div class="oa-contact-content mui-table-cell  mui-table-view-cell">
                                <button v-if="item.operateStatus==2||item.operateStatus==3" @click.stop="agreeBtn_calendar(item,data.confirmList);" class="mui-btn zryes mui-btn-primary mui-btn-outlined">确认</button>
                                <button v-if="item.operateStatus!=2 && item.operateStatus!=3" @click.stop="open_calendar_popver(item.recordType,item.createTimeStr,item)" class="mui-btn zryes mui-btn-primary mui-btn-outlined">查看</button>
                            </div>
                        </div>
                    </div>
                </div>

            </li>
        </ul>
            <h5 class="mui-content-padded">当天打卡记录</h5>

            <ul name="need_hide_div" class="mui-table-view mui-table-view-striped sign-view">
                <li  v-for="(item,index) in data.attrecordList" :key="index" class="mui-table-view-cell">
                    <div class="oa-contact-cell mui-table">
                        <div class="oa-contact-avatar mui-table-cell sign-img">
                            <img class="mui-action-preview" v-bind:src="item.photoAddress" />
                        </div>
                        <div class="oa-contact-content mui-table-cell">
                            <h4 class="oa-contact-name sign-time" v-text="item.userName"></h4>
                            <p class="oa-contact-email " v-text="item.title"></p>
                            <p class="oa-contact-email" v-text="item.gpsAddress"></p>
                        </div>
                    </div>
                </li>

            </ul>
    <!--</div>-->

    </div>

        <!--比较窗口----------开始-->

        <div id="cus_calendar_popver" v-show="select_flag" class="mui-popover mui-popover-action mui-popover-bottom">
            <div class="pop-up2">
                <div class="pop-title">

                    <div class="pop-title"><span class="title" v-text="select_name"></span>
                        <div v-text="createTimeStr"></div>
                        <span class="btn-title iconfont icon-close" @click="closePop('cus_calendar_popver')"></span>
                    </div>
                    <div v-if="select_user_type==1"><!--点工窗口-->
                        <div class="pop-content select-box col-xs-6 mui-clearfix" style="min-height: 340px;height:380px;">
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class=""></a></div>
                                <div class="mui-table-cell"><a class="" >我记录的</a></div>
                                <div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
                                <div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">上班时长</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null" >
                                    <span v-if="myobj.operateStatus!=3" class=""  v-text="myobj.workHourName"></span>
                                    <span v-if="myobj.operateStatus==3" class="" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null">
                                    <span class=""  >--</span>
                                </div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span v-if="selectobj.operateStatus!=3" class=""  v-text="selectobj.workHourName"></span>
                                    <span v-if="selectobj.operateStatus==3" class="" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null">
                                    <span class=""  >--</span>
                                </div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">加班时长</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <span class="" v-if="myobj.operateStatus!=3"  v-text="myobj.overHourName"></span>
                                    <span v-if="myobj.operateStatus==3" class="" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.overHourName"></span>
                                    <span v-if="selectobj.operateStatus==3" class="" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">工资标准</a></div>
                                <div class="mui-table-cell"><a class=""></a></div>
                                <div class="mui-table-cell"><a class=""></a></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><p class="">上班时长</p></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <span class=""  v-if="myobj.operateStatus!=3" v-text="myobj.workNormalHourName"></span>
                                    <span class=""  v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span class=""  v-if="selectobj.operateStatus!=3"  v-text="selectobj.workNormalHourName"></span>
                                    <span class=""  v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><p class="">加班时长</p></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <span class="" v-if="myobj.operateStatus!=3" v-text="myobj.overNormalHourName"></span>
                                    <span class=""  v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span class="" v-if="selectobj.operateStatus!=3"  v-text="selectobj.overNormalHourName"></span>
                                    <span class=""  v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <!--评分窗口-->
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell" style="width:30%;">
                                    <a class="">评分</a><!--点工评分-->
                                </div>
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <!--工头看到评分（可修改）-->
                                    <div style="display: block" v-if="myobj.operateStatus!=3 && loginType==1" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span @click.stop="selectStarMulti(1,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(2,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(3,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(4,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(5,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                    <!--工人看到评分（不可修改）-->
                                    <div style="display: block"  v-if="myobj.operateStatus!=3 && loginType==0" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                    <div style="display: block"  v-if="myobj.operateStatus==3" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="select_user_type==2"><!--包工窗口-->
                        <div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class=""></a></div>
                                <div class="mui-table-cell"><a class="" >我记录的</a></div>
                                <div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
                                <div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">分项名称</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <span class="" v-if="myobj.operateStatus!=3" v-text="myobj.fenxiangName"></span>
                                    <span class="" v-if="myobj.operateStatus==3">--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span class="" v-if="selectobj.operateStatus!=3" v-text="selectobj.fenxiangName"></span>
                                    <span class="" v-if="selectobj.operateStatus==3">--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">单价</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <div v-if="myobj.operateStatus!=3"><span class=""   v-text="myobj.price"></span><span>元</span></div>
                                    <span class="" v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <div v-if="selectobj.operateStatus!=3" ><span class="" v-text="selectobj.price"></span><span>元</span></div>
                                    <span class="" v-if="selectobj.operateStatus==3">--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">数量</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <span class="" v-if="myobj.operateStatus!=3"  v-text="myobj.numberName"></span>
                                    <span class="" v-if="myobj.operateStatus==3"  >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <span class=""  v-if="selectobj.operateStatus!=3"  v-text="selectobj.numberName"></span>
                                    <span class=""  v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">包工金额</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <div v-if="myobj.operateStatus!=3" ><span class=""  v-text="myobj.money"></span><span>元</span></div>
                                    <span class="" v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <div  v-if="selectobj.operateStatus!=3" ><span class=""  v-text="selectobj.money"></span><span>元</span></div>
                                    <span class="" v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>
                            <!--评分窗口-->
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell" style="width:30%;">
                                    <a class="">评分</a><!--包工评分-->
                                </div>
                                <div class="mui-table-cell" v-if="myobj!=null">
                                    <!--工头看到评分（可修改）-->
                                    <div style="display: block" v-if="myobj.operateStatus!=3 && loginType==1" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span @click.stop="selectStarMulti(1,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(2,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(3,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(4,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span @click.stop="selectStarMulti(5,myobj.id)" ><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                    <!--工人看到评分（不可修改）-->
                                    <div style="display: block"  v-if="myobj.operateStatus!=3 && loginType==0" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                    <div style="display: block"  v-if="myobj.operateStatus==3" class="oa-contact-content mui-table-cell pingfen" :name="myobj.id">
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                        <span><img class="imgx_agree" :src="wuxing1" /></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div v-if="select_user_type==3"><!--借支窗口-->
                        <div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class=""></a></div>
                                <div class="mui-table-cell"><a class="" >我记录的</a></div>
                                <div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
                                <div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">借支金额</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                   <div v-if="myobj.operateStatus!=3"><span class=""  v-text="myobj.money"> </span><span>元</span></div>
                                    <span class="" v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                 <div v-if="selectobj.operateStatus!=3"><span class=""  v-text="selectobj.money"></span><span>元</span></div>
                                    <span class="" v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>

                        </div>
                    </div>
                    <div v-if="select_user_type==4"><!--结算窗口-->
                        <div class="pop-content select-box col-xs-6 mui-clearfix" style="height:340px;">
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class=""></a></div>
                                <div class="mui-table-cell"><a class="" >我记录的</a></div>
                                <div v-if="selectobj!=null && selectobj.operateStatus==3" class="mui-table-cell"><a class="" v-text="select_user_name+'(已删除)'"></a></div>
                                <div v-else class="mui-table-cell"><a class="" v-text="select_user_name"></a></div>
                            </div>
                            <div class="mui-table mui-text-center">
                                <div class="mui-table-cell"><a class="">结算金额</a></div>
                                <!--我的记录-->
                                <div class="mui-table-cell" v-if="myobj!=null">
                                   <div v-if="myobj.operateStatus!=3"><span class=""  v-text="myobj.money"></span><span>元</span></div>
                                    <span class="" v-if="myobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="myobj==null"><span class=""  >--</span></div>
                                <!--别人的记录-->
                                <div class="mui-table-cell" v-if="selectobj!=null">
                                    <div v-if="selectobj.operateStatus!=3"><span class=""  v-text="selectobj.money"></span><span>元</span></div>
                                    <span class="" v-if="selectobj.operateStatus==3" >--</span>
                                </div>
                                <div class="mui-table-cell" v-if="selectobj==null"><span class=""  >--</span></div>
                            </div>

                        </div>
                    </div>

                    <div class=" fixed-bottom">
                        <div class="mui-table mui-text-center">
                            <div v-if="myobj!=null" class="mui-table-cell"><button @click="update(myobj.id,'update',select_user_type,'calendar')" class="mui-btn">修改</button></div>
                            <div v-if="myobj==null" class="mui-table-cell"><button @click="update(selectobj.id,'save',select_user_type,'calendar')" class="mui-btn">修改</button></div>
                            <div class="mui-table-cell"><button class="mui-btn mui-btn-primary" @click="agree_calendar(selectobj,myobj)">同意</button></div>
                        </div>
                    </div>

                </div>

            </div>

        </div>




    </div>

</section>
  </div>
</template>

 <script>

// var VueTouch = require('vue-touch')
// Vue.use(VueTouch, {name: 'v-touch'})

import ljian from '@/assets/images/ljian.png'
import rjian from '@/assets/images/rjian.png'
import laowu_confirm from "./js/laowu_confirm.js";
import calendar_short from "./js/calendar_short.js";
import mui from "../../playform/mui.js";
export default {
  data () {
    return {
		 form: {
        workHour: "", //正常上班几个时长算一个工(ID)
        workHourName: "", //正常上班几个时长算一个工(名称)
        overHour: "", //加班几个时长算一个工(ID)
        overHourName: "", //加班几个时长算一个工(名称)
        money: "", //每日工资(ID)
        moneyName: "", //每日工资(名称)
        gongzhongId: "",
        gongzhongName: ""
      },
      data: {
        confirmList: [],
        attrecordList: []
      },
      select_pingfen: "",
      select_name: "",
      select_user_name: "",
      select_user_type: "",
      select_flag: false,
      createTimeStr: "",
      selectobj: null,
      myobj: null,
      score: "",
      loginType: "",
      screenWidth:"",
      reqParams: {
        id: "",
        confirmId: "",
        userId: "",
        queryTime: "",
        queryType: "",
        queryStatus: ""
      },
      agreeParams: {
        id: "",
        confirmId: "",
        otherId: "",
        userId: "",
        name: "",
        data: "", //备用字段，不指定传的值，根据业务相应的传值
        queryStatus: "" //状态，包含多种状态值
	  },
	  wuxing1:"../../images/wuxing1.png",
      imgbase:"../../images/defualt.png",
      cunt:0,
      cunn:0,
      fordata:'',
      starcunt:''
    }
  },created:function(){
      laowu_confirm._self=this;
      this.screenWidth=document.body.clientWidth
	  laowu_confirm.initVue();
      laowu_confirm.initData();

    //   alert(this.$route.query.queryTime.split("-")[2])
  },
  mounted:function(){
      calendar_short.initVue(this)
      calendar_short.initData();
      this.starcunt=parseInt((parseInt(this.$route.query.queryTime.split("-")[2])+this.fordata)/7)
      $(".mui-slider-group").css("transform","translate3d(-"+20*this.starcunt+"%, 0px, 0px)")
  },
  methods:{
	 nextMonth:function(){
		 calendar_short.nextMonth()
	 },
	 lastMonth:function(){
		 calendar_short.lastMonth()
     },
     open_calendar_popver:function(v1,v2,v3){
         laowu_confirm.open_calendar_popver(v1,v2,v3)
     },
      prev:function(){ //右滑
          var _self=this
        //   alert($(".mui-slider-group .mui-slider-item").length)
        if((_self.cunt+_self.cunn)>(this.starcunt-$(".mui-slider-group .mui-slider-item").length+1)){
          _self.cunt--
           var cc= parseInt(_self.cunn)+parseInt(_self.cunt)-parseInt(this.starcunt)
            var dd=parseInt(_self.cunn)+parseInt(_self.cunt)
        // $(".mui-slider-group").css("transform","translate3d("+20*cc+"%, 0px, 0px)")

        var dd=dd*100

        var le=parseInt($(".mui-slider-group").css("left").split("px"))
        $(".mui-slider-group").animate({
            "left":le-_self.screenWidth+"px"
        });
        }

    },
    next:function(){ //左滑
        var _self=this
        // alert(_self.cunn+"///"+this.starcunt)
        if((_self.cunt+_self.cunn)<this.starcunt){
        _self.cunn++
         var cc= parseInt(_self.cunn)+parseInt(_self.cunt)-parseInt(this.starcunt)
        //  $(".mui-slider-group").css("transform","translate3d("+20*cc+"%, 0px, 0px)")
         var dd=parseInt(_self.cunn)+parseInt(_self.cunt)
         var dd=dd*100
         var le=parseInt($(".mui-slider-group").css("left").split("px"))
        $(".mui-slider-group").animate({
            "left":le+_self.screenWidth+"px"
        });
        }
    }
  },
}
</script>
<style type="text/css" scoped>
        .trend-list:before {
            top: 15px;
            height: calc(100% - 15px);
        }

        .quezr {
            color: #FF9900;
        }

        .trend-contain {
            background: #fff;
        }

        .prolist-line .list-item {
            border-bottom: 0;
        }

        .address-item {
            text-align: center;
            position: fixed;
            top: 44px;
            z-index: 101;
            background: #fff;
        }
        .confirm-list{
            padding-top: 113px;
        }

        .product-info-box .namelist {
            margin-bottom: 15px
        }

        .namelist .mui-pull-left {
            height: 33px;
            line-height: 33px;
            font-size: 18px;
            color: #000;
        }

        .namelist .mui-btn {
            float: right;
        }

        .pop-up {
            display: none;
        }

        .fixed-bottom {
            position: absolute;
            margin-bottom: 0;
        }

        .mui-clearfix .mui-table-cell {
            padding: 8px 0;
        }

        .zr-left {
            padding-left: 55px;
        }

        .imgx {
            width: 20px;
            height: 20px;
        }
        .imgx_agree {
            width: 25px;
            height: 25px;
        }

        .zr_wuxing {
            background: #fff;
            padding: 0 15px;
            border-top: 1px dashed #ccc;
        }
        .sign-view .mui-table-view-cell label{
            width: 30%;
        }
        .mui-slider-indicator {
            bottom: 0;
        }
        .mui-slider {
            background-color: #fff;
        }
        .mui-grid-view.mui-grid-9 .mui-table-view-cell {
            width: calc(100% / 7);
            background: #fff;
            height: 45px
        }
        .ex-case {
            padding: 0;
        }
        .mui-slider-group .mui-grid-view .mui-media {
            color: #000;
        }
        .datatop {
            height: 26px;
            line-height: 26px;
            width: 60%;
            margin: 5px auto;
            text-align: center;
        }
        .datatop .mm-btn {
            display: block;
            width: 26px;
            height: 26px;
        }
        .datatop .mm-btn.lastm {
            float: left;
            /*background: #f00;*/
            background: url("../../assets/images/ljian.png");
        }
        .datatop .mm-btn.nextm {
            float: right;
            /*background: #ff0;*/
            background: url("../../assets/images/rjian.png");
        }
        .data {
            padding: 0 20%;
        }
        /* .mm-btn {} */
        .ex-case .mui-table-cell{
            padding: 0;
        }
        .mui-slider {
            background-color: #fff;
            /* border-bottom: 1px solid #fafafa; */
            box-shadow: 2px 2px 10px #888;
        }
        .selectday{
            background:#4ba9e9
        }
        .mui-fullscreen {/*大图遮罩*/
            position: fixed;
            z-index: 20;
            background-color: #000;
		}
		.mui-table-view-cell{
			text-align: left
		}
        .mui-slider-group{
            width: 500%;
            height: 46px;
            overflow: hidden;
            position: absolute;
        }
        .mui-slider-group>div{
            width: 20%;
            float: left;
        }
    </style>
