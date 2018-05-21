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

const contactsConfig = {
  path: '/contacts',
  component: contacts,
  children: [
    {
      path: '',
      component: contactsIndex
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
  ]
}

export default contactsConfig
