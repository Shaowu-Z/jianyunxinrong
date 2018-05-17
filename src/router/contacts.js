import contacts from '@/components/contacts'
import contactsIndex from '@/components/contacts/contactsIndex'
import addstyle from '@/components/contacts/addStyle'
import egList from '@/components/contacts/egList'
import newFriends from '@/components/contacts/newFriends'
import phoneList from '@/components/contacts/phoneList'

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
    }
  ]
}

export default contactsConfig
