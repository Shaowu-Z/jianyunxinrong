import contacts from '@/components/contacts'
import contactsIndex from '@/components/contacts/contactsIndex'
import addstyle from '@/components/contacts/addStyle'
import egList from '@/components/contacts/egList'

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
    }
  ]
}

export default contactsConfig
