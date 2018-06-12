const groupChat = resolve => require(['@/components/groupChat'], resolve)
const select_member = resolve => require(['@/components/groupChat/select_member'], resolve)

const groupChatConfig = {
  path: '',
  component: groupChat,
  children: [
    {
      path: '/static/webstatic/contacts/select_member.html',
      component: select_member
    },
  ]
}

export default groupChatConfig