import myHome from '@/components/myHome'
import myHomeIndex from '@/components/myHome/homeIndex'
import setUp from '@/components/myHome/setUp'
import set from '@/components/myHome/setUp/set'
import setting from '@/components/myHome/setting'
import settingIndex from '@/components/myHome/setting/settingIndex'
import project from '@/components/myHome/project'
const myHomeConfig = {
  path: '/static/webstatic/mycenter/mycenter.html',
  component: myHome,
  children: [
    {
      path: '',
      component: myHomeIndex
    },
    {
      path: '/project',
      component: project
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
    },
    {
      path: '/setting',
      component: setting,
      children: [
        {
          path: '/',
          component: settingIndex
        }
      ]
    }
  ]
}

export default myHomeConfig
