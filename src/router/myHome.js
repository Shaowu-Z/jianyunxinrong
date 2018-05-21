// import myHome from '@/components/myHome'
// import myHomeIndex from '@/components/myHome/homeIndex'
// import setUp from '@/components/myHome/setUp'
// import set from '@/components/myHome/setUp/set'
// import setting from '@/components/myHome/setting'
// import settingIndex from '@/components/myHome/setting/settingIndex'
// import share from '@/components/myHome/setting/share'
// import project from '@/components/myHome/project'

const myHome = resolve => require(['@/components/myHome'], resolve)
const myHomeIndex = resolve => require(['@/components/myHome/homeIndex'], resolve)
const setUp = resolve => require(['@/components/myHome/setUp'], resolve)
const set = resolve => require(['@/components/myHome/setUp/set'], resolve)
const setting = resolve => require(['@/components/myHome/setting'], resolve)
const settingIndex = resolve => require(['@/components/myHome/setting/settingIndex'], resolve)
const share = resolve => require(['@/components/myHome/setting/share'], resolve)
const project = resolve => require(['@/components/myHome/project'], resolve)
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
          path: '',
          component: settingIndex
        },
        {
          path: '/share',
          component: share
        }
      ]
    }
  ]
}

export default myHomeConfig
