import contacts from '@/components/contacts'
import contactsIndex from '@/components/contacts/contactsIndex'
import addstyle from '@/components/contacts/addStyle'
import egList from '@/components/contacts/egList'
import newFriends from '@/components/contacts/newFriends'

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
    }
  ]
}

export default contactsConfig
