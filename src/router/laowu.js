

const laowu = resolve => require(['@/components/laowu'], resolve)
const sign = resolve => require(['@/components/laowu/sign'], resolve)
const projectList = resolve => require(['@/components/laowu/projectList'], resolve)
const dianGongGongRen = resolve => require(['@/components/laowu/dianGongGongRen'], resolve)
const normalConfig = resolve => require(['@/components/laowu/normalConfig'], resolve)

const laowuConfig = {
  path: '/laowu',
  component: laowu,
  children: [
    {
      path: '/static/webstatic/new_laowu/project_sign.html',
      component: sign
    },
    {
      path: '/static/webstatic/new_laowu/project_list.html',
      component: projectList
    },
    {
      path: '/static/webstatic/new_laowu/project_diangong_gongren.html',
      component: dianGongGongRen
    },
    {
      path: '/static/webstatic/new_laowu/project_normal_config.html',
      component: normalConfig
    }
  ]
}

export default laowuConfig