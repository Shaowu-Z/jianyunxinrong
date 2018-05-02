import contacts from '@/components/contacts'
import contactsIndex from '@/components/contacts/contactsIndex'

const contactsConfig = {
  path: '/contacts',
  component: contacts,
  children: [
    {
      path: '',
      component: contactsIndex
    }
  ]
}

export default contactsConfig
