

const laowu = resolve => require(['@/components/laowu'], resolve)
const sign = resolve => require(['@/components/laowu/sign'], resolve)
const projectList = resolve => require(['@/components/laowu/projectList'], resolve)
const normalConfig = resolve => require(['@/components/laowu/normalConfig'], resolve)
const gongZhong = resolve => require(['@/components/laowu/gongZhong'], resolve)
const gongRenList = resolve => require(['@/components/laowu/gongRenList'], resolve)
const recordGongRen = resolve => require(['@/components/laowu/recordGongRen'], resolve)
const recordGongZhang = resolve => require(['@/components/laowu/recordGongZhang'], resolve)
const recordDetail = resolve => require(['@/components/laowu/recordDetail'], resolve)
const confirmDetail = resolve => require(['@/components/laowu/confirmDetail'], resolve)
const workCalendar = resolve => require(['@/components/laowu/workCalendar'], resolve)
const recordList = resolve => require(['@/components/laowu/recordList'], resolve)
const manageCalendar = resolve => require(['@/components/laowu/manageCalendar'], resolve)
const manageCalendarDetail = resolve => require(['@/components/laowu/manageCalendarDetail'], resolve)
const laowuSignDetail = resolve => require(['@/components/laowu/laowuSignDetail'], resolve)
const contractList = resolve => require(['@/components/laowu/contractList'], resolve)
const selectMember = resolve => require(['@/components/laowu/selectMember'], resolve)
const phoneList = resolve => require(['@/components/laowu/phoneList'], resolve)



const laowuConfig = {
  path: '/laowu',
  component: laowu,
  children: [
    {
      path: '/static/webstatic/new_laowu/project_sign.html',//打卡
      component: sign
    },
    {
      path: '/static/webstatic/new_laowu/project_list.html',//项目列表
      component: projectList
    },
    {
      path: '/static/webstatic/new_laowu/project_normal_config.html',//标准工资配置
      component: normalConfig
    },
    {
      path: '/static/webstatic/new_laowu/gongzhong_list.html',//工种列表
      component: gongZhong
    },
    {
      path: '/static/webstatic/new_laowu/gongren_list.html',//工种列表
      component: gongRenList
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_gongren.html',//点工--工人
      component: recordGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_gongzhang.html',//点工--工长
      component: recordGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_detail.html',//点工--详情
      component: recordDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong.html',//包工 --工人
      component: recordGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong_gongzhang.html',//包工 --工长
      component: recordGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong_detail.html',//包工 --详情
      component: recordDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi.html',//借支--工人
      component: recordGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi_gongzhang.html',//借支--工长
      component: recordGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi_detail.html',//借支--详情
      component: recordDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan.html',//结算--工人
      component: recordGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan_gongzhang.html',//结算--工长
      component: recordGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan_detail.html',//结算--详情
      component: recordDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_confirm_detail.html',//结算--详情
      component: confirmDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_calendar.html',//上工日历
      component: workCalendar
    },
    {
      path: '/static/webstatic/new_laowu/project_record_list.html',//日历列表
      component: recordList
    },
    {
      path: '/static/webstatic/new_laowu/project_manager_calendar.html',//日历列表
      component: manageCalendar
    },
    {
      path: '/static/webstatic/new_laowu/project_manager_sign.html',//日历列表
      component: manageCalendarDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_sign_detail.html',//日历列表
      component: laowuSignDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_contact_list.html',//日历列表
      component: contractList
    },
    {
      path: '/static/webstatic/new_laowu/select_member.html',//建云联系人
      component: selectMember
    },
    {
      path: '/static/webstatic/new_laowu/project_phone_list.html',//日历列表
      component: phoneList
    },
   
  ]
}

export default laowuConfig