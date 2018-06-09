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
            <div id="select_children" class="mui-page">
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
        <div id="select_children" class="mui-page">
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
        <div id="select_project" class="mui-page">
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
export default {
    data () {
        return {
            
        }
    }
}
</script>

<style>

</style>
