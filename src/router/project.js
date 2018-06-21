// import login from '@/components/login'
// import loginIndex from '@/components/login/loginIndex'
// import register from '@/components/login/register'
// import backpwd from '@/components/login/backpwd'
// import serviceAgreement from '@/components/login/serviceAgreement'
// import privacyPolicy from '@/components/login/privacyPolicy'
// import personApprove from '@/components/login/personApprove'

const project = resolve => require(['@/components/project'], resolve)
const addProject = resolve => require(['@/components/project/add_project'], resolve)
//收付款
const shoufukuan = resolve => require(['@/components/project/shoufukuan'], resolve)
const work_content = resolve => require(['@/components/project/shoufukuan/work_content'], resolve)
const transfer_sfk = resolve => require(['@/components/project/shoufukuan/transfer_sfk'], resolve)
const newInfo = resolve => require(['@/components/project/shoufukuan/newInfo'], resolve)
const ttp = resolve => require(['@/components/project/shoufukuan/ttp'], resolve)
//收发件
const shoufajian = resolve => require(['@/components/project/shoufajian'], resolve)
const newCreat_lianxi = resolve => require(['@/components/project/shoufajian/newCreat'], resolve)
const transfer_lianxi = resolve => require(['@/components/project/shoufajian/transfer'], resolve)
const newInfo_lianxi = resolve => require(['@/components/project/shoufajian/newInfo'], resolve)
const ttp_lianxi = resolve => require(['@/components/project/shoufajian/ttp'], resolve)
//微承诺
const chengnuo = resolve => require(['@/components/project/chengnuo'], resolve)
const newCreat_chengnuo = resolve => require(['@/components/project/chengnuo/newCreat'], resolve)
const transfer_chengnuo = resolve => require(['@/components/project/chengnuo/transfer'], resolve)
const newInfo_chengnuo = resolve => require(['@/components/project/chengnuo/newInfo'], resolve)
//收货
const shouhuo = resolve => require(['@/components/project/shouhuo'], resolve)
const newCreat_shouhuo = resolve => require(['@/components/project/shouhuo/newCreat'], resolve)
const transfer_shouhuo = resolve => require(['@/components/project/shouhuo/transfer'], resolve)
const newInfo_shouhuo = resolve => require(['@/components/project/shouhuo/newInfo'], resolve)
// const ttp_lianxi = resolve => require(['@/components/project/shoufajian/ttp'], resolve)
// const loginIndex = resolve => require(['@/components/login/loginIndex'], resolve)
// const register = resolve => require(['@/components/login/register'], resolve)
// const backpwd = resolve => require(['@/components/login/backpwd'], resolve)
// const serviceAgreement = resolve => require(['@/components/login/serviceAgreement'], resolve)
// const privacyPolicy = resolve => require(['@/components/login/privacyPolicy'], resolve)
// const personApprove = resolve => require(['@/components/login/personApprove'], resolve)

const myProjectconfig = {
  path: '/project',
  component: project,
  children: [
    {
      path: '/addProject',
      component: addProject
    },
    {
      path: '/shoufukuan',
      component: shoufukuan,
      children: [
        
        {
          path: '/static/newwebstatic/shoufukuan/work_content.html',
          component: work_content
        },
        {
          path: '/static/newwebstatic/shoufukuan/transfer.html',
          component: transfer_sfk
        },
        {
          path: '/static/newwebstatic/shoufukuan/newInfo.html',
          component: newInfo
        },
        {
          path: '/static/newwebstatic/shoufukuan/ttp.html',
          component: ttp
        }
      ]
    },
    {
      path: '/shoufajian',
      component: shoufajian,
      children: [
        
        {
          path: '/static/newwebstatic/lianxi/newCreat.html',
          component: newCreat_lianxi
        },
        {
          path: '/static/newwebstatic/lianxi/transfer.html',
          component: transfer_lianxi
        },
        {
          path: '/static/newwebstatic/lianxi/newInfo.html',
          component: newInfo_lianxi
        },
        {
          path: '/static/newwebstatic/lianxi/ttp.html',
          component: ttp_lianxi
        }
      ]
    },
    {
      path: '/chengnuo',
      component: chengnuo,
      children: [
        
        {
          path: '/static/newwebstatic/chengnuo/newCreat.html',
          component: newCreat_chengnuo
        },
        {
          path: '/static/newwebstatic/chengnuo/transfer.html',
          component: transfer_chengnuo 
        },
        {
          path: '/static/newwebstatic/chengnuo/newInfo.html',
          component: newInfo_chengnuo
        },
        {
          path: '/static/newwebstatic/chengnuo/ttp.html',
          component: ttp
        }
      ]
    },
    {
      path: '/shouhuo',
      component: shouhuo,
      children: [
        
        {
          path: '/static/newwebstatic/shouhuo/work_content.html',
          component: newCreat_shouhuo
        },
        {
          path: '/static/newwebstatic/shouhuo/transfer.html',
          component: transfer_shouhuo 
        },
        {
          path: '/static/newwebstatic/shouhuo/newInfo.html',
          component: newInfo_shouhuo
        },
        {
          path: '/static/newwebstatic/shouhuo/ttp.html',
          component: ttp
        }
      ]
    }
    
    
    //     {
    //   path: '/static/newwebstatic/shoufukuan/work_content.html',
    //   component: shoufukuan
    // },
    // {
    //   path: '/static/newwebstatic/shoufukuan/transfer.html',
    //   component: transfer_sfk
    // },
    // {
    //   path: '/static/newwebstatic/shoufukuan/newInfo.html',
    //   component: newInfo
    // }
  ]
}

export default myProjectconfig
