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
const enterprise_home = resolve => require(['@/components/myHome/setUp/enterprise_home'], resolve)
const project_application = resolve => require(['@/components/myHome/setUp/project_application'], resolve)
const setting = resolve => require(['@/components/myHome/setting'], resolve)
const settingIndex = resolve => require(['@/components/myHome/setting/settingIndex'], resolve)
const share = resolve => require(['@/components/myHome/setting/share'], resolve)
const project = resolve => require(['@/components/myHome/project'], resolve)
const aboutUs = resolve => require(['@/components/myHome/setting/aboutUs'], resolve)
const privacy_policy = resolve => require(['@/components/myHome/setting/privacy_policy'], resolve)
const serviceAgreement = resolve => require(['@/components/myHome/setting/serviceAgreement'], resolve)
const myCenter = resolve => require(['@/components/myHome/myCenter'], resolve)
const myInfo = resolve => require(['@/components/myHome/myCenter/myInfo'], resolve)
const myCollect = resolve => require(['@/components/myHome/myCenter/myCollect'], resolve)
const myCodecard=resolve => require(['@/components/myHome/myCenter/my_codecard'], resolve)
const change_phone = resolve => require(['@/components/myHome/myCenter/change_phone'], resolve)
const selectMemberShare = resolve => require(['@/components/myHome/myCenter/selectMemberShare'], resolve)
const myCollectionDetail = resolve => require(['@/components/myHome/myCenter/myCollectionDetail'], resolve)
const playVideo = resolve => require(['@/components/myHome/myCenter/playVideo'], resolve)

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
        },
        {
          path: '/static/webstatic/mycenter/enterprise_home.html',
          component: enterprise_home
        },
        {
          path: '/static/webstatic/work/project_application.html',
          component: project_application
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
        },
        {
          path: '/aboutUs',
          component: aboutUs,
        },
        {
          path: '/privacy_policy',
          component: privacy_policy
        },
        {
          path: '/serviceAgreement',
          component: serviceAgreement
        }
      ]
    },
    {
      path: '/myCenter',
      component: myCenter,
      children: [
        {
          path: '/myInfo',
          component: myInfo
        },
        {
          path: '/static/webstatic/mycenter/my_collect.html',
          component: myCollect
        },
        {
          path: '/static/webstatic/mycenter/my_codecard.html',
          component: myCodecard
        },
        {
          path: '/register/change_phone.html',
          component: change_phone
        },
        {
          path: '/selectMemberShare',
          component: selectMemberShare
        },
        {
          path: '/myCollectionDetail',
          component: myCollectionDetail
        },
        {
          path: '/playVideo',
          component: playVideo
        },
        
      ]
    },
  ]
}

export default myHomeConfig
