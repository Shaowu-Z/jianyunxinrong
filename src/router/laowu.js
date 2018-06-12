const laowu = resolve => require(['@/components/laowu'], resolve)
const sign = resolve => require(['@/components/laowu/sign'], resolve)

const laowuConfig = {
  path: '/laowu',
  component: laowu,
  children: [
    {
      path: '/static/webstatic/new_laowu/project_sign.html',
      component: sign
    }
  ]
}

export default laowuConfig