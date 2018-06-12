const functions = resolve => require(['@/components/functions'], resolve)
const businessCard = resolve => require(['@/components/functions/businessCard'], resolve)
const project_list = resolve => require(['@/components/functions/project_list'], resolve)

const functionsConfig = {
  path: '',
  component: functions,
  children: [
    {
      path: '/static/webstatic/contacts/select_member_comm.html',
      component: businessCard
    },
    {
      path: '/static/newwebstatic/file_gui/project_list.html',
      component: project_list
    },
  ]
}

export default functionsConfig