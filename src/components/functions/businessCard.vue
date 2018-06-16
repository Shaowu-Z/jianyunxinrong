<template>
    <div id="app">
        <div class="mui-views">
            <div class="mui-view">
                <div class="mui-navbar">
                </div>
                <div class="mui-pages">
                </div>
            </div>
        </div>
        <div id="select_member" class="mui-page">
            <div id="head_2" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: none;">
                <button id="btn-referrer" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
                    <span class="mui-icon mui-icon-back"></span>取消
                </button>
                <h1 class="mui-center mui-title">群组创建</h1>
            </div>

            <div id="head_1" class="mui-navbar-inner mui-bar mui-bar-nav" style="display: block;">
                <button id="btn-referrer2" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left" @click="controlUpdate(2);" style="display: none;">
                    <span class="mui-icon"></span>取消
                </button>
                <!-- 第一次进入此页面显示-->
                <button id="btn-referrer3" class="mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left" style="display: none;">
                    <span class="mui-icon mui-icon-back"></span>取消
                </button>
                <h1 class="mui-center mui-title">选择联系人</h1>
                <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser">完成</button>
            </div>
            <div id="member_div1" class="mui-page-content" style="display: block;">
                <div id="listScroll" class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <section class="mui-content" id="">
                            <div id="tabbar-with-contact" class="mui-control-content address-list mui-active">
                                <a href="javascript:if(isHideProjectList=='y'){isHideProjectList = 'n';$('#project_list_id').show();}else{isHideProjectList = 'y';$('#project_list_id').hide();}">
                                    <h5 class="mui-content-padded">项目列表(点击收缩或展开)</h5>
                                </a>
                                <div id="project_list_id" style="display:block;">
                                    <div v-for="(item,index) in projects" :key="index">
                                        <ul class="mui-table-view">
                                            <li class="mui-table-view-cell mui-collapse fold-title">
                                                <a @click ="clickshow">
                                                    <div class="mui-slider-cell">
                                                        <div class="oa-contact-cell mui-table">
                                                            <div class="oa-contact-avatar mui-table-cell">
                                                                <img src="../../assets/images/ico_connect_project.jpg" />
                                                            </div>
                                                            <div class="oa-contact-content mui-table-cell">
                                                                <h4 class="oa-contact-name" v-text="item.ProjectName"></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <ul class="mui-table-view" v-show="true">
                                                    <li class="mui-table-view-cell">
                                                        <div class="mui-slider-cell">
                                                            <div class="oa-contact-cell mui-table">
                                                                <div class="oa-contact-avatar mui-table-cell">
                                                                    <img src="../../assets/images/ico_second.gif" />
                                                                </div>
                                                                <div class="oa-contact-content mui-table-cell">
                                                                    <a href="#select_project"  :data-project-id="item.serialNum"  :data-project-name="item.ProjectName" class="oa-contact-name"><span class="oa-contact-content mui-table-cell">所有参与人员</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                
                                <a href="javascript:if(isHideTeamList=='y'){isHideTeamList = 'n';$('#team_list_id').show();}else{isHideTeamList = 'y';$('#team_list_id').hide();}">
                                    <h5 class="mui-content-padded">团队列表(点击收缩或展开)</h5>
                                </a>
                                <div id="team_list_id" style="display:block;">
                                    <div v-for="(item,index) in items" :key="index">
                                        <ul class="mui-table-view">
                                            <li class="mui-table-view-cell mui-collapse fold-title">
                                                <a @click ="clickshow">
                                                    <div class="mui-slider-cell">
                                                        <div class="oa-contact-cell mui-table">
                                                            <div class="oa-contact-avatar mui-table-cell">
                                                                <img src="../../assets/images/ico_org.gif" />
                                                            </div>
                                                            <div class="oa-contact-content mui-table-cell">
                                                                <h4 class="oa-contact-name" v-text="item.teamName"></h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                <ul class="mui-table-view" v-show="true">
                                                    <li class="mui-table-view-cell">
                                                        <div class="mui-slider-cell">
                                                            <div class="oa-contact-cell mui-table">
                                                                <div class="oa-contact-avatar mui-table-cell">
                                                                    <img src="../../assets/images/ico_second.gif" />
                                                                </div>
                                                                <div class="oa-contact-content mui-table-cell">
                                                                    <a href="#select_children"  :data-team-id="item.teamId" :data-team-name="item.teamName"  class="oa-contact-name"><span class="oa-contact-content mui-table-cell">组织架构</span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <h5 class="mui-content-padded">好友列表</h5>
                                <div id='list' class="address-list">
                                    <!--<div class="mui-indexed-list-search mui-input-row mui-search hide">
                                        <input type="search" v-model="key" class="" placeholder="搜索">
                                    </div>
                                    <div class="mui-indexed-list-bar">
                                        <div class="align-middle">
                                            <template v-for="items in friendsList">
                                                <template v-for="item in items">
                                                    <template v-if="item.name && item.isp == 1">
                                                        <a v-text="item.first"></a>
                                                    </template>
                                                </template>
                                            </template>
                                        </div>
                                    </div>-->
                                    <div class="mui-indexed-list-alert"></div>
                                    <div class="mui-indexed-list-inner">
                                        <ul class="mui-table-view">
                                            <div v-for="(items,index) in friendsList" :key="index">
                                                <div v-for="(item,index) in items" :key="index">
                                                    <div v-if="item.name">
                                                        <!--<template v-if="item.isp == 1">
                                                            <li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group" v-text="item.first"></li>
                                                        </template>-->
                                                        <li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                                            <div class="mui-slider-cell">
                                                                <div class="oa-contact-cell mui-table">
                                                                    <div class="oa-contact-input mui-table-cell">
                                                                        <div v-if="selectArr.contains(item.userId +'')">
                                                                            <div v-if="myId == item.friendsUserId || thirdUserId == item.friendsUserId">
                                                                                <input type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
                                                                            </div>
                                                                            <div v-else>
                                                                                <input type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
                                                                            </div>
                                                                        </div>
                                                                        <div v-else>
                                                                            <input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.friendsUserId"/>
                                                                        </div>
                                                                    </div>
                                                                    <div class="oa-contact-avatar mui-table-cell">
                                                                        <img :src="item.headerImage">
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
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div id="member_div2" style="display: none;">
                <ul class="mui-table-view eg-table-view eg-detail-list">
                    <li class="mui-table-view-cell mui-input-row">
                        <label>群名称</label>
                        <input id="group_name_id" type="text" v-model="groupName" />
                    </li>
                    <li class="member-box box-border">
                        <div class="member-header mui-table-view-cell">
                            <div class="mui-navigate-right">群成员<span class="mui-badge mui-badge-inverted" v-text="selectNumStr"></span></div>
                        </div>
                        <div id="member_image_id" class="member-list">
                            <div class="mui-table-cell"><div @click="controlUpdate(1)"><img src="../../assets/images/ico_add.png"></div></div>
                            <!--<div class="mui-table-cell"><img src="../../images/header3.jpg"></div>
                            <div class="mui-table-cell"><img src="../../images/header4.jpg"></div>
                            <div class="mui-table-cell"><img src="../../images/header5.jpg"></div>
                            <div class="mui-table-cell"><span class="oa-pic-default bgr3">陈晨</span></div>
                            <div class="mui-table-cell"><img src="../../images/ico_add.png"></div>
                            <div class="mui-table-cell"><img src="../../images/ico_reduce.png"></div>-->
                        </div>
                    </li>
                </ul>
                <ul class="mui-table-view eg-table-view eg-detail-list">
                    <li class="mui-table-view-cell">
                        群类型<span class="mui-badge mui-badge-inverted">普通群</span>
                    </li>
                </ul>

                <div class="fixed-bottom">
                    <div id="toastBtn" class="mui-table mui-text-center">
                        <div class="mui-table-cell"><button @click="createGroup()" type="button" class="mui-btn mui-btn-primary">完成创建</button></div>
                    </div>
                </div>
            </div>
            </div>
            <div id="select_children" class="mui-page" style="display:none">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <div class="mui-navbar-inner mui-bar mui-bar-nav">
                    <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                        <span class="mui-icon mui-icon-left-nav"></span>返回
                    </button>
                    <h1 class="mui-center mui-title">组织架构</h1>
                    <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser()">完成</button>
                </div>
            </div>
            <div class="mui-page-content">
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <section class="mui-content">
                            <div id="dept_head" class="group-header">
                                <div id="select_children_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
                                    <div id="children_scroll" class="mui-scroll">
                                        <div class="mui-control-item selected">
                                            联系人 &gt;
                                        </div>
                                        <div v-for="(obj,index) in navList" :key="index">
                                            <div v-if="index == 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
                                                </div>
                                            </div>
                                            <div v-if="index > 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mui-control-content address-list mui-active">
                                <div v-if="deptList.length > 0">
                                    <h5 class="mui-content-padded">子部门列表</h5>
                                </div>
                                <div  v-for="(item,index) in deptList" :key="index">
                                    <ul class="mui-table-view group-list">
                                        <li class="mui-table-view-cell mui-checkbox">
                                            <a @click ="clickshow" class="">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-input mui-table-cell">
                                                        <!--<template v-if="selDept.contains(item.deptId +'')">
                                                            <input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                        </template>
                                                        <template v-else>
                                                            <input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                        </template>-->
                                                        <input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="dept-select"/>
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.deptName"></h4>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>
                                    </ul>
                                </div>
                                <div v-if="memberList.length > 0">
                                    <h5 class="mui-content-padded">部门成员</h5>
                                    <div class="address-list">
                                        <div class="">
                                            <ul class="mui-table-view">
                                                <div v-for="(item,index) in memberList" :key="index">
                                                    <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                                        <div class="mui-slider-cell">
                                                            <div class="oa-contact-cell mui-table">
                                                                <div class="oa-contact-input mui-table-cell">
                                                                    <div v-if="selectArr.contains(item.userId +'')">
                                                                        <div v-if="myId == item.userId || thirdUserId == item.userId">
                                                                            <input type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                        <div v-else>
                                                                            <input type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else>
                                                                        <input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                    </div>
                                                                </div>
                                                                <div class="oa-contact-avatar mui-table-cell">
                                                                    <img :src="item.userAvatar"/>
                                                                </div>
                                                                <div class="oa-contact-content mui-table-cell">
                                                                    <h4 class="oa-contact-name" v-text="item.memberName"></h4>
                                                                    <p class="oa-contact-email" v-text="item.phoneNumber"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div v-if="deptList.length == 0 && memberList.length == 0">
                        <div class="no-group">
                            <div class="no-record-img"></div>
                            <p>该部门暂无成员</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="select_children" class="mui-page" style="display:none">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <div class="mui-navbar-inner mui-bar mui-bar-nav">
                    <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                        <span class="mui-icon mui-icon-left-nav"></span>返回
                    </button>
                    <h1 class="mui-center mui-title">组织架构</h1>
                    <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser()">完成</button>
                </div>
            </div>
            <div class="mui-page-content">
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll">
                        <section class="mui-content">
                            <div id="dept_head" class="group-header">
                                <div id="select_children_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted" style="display:none">
                                    <div id="children_scroll" class="mui-scroll">
                                        <div class="mui-control-item selected">
                                            联系人 &gt;
                                        </div>
                                        <div v-for="(obj,index) in navList" :key="index">
                                            <div v-if="index == 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
                                                </div>
                                            </div>
                                            <div v-if="index > 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mui-control-content address-list mui-active">
                                <div v-if="deptList.length > 0">
                                    <h5 class="mui-content-padded">子部门列表</h5>
                                </div>
                                <div v-for="(item,index) in deptList" :key="index">
                                    <ul class="mui-table-view group-list">
                                        <li class="mui-table-view-cell mui-checkbox">
                                            <a @click ="clickshow" class="">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-input mui-table-cell">
                                                        <!--<template v-if="selDept.contains(item.deptId +'')">
                                                            <input type="checkbox" checked="checked"  onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                        </template>
                                                        <template v-else>
                                                            <input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="member-select"/>
                                                        </template>-->
                                                        <input type="checkbox" onchange="selEvent(this)" data-type="dept" :value="item.deptId" class="dept-select"/>
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.deptName"></h4>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>
                                    </ul>
                                </div>
                                <div v-if="memberList.length > 0">
                                    <h5 class="mui-content-padded">部门成员</h5>
                                    <div class="address-list">
                                        <div class="">
                                            <ul class="mui-table-view">
                                                <div v-for="(item,index) in memberList" :key="index">
                                                    <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                                        <div class="mui-slider-cell">
                                                            <div class="oa-contact-cell mui-table">
                                                                <div class="oa-contact-input mui-table-cell">
                                                                    <div v-if="selectArr.contains(item.userId +'')">
                                                                        <div v-if="myId == item.userId || thirdUserId == item.userId">
                                                                            <input type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                        <div v-else>
                                                                            <input type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else>
                                                                        <input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                    </div>
                                                                </div>
                                                                <div class="oa-contact-avatar mui-table-cell">
                                                                    <img :src="item.userAvatar"/>
                                                                </div>
                                                                <div class="oa-contact-content mui-table-cell">
                                                                    <h4 class="oa-contact-name" v-text="item.memberName"></h4>
                                                                    <p class="oa-contact-email" v-text="item.phoneNumber"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div v-if="deptList.length == 0 && memberList.length == 0">
                        <div class="no-group">
                            <div class="no-record-img"></div>
                            <p>该部门暂无成员</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="select_project" class="mui-page" style="display:none">
            <div class="mui-navbar-inner mui-bar mui-bar-nav">
                <div class="mui-navbar-inner mui-bar mui-bar-nav">
                    <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
                        <span class="mui-icon mui-icon-left-nav"></span>返回
                    </button>
                    <h1 class="mui-center mui-title">组织架构</h1>
                    <button class="mui-btn mui-btn-nav mui-btn-primary mui-pull-right mui-disabled ok-btn" @click="trueSelectUser()">完成</button>
                </div>
            </div>
            <div class="mui-page-content">
                <div class="mui-scroll-wrapper">
                    <div class="mui-scroll" id="sc">
                        <section class="mui-content">
                            <div id="dept_head" class="group-header">
                                <div id="select_project_scroll" class="mui-scroll-wrapper member mui-segmented-control mui-segmented-control-inverted">
                                    <div id="project_scroll" class="mui-scroll">
                                        <div class="mui-control-item selected">
                                            联系人 &gt;
                                        </div>
                                        <div v-for="(obj,index) in navList" :key="index">
                                            <div v-if="index == 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.teamName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-team-id="obj.teamId" :data-team-name="obj.teamName"  v-text="obj.teamName + '&gt;'"></div>
                                                </div>
                                            </div>
                                            <div v-if="index > 0">
                                                <div v-if="index == (navList.length-1)">
                                                    <div class="mui-control-item mui-active enabled" href="javascript:;" v-text="obj.deptName"></div>
                                                </div>
                                                <div v-else>
                                                    <div class="mui-control-item selected" :data-dept-id="obj.deptId" :data-dept-name="obj.deptName"  v-text="obj.deptName + '&gt;'"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mui-control-content address-list mui-active">
                                <div v-if="selDept.length > 0">
                                    <h5 class="mui-content-padded">项目联系人</h5>
                                </div>
                                <ul class="mui-table-view" v-if="selDept.length > 0">
                                    <div  v-for="(item,index) in selDept" :key="index">
                                        <li class="mui-table-view-cell" v-if="item.type==2&&item.memberNumber>0">
                                            <a class="mui-navigate-right" @click="getRoomMembers(index,-1,item.roomClassName)">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-avatar mui-table-cell">
                                                        <img :src="item.iconUrl"/>
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
                                                        <p class="oa-contact-email"><span v-text="item.roomName"></span>（<span v-text="item.roomMembers.items.length"></span>）人</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="mui-table-view-cell mui-collapse" v-if="item.type==1&&item.items.length>0">
                                            <a class="mui-navigate-right">
                                                <div class="oa-contact-cell mui-table">
                                                    <div class="oa-contact-avatar mui-table-cell">
                                                        <img :src="item.iconUrl"/>
                                                    </div>
                                                    <div class="oa-contact-content mui-table-cell">
                                                        <h4 class="oa-contact-name" v-text="item.roomClassName"></h4>
                                                    </div>
                                                </div>
                                            </a>
                                            <div class="mui-collapse-content" style="padding-top: 0px;">
                                                <ul class="mui-table-view" style="margin-top: 0px;">
                                                    <div v-for="(it,i) in item.items" :key="i">
                                                        <li class="mui-table-view-cell" v-if="it.roomMembers.items.length>0">
                                                            <a class="mui-navigate-right" @click="getRoomMembers(index,i,it.roomName)">
                                                                <div class="oa-contact-cell mui-table">
                                                                    <div class="oa-contact-avatar mui-table-cell mui-col-xs-3">
                                                                        <img :src="item.iconUrl"/>
                                                                    </div>
                                                                    <div class="oa-contact-content mui-table-cell mui-col-xs-9">
                                                                        <h4 class="oa-contact-name" v-text="it.roomName"></h4>
                                                                        <p class="oa-contact-email"><span v-text="it.ownerName"></span>（<span v-text="it.roomMembers.items.length"></span>）人</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    </div>
                                                </ul>
                                            </div>
                                        </li>
                                        <!--<div class="sub-btn" @click="selectDept(item.deptId,item.deptName,$event)"><span class="mui-icon iconfont icon-sub"></span>下级</div>-->
                                    </div>
                                </ul>
                                
                                <div v-if="memberList.length > 0">
                                    <h5 class="mui-content-padded">部门成员</h5>
                                    <div class="address-list">
                                        <div class="">
                                            <ul class="mui-table-view">
                                                <div v-for="(item,index) in memberList" :key="index">
                                                    <li class="mui-table-view-cell mui-indexed-list-item mui-checkbox">
                                                        <div class="mui-slider-cell">
                                                            <div class="oa-contact-cell mui-table">
                                                                <div class="oa-contact-input mui-table-cell">
                                                                    <div v-if="selectArr.contains(item.userId +'')">
                                                                        <div v-if="myId == item.userId || thirdUserId == item.userId">
                                                                            <input type="checkbox" checked="checked" disabled="disabled" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                        <div v-else>
                                                                            <input type="checkbox" checked="checked" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                        </div>
                                                                    </div>
                                                                    <div v-else>
                                                                        <input type="checkbox" onchange="selEvent(this)" data-type="user" :value="item.userId"/>
                                                                    </div>
                                                                </div>
                                                                <div class="oa-contact-avatar mui-table-cell">
                                                                    <img :src="item.userIcon">
                                                                </div>
                                                                <div class="oa-contact-content mui-table-cell">
                                                                    <h4 class="oa-contact-name" v-text="item.nickName"></h4>
                                                                    <p class="oa-contact-email" v-text="item.cellPhone"></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <!--<template v-if="deptList.length == 0 && memberList.length == 0">
                        <div class="no-group">
                            <div class="no-record-img"></div>
                            <p>该项目暂无成员</p>
                        </div>
                    </template>-->
                </div>
            </div>
        </div>
    </div>   
