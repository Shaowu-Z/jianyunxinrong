import myHome from '@/components/myHome'
import myHomeIndex from '@/components/myHome/homeIndex'
import setUp from '@/components/myHome/setUp'
import set from '@/components/myHome/setUp/set'
const myHomeConfig = {
  path: '/myHome',
  component: myHome,
  children: [
    {
      path: '',
      component: myHomeIndex
    },
    {
      path: '/',
      component: setUp
    },
    {
      path: '/setUp',
      component: setUp,
      children: [
        {
          path: '/',
          component: set
        }
      ]
    }
  ]
}

export default myHomeConfig
