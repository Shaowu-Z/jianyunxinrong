const project = resolve => require(['@/components/project'], resolve)
const information = resolve => require(['@/components/project/information'], resolve)
const informationIndex = resolve => require(['@/components/project/information/informationIndex'], resolve)
const xiangmu_edit = resolve => require(['@/components/project/information/xiangmu_edit'], resolve)

const projectConfig = {
  path: '/static/webstatic',
  component: project,
  children: [
    {
      path: '/static/webstatic/chatroom/xiangmu_info.html',
      component: information,
      children:[
        {
          path: '',
          component: informationIndex
        },
        {
            path: '/static/webstatic/chatroom/xiangmu_edit.html',
            component: xiangmu_edit
          },
      ],
    },
  ]
}

export default projectConfig
 