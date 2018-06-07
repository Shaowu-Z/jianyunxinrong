// import contacts from '@/components/contacts'
// import contactsIndex from '@/components/contacts/contactsIndex'
// import addstyle from '@/components/contacts/addStyle'
// import egList from '@/components/contacts/egList'
// import newFriends from '@/components/contacts/newFriends'
// import phoneList from '@/components/contacts/phoneList'
// import groupManage from '@/components/contacts/groupManage'

const contacts = resolve => require(['@/components/contacts'], resolve)
const contactsIndex = resolve => require(['@/components/contacts/contactsIndex'], resolve)
const addstyle = resolve => require(['@/components/contacts/addStyle'], resolve)
const egList = resolve => require(['@/components/contacts/egList'], resolve)
const newFriends = resolve => require(['@/components/contacts/newFriends'], resolve)
const phoneList = resolve => require(['@/components/contacts/phoneList'], resolve)
const groupManage = resolve => require(['@/components/contacts/groupManage'], resolve)
const groupAddress = resolve => require(['@/components/contacts/groupAddress'], resolve)
const contact_edit = resolve => require(['@/components/contacts/contact_edit'], resolve)
const subdivision = resolve => require(['@/components/contacts/subdivision'], resolve)
const orgStructure = resolve => require(['@/components/contacts/enterprise/orgStructure'], resolve)
const teamIssue = resolve => require(['@/components/contacts/teamIssue'], resolve)
const addTeamIssue = resolve => require(['@/components/contacts/addTeamIssue'], resolve)
const select_team_admin = resolve => require(['@/components/contacts/select_team_admin'], resolve)
const eg_details = resolve => require(['@/components/contacts/eg_details'], resolve)
const addSubdivision = resolve => require(['@/components/contacts/addSubdivision'], resolve)
const signList = resolve => require(['@/components/contacts/signList'], resolve)
const signListsave = resolve => require(['@/components/contacts/signListsave'], resolve)
const team_create = resolve => require(['@/components/contacts/team_create'], resolve)
const team_search = resolve => require(['@/components/contacts/team_search'], resolve)
const select_phone_list = resolve => require(['@/components/contacts/select_phone_list'], resolve)
const add_manually = resolve => require(['@/components/contacts/add_manually'], resolve)

const contactsConfig = {
  path: '/static/webstatic/contacts/address_list.html',
  component: contacts,
  children: [
    {
      path: '',
      component: contactsIndex,
    },
    {
      path: '/orgStructure',
      component: orgStructure
    },
    {
      path: '/addstyle',
      component: addstyle
    },
    {
      path:'/egList',
      component: egList
    },
    {
      path:'/newFriends',
      component: newFriends
    },
    {
      path:'/phoneList',
      component: phoneList
    },
    {
      path:'/groupManage',
      component: groupManage
    },
    {
      path:'/groupAddress',
      component: groupAddress,
    },
    {
      path:'/contact_edit',
      component: contact_edit
    },
    {
      path:'/subdivision',
      component: subdivision
    },
    {
      path:'/teamIssue',
      component: teamIssue
    },
    {
      path:'/addTeamIssue',
      component: addTeamIssue
    },
    {
      path:'/select_team_admin',
      component: select_team_admin
    },
    {
      path:'/eg_details',
      component: eg_details
    },
    {
      path:'/addSubdivision',
      component: addSubdivision
    },
    {
      path:'/signList',
      component: signList
    },
    {
      path:'/signListsave',
      component: signListsave
    },
    {
      path:'/team_create',
      component: team_create
    },
    {
      path:'/team_search',
      component: team_search
    },
    {
      path:'/select_phone_list',
      component: select_phone_list
    },
    {
      path:'/add_manually',
      component: add_manually
    },
  ]
}

export default contactsConfig
