

const laowu = resolve => require(['@/components/laowu'], resolve)
const sign = resolve => require(['@/components/laowu/sign'], resolve)
const projectList = resolve => require(['@/components/laowu/projectList'], resolve)
const normalConfig = resolve => require(['@/components/laowu/normalConfig'], resolve)
const gongZhong = resolve => require(['@/components/laowu/gongZhong'], resolve)
const dianGongGongRen = resolve => require(['@/components/laowu/dianGongGongRen'], resolve)
const dianGongGongZhang = resolve => require(['@/components/laowu/dianGongGongZhang'], resolve)
const dianGongDetail = resolve => require(['@/components/laowu/dianGongDetail'], resolve)
const baoGongGongRen = resolve => require(['@/components/laowu/baoGongGongRen'], resolve)
const baoGongGongZhang = resolve => require(['@/components/laowu/baoGongGongZhang'], resolve)
const baoGongGongDetail = resolve => require(['@/components/laowu/baoGongGongDetail'], resolve)
const jiezhiGongRen = resolve => require(['@/components/laowu/jiezhiGongRen'], resolve)
const jiezhiGongZhang = resolve => require(['@/components/laowu/jiezhiGongZhang'], resolve)
const jiezhiDetail = resolve => require(['@/components/laowu/jiezhiDetail'], resolve)
const jiesuanGongRen = resolve => require(['@/components/laowu/jiesuanGongRen'], resolve)
const jiesuanGongZhang = resolve => require(['@/components/laowu/jiesuanGongZhang'], resolve)
const jiesuanDetail = resolve => require(['@/components/laowu/jiesuanDetail'], resolve)


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
      path: '/static/webstatic/new_laowu/project_diangong_gongren.html',//点工--工人
      component: dianGongGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_gongzhang.html',//点工--工长
      component: dianGongGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_detail.html',//点工--详情
      component: dianGongDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong.html',//包工 --工人
      component: baoGongGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong_gongzhang.html',//包工 --工长
      component: baoGongGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_baogong_detail.html',//包工 --详情
      component: baoGongGongDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi.html',//借支--工人
      component: jiezhiGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi_gongzhang.html',//借支--工长
      component: jiezhiGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_jiezhi_detail.html',//借支--详情
      component: jiezhiDetail
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan.html',//结算--工人
      component: jiesuanGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan_gongzhang.html',//结算--工长
      component: jiesuanGongZhang
    },
    {
      path: '/static/webstatic/new_laowu/project_jiesuan_detail.html',//结算--详情
      component: jiesuanDetail
    }
  ]
}

export default laowuConfig