const chatroom = resolve => require(['@/components/chatroom'], resolve)
const xiangmu_info = resolve => require(['@/components/chatroom/xiangmu_info'], resolve)
const xiangmu_edit = resolve => require(['@/components/chatroom/xiangmu_edit'], resolve)
const xiangmu_add = resolve => require(['@/components/chatroom/xiangmu_add'], resolve)
const project_member_list = resolve => require(['@/components/chatroom/project_member_list'], resolve)
const project_member_add = resolve => require(['@/components/chatroom/project_member_add'], resolve)

const chatroomConfig = {
  path: '/static/webstatic/chatroom/xiangmu_info.html',
  component: chatroom,
  children: [
    {
      path: '',
      component: xiangmu_info
    },
    {
        path: '/static/webstatic/chatroom/xiangmu_edit.html',
        component: xiangmu_edit
    },
    {
        path: '/static/webstatic/chatroom/project_member_list.html',
        component: project_member_list
    },
    {
        path: '/static/webstatic/chatroom/project_member_add.html',
        component: project_member_add
    },
    {
      path: '/static/webstatic/chatroom/xiangmu_add.html',
      component: xiangmu_add
  }
  ]
}

export default chatroomConfig