</template>

<script>
import {getParam,BackCookie} from '../../playform/common'
import mui from '../../playform/mui'
export default {
    data () {
        return {
            items:[],
            friendsList:[],
            key:"",
            selArr:[],
            myId:this.userId,
            selDept:[],
            selectNumStr:"",
            groupName:"",
            projects:[],
            userId: '',
            selectType:'',
            deptList:[],
            memberList:[],
            navList:[],
            selDept:[],
            selectArr :[],
        }
    },
    created () {
            function convertData (friendArray) {
            if (friendArray && friendArray.length > 0) {

                var newArrs = new Array();
                for (var i = 0; i < 27; i++) {
                    newArrs[i] = new Array();
                }
                for (var j = 0; j < friendArray.length; j++) {

                    var f = friendArray[j].nameInitials.toUpperCase();
                    var headerImage = !friendArray[j].avatar || friendArray[j].avatar == "" ? getUrl() + "/static/images/60x60.gif" : friendArray[j].avatar;
                    var obj = {
                        name: friendArray[j].remarksName,
                        phone: friendArray[j].cellPhone,
                        friendsUserId: friendArray[j].friendsUserId,
                        headerImage: headerImage,
                        imId: friendArray[j].imId
                    };
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
            } else {
                return []
            }
        }
        //获取参数
        var map = {};
        var param = window.location.href.split("?")[1];
        if(param) {
            var arrays = window.location.href.split("?")[1].split("&");
            var map = {};
            for (let i = 0; i < arrays.length; i++) {
                var param = arrays[i].split("=");
                map[param[0]] = decodeURI(param[1]);
            }
        }
        this.selectType=map.selectType;
        this.userId = BackCookie.getCookie("userid")
        //appApi.hideBack();//iframe弹出，统一隐藏返回按钮
        var _self = this;
        this.$http.post("/chart/column/table_swprojectinfo?used=getPro",{}).then(function (response) {
//          console.log("数据",response.data.result)
            _self.projects = response.data.result;
        }).catch(function (error) {
            console.info(error);
        });
        setTimeout(function(){
	        _self.$http.post("/concats_api/find_team_list",{}).then(function (response) {
	            _self.items = response.data.result;
	        }).catch(function (error) {
	            console.info(error);
	        });
        },200);
        var param = new FormData();
        param.append("userId", "");
        setTimeout(function(){
	        _self.$http.post("/concats_api/find_eg_list", param).then(function (response) {
                
                _self.friendsList = convertData(response.data.result);
                console.log(_self.friendsList)
	            _self.updated();
	        }).catch(function (error) {
	            console.info(error);
	        });
        },400);
    },
    methods:{
        selectDept:function (deptId,deptName,event) {
            var obj = {teamId:undefined,deptId:deptId,deptName:deptName};
            //i=0为联系人页面
            var flag = false;
            var nArr = new Array();
            for(var i=0;i<historyArr.length;i++){
                nArr.push(historyArr[i]);
                if(undefined != deptId && deptId == historyArr[i].deptId){
                    flag = true;
                    break;
                }

            }
            if(!flag){
                nArr.push(obj);
            }
            historyArr = nArr;
            var _self = this;
            _self.$data.navList = historyArr;
            initChildDept(undefined,deptId,deptName);
            event.preventDefault();
            event.stopPropagation();
        },
        selectTeam:function (teamId,teamName,event) {
            var obj = {teamId:undefined,teamName:teamName,deptId:undefined,deptName:undefined};
            //i=0为联系人页面
            var flag = false;
            var nArr = new Array();
            for(var i=0;i<historyArr.length;i++){
                nArr.push(historyArr[i]);
                if(undefined != teamId && teamId == historyArr[i].teamId){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                nArr.push(obj);
            }
            historyArr = nArr;
            var _self = this;
            _self.$data.navList = historyArr;
            initChildDept(teamId,undefined,undefined);
            event.preventDefault();
            event.stopPropagation();
        },
        selectInArr(bool,val) {
            val = val + "";
            if(bool){
                if(!this.selectArr.contains(val)){
                    this.selectArr.push(val);
                }
            }else{
                if(this.userId != val){ //自己不能删除
                    this.selectArr.remove(val);
                }
            }
            var count = this.selectArr.length;
            var text = count ? "完成(" + count + ")" : "完成";
            if(selectType==3){//选择名片发送
                text = count ? "发送(" + count + ")" : "发送";
            }
            var btn = jQuery(".ok-btn");
            btn.text(text);
            if (count) {
                if (btn.hasClass("mui-disabled")) {
                    btn.removeClass("mui-disabled");
                }
            } else {
                if (!btn.hasClass("mui-disabled")) {
                    btn.addClass("mui-disabled");
                }
            }
            this.selArr = this.selectArr;
            this.selArr = this.selectArr;
        },
        clickshow: function () {
            return true;
        },
        selectDept:function (deptId,deptName,event) {
            var obj = {teamId:undefined,deptId:deptId,deptName:deptName};
            //i=0为联系人页面
            var flag = false;
            var nArr = new Array();
            for(var i=0;i<historyArr.length;i++){
                nArr.push(historyArr[i]);
                if(undefined != deptId && deptId == historyArr[i].deptId){
                    flag = true;
                    break;
                }

            }
            if(!flag){
                nArr.push(obj);
            }
            historyArr = nArr;
            var _self = this;
            _self.navList = historyArr;
            initChildDept(undefined,deptId,deptName);
            event.preventDefault();
            event.stopPropagation();
        },
        selectTeam:function (teamId,teamName,event) {
            var obj = {teamId:undefined,teamName:teamName,deptId:undefined,deptName:undefined};
            //i=0为联系人页面
            var flag = false;
            var nArr = new Array();
            for(var i=0;i<historyArr.length;i++){
                nArr.push(historyArr[i]);
                if(undefined != teamId && teamId == historyArr[i].teamId){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                nArr.push(obj);
            }
            historyArr = nArr;
            var _self = this;
            _self.navList = historyArr;
            initChildDept(teamId,undefined,undefined);
            event.preventDefault();
            event.stopPropagation();
        },
        updated:function () {//DOM更新时，进行调用的方法
            document.getElementById("list").style.display = "block";
            mui.ready(function () {
                window.indexedList = new mui.IndexedList(list)
            });
        },
        getImageUrl: function (val) {
            if(val==null || val=="") return "/static/images/60x60.gif";
            return val;
        },
        clickshow: function () {
            return true;
        },
        updated:function () {//DOM更新时，进行调用的方法
            document.getElementById("list").style.display = "block";
            mui.ready(function () {
                window.indexedList = new mui.IndexedList(list)
            });
        },
        //确定选中的userIds
        trueSelectUser: function () {
            if(this.selectArr.length<1){
                return;
            }
            /*document.getElementById("member_div1").style.display="none";
            document.getElementById("member_div2").style.display="block";

            document.getElementById("head_1").style.display="none";
            document.getElementById("head_2").style.display="block";

            document.getElementById("btn-referrer3").style.display="none";//隐藏
            document.getElementById("btn-referrer2").style.display="block";*/

            if(selectType==3){//发送名片
                var jsonStr = "";
                var jsonStrs = [];
				jsonStrs.push("[")
                var l = loading("加载中...");
                for(var i=0;i<this.selectArr.length;i++){
                    var cardUserId = this.selectArr[i];
                    var url;
                    var phone;//名片手机号
                    var nickName;//名片昵称
                    var avatarUrl;//名片头像地址
                    var param = new FormData();
                    param.append("userId", cardUserId);//根据名片userId查询名片名称、头像、手机号
                    this.$http.post("/concats_api/query_contacts_info", param).then(function (response){
                        var data = response.data.result.contactsInfoVO;
                        nickName = data.nickName;
                        avatarUrl = data.userAvatar;
                        phone = data.cellPhone;
                        url="/static/webstatic/contacts/eg_details.html?userId="+data.userId;//名片地址
                        //var jsonStr = {phone:phone,nickName:nickName,avatarUrl:avatarUrl,url:url,toImId:imId,toAvatarUrl:headerImage,toNickName:rName,chatType:chatType};
//                      jsonStr = jsonStr+'{"phone":"'+phone+'","nickName":"'+nickName+'","avatarUrl":"'+avatarUrl+'","url":"'+url+'"}'+',';
                        jsonStrs.push('{"phone":"'+phone+'","nickName":"'+nickName+'","avatarUrl":"'+avatarUrl+'","url":"'+url+'"},');
                    }).catch(function (error) {
                    	layer.close(l)
                        console.info(error);
                    });
                }
                setTimeout(function () {
                    layer.close(l)
                    var jsonStr = jsonStrs.join('');
//          		alert(jsonStr.substring(0,jsonStr.length-1)+"]")
					jsonStr = jsonStr.substring(0,jsonStr.length-1)+"]";
//					alert(JSON.parse(jsonStr))
// 					console.log(jsonStr)
                    window.appApi.sendCardSetData(JSON.parse(jsonStr));
                },1500);
            }else if(selectType==2){//项目部门人员设置(此功能应该已不用)
                appApi.showBack();//显示返回按钮

                this.selectNumStr = this.selectArr.length+"人";

                var selectUserIdsEvy = "";
                for(var i=0;i<this.selectArr.length;i++){
                    if(i==this.selectArr.length-1){
                        selectUserIdsEvy+=this.selectArr[i];
                    }else{
                        selectUserIdsEvy+=this.selectArr[i]+",";
                    }
                }

                window.parent.userIds = selectUserIdsEvy;//给父页面对象赋值
                selectUserIds = selectUserIdsEvy;
                var param = {userIds:selectUserIds};//查询头像list返回
                var _self = this;
                this.$http.post("/concats_api/query_gms_info_select",param).then(function (response) {
                    var reps = response.data.result;
                    _self.none = reps;
                    var mList = reps.groupMemberTempVOList;
                    var userNames = "";
                    for(var i=0;i<mList.length;i++){
                        if(i==mList.length-1){
                            userNames+=mList[i].nickName;
                        }else{
                            userNames+=mList[i].nickName+" ";
                        }
                    }
                    window.parent.document.getElementById("userNames").innerText=userNames;//给父页面对象赋值

                    console.info(response.data.result);
                    parent.closeWindow(module_id);//关闭iframe
                }).catch(function (error) {
                    console.info(error);
                });

                viewApi.back();//关闭选择子部门div
            }

        },
        getProjectMembers:function(projectSN,projectName){
			var _self = this;
//			_self.$data.deptList = [];
//			_self.$data.selDept = [];
			_self.memberList = [];
//			console.log(projectName)
			var obj = {teamId:projectSN,teamName:projectName,type:1};
			var lengths = historyArr.length;
			if (lengths>0) {
				for(var i=0 ; i<lengths;i++){
					historyArr.pop();
				}
			}
			historyArr.push(obj)
			_self.$data.navList = historyArr;
			document.getElementById("sc").style.transform="translate3d(0px, 0px, 0px) translateZ(0px)";
			$.ajax({
	            type: "post",
	            url: "/pcontact_api/findallroomlist",
	            data: {
	                "projectSn":projectSN,
	                "flag":2,//1: 包涵会议室、招聘室 2 不包含会议室和招聘室
	                "isQueryMember":1//isQueryMember 是否返回成员信息  1：返回  2：不返回
	            },
	            datatype: "json",
	            success: function(data) {
	            	console.log(data)
	            	if(data.code==0){
	            		_self.$data.deptList = data.result.roomItems;
	            		_self.$data.selDept = data.result.roomItems;
//	            		console.log(_self.$data.deptList)
	            	}
//	            	if(c_scroll){
//						setTimeout(function () {
//							mui('#select_project_scroll').scroll().refresh();
//							var w = document.getElementById("project_scroll").scrollWidth;
//							var s = c_scroll.wrapperWidth - w;
//							if(s<0){
//								mui('#select_project_scroll').scroll().scrollTo(s,0,100);
//							}
//							var _self = capp;
//							mui('#project_scroll').on('tap', '.mui-control-item', function(e) {
//								viewApi.back('#select_member');
//							});
//						},500)
//					}
	            },
	            error:function(error){
	            	
	            }
	        });
		},
		/**
		 * 获取房间数据
		 * @param {Object} leave1 第一层
		 * @param {Object} leave2 第二层 当只有第一层时为-1
		 */
		getRoomMembers:function(leave1,leave2,className){
			var obj = {teamId:undefined,deptId:undefined,deptName:className,type:1};//type2表示时团队，1表示时项目
			//i=0为联系人页面
			
			var _self = this;
			var lengths = historyArr.length-1;
			if (lengths>0) {
				for(var i=0 ; i<lengths;i++){
					historyArr.pop();
				}
			}
			historyArr.push(obj)
			_self.$data.navList = historyArr;
			var deptList = _self.$data.deptList;
			_self.$data.selDept = [];
			if (leave2==-1) {
//				console.log(deptList[leave1].roomMembers.items)
				_self.memberList = deptList[leave1].roomMembers.items;
			}else{
//				console.log(deptList[leave1].items[leave2].roomMembers.items)
				_self.memberList = deptList[leave1].items[leave2].roomMembers.items;
			}
			//解决上拉太多点击后回不到顶部问题
			document.getElementById("sc").style.transform="translate3d(0px, 0px, 0px) translateZ(0px)";
			console.log(document.body.scrollTop || document.documentElement.scrollTop)
			console.log(111)
			if(c_scroll){
				setTimeout(function () {
//					mui('#select_project_scroll').scroll().refresh();
//					var w = document.getElementById("project_scroll").scrollWidth;
//					var s = c_scroll.wrapperWidth - w;
//					if(s<0){
//						mui('#select_project_scroll').scroll().scrollTo(s,0,100);
//					}
//					var _self = capp;
				},200)
			}
		}
    },
    mounted(){
        function convertData (friendArray) {
            if (friendArray && friendArray.length > 0) {

                var newArrs = new Array();
                for (var i = 0; i < 27; i++) {
                    newArrs[i] = new Array();
                }
                for (var j = 0; j < friendArray.length; j++) {

                    var f = friendArray[j].nameInitials.toUpperCase();
                    var headerImage = !friendArray[j].avatar || friendArray[j].avatar == "" ? getUrl() + "/static/images/60x60.gif" : friendArray[j].avatar;
                    var obj = {
                        name: friendArray[j].remarksName,
                        phone: friendArray[j].cellPhone,
                        friendsUserId: friendArray[j].friendsUserId,
                        headerImage: headerImage,
                        imId: friendArray[j].imId
                    };
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
            } else {
                return []
            }
        }
        mui('#children_scroll').on('tap', '.mui-control-item', function(e) {
            var target = e.target;
            var teamId = target.getAttribute("data-team-id");
            var deptId = target.getAttribute("data-dept-id");
            if(undefined != teamId){
                var teamName = target.getAttribute("data-team-name");
                this.selectTeam(teamId,teamName,e)
            }else if(undefined != deptId){
                var deptName = target.getAttribute("data-dept-name");
                this.selectDept(deptId,deptName,e);
            }else{ 
                viewApi.back('#select_member');
            }
        });
        mui('#project_scroll').on('tap', '.mui-control-item', function(e) {
            var target = e.target;
            var teamId = target.getAttribute("data-team-id");
            if(undefined != teamId){
                var deptName = target.getAttribute("data-team-name");
                this.getProjectMembers(teamId,deptName);
            }else{
                viewApi.back('#select_member');
            }
        });
        function initChildDept(teamId,deptId,deptName) {
            if(undefined == teamId){
                teamId = 0;
            }
            if(undefined == deptId){
                deptId = 0;
            }
            //清除原有选中
            //jQuery("#select_children").find('input[type="checkbox"]').removeAttr("checked").removeAttr("disabled");
            this.selDept = selectDept;
            this.selDept = selectDept;
            var _self = capp;
            var par = {deptId:deptId,teamId:teamId};
            this.$http.post("/concats_api/query_dept_list",par).then(function (response) {
                _self.$data.deptList = response.data.result;
                setTimeout(function () {
                    $(".dept-select").each(function(){
                        var id = $(this).val();
                        if(selectDept.contains(id)){
                            $(this).attr("checked","checked");
                        }else{
                            $(this).removeAttr("checked");
                        }
                    });
                    mui('.dept-select').input();
                },200)
            }).catch(function (error) {
                console.info(error);
            });
            if(deptId!=0){
                par = {deptId:deptId};
            }else{
                par = {teamId:teamId};
            }
            this.$http.post("/concats_api/query_team_members",par).then(function (response) {
                _self.memberList = response.data.result;
            }).catch(function (error) {
                console.info(error);
            });
            if(c_scroll){
                setTimeout(function () {
                    mui('#select_children_scroll').scroll().refresh();
                    var w = document.getElementById("children_scroll").scrollWidth;
                    var s = c_scroll.wrapperWidth - w;
                    if(s<0){
                        mui('#select_children_scroll').scroll().scrollTo(s,0,100);
                    }
        //          var _self = capp;
                },500)
            }
        }
        //单选一个人员
        function selectOne(userId,userName,phone) {

            appApi.showBack();//显示返回按钮

            var parentObj = window.parent.parentObj;
            //父页面对象赋值:
            if(parentObj=="UserFinal"){
                window.parent.app.fm.UserFinalName=userName;
                window.parent.app.fm.UserFinalID=userId;
                window.parent.app.fm.UserFinalPhone=phone;
            }else if(parentObj=="UserSheji"){
                window.parent.app.fm.UserShejiName=userName;
                window.parent.app.fm.UserShejiID=userId;
                window.parent.app.fm.UserShejiPhone=phone;
            }else if(parentObj=="UserJianli"){
                window.parent.app.fm.UserJianliName=userName;
                window.parent.app.fm.UserJianliID=userId;
                window.parent.app.fm.UserJianliPhone=phone;
            }else if(parentObj=="UserShenji"){
                window.parent.app.fm.UserShenjiName=userName;
                window.parent.app.fm.UserShenjiID=userId;
                window.parent.app.fm.UserShenjiPhone=phone;
            }
            parent.closeWindow(module_id);//关闭iframe
        }
    }
}
</script>

<style>

</style>
