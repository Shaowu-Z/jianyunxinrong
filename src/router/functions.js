const functions = resolve => require(['@/components/functions'], resolve)
const businessCard = resolve => require(['@/components/functions/businessCard'], resolve)

const functionsConfig = {
  path: '',
  component: functions,
  children: [
    {
      path: '/static/webstatic/contacts/select_member_comm.html',
      component: businessCard
    },
  ]
}

export default functionsConfig