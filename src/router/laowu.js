const laowu = resolve => require(['@/components/laowu'], resolve)
const project_sign = resolve => require(['@/components/laowu/project_sign'], resolve)

const laowuConfig = {
  path: '/laowu',
  component: laowu,
  children: [
    {
      path: '/static/webstatic/new_laowu/project_sign.html',
      component: project_sign
    }
  ]
}

export default laowuConfig