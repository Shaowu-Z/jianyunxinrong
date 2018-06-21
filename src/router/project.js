// import login from '@/components/login'
// import loginIndex from '@/components/login/loginIndex'
// import register from '@/components/login/register'
// import backpwd from '@/components/login/backpwd'
// import serviceAgreement from '@/components/login/serviceAgreement'
// import privacyPolicy from '@/components/login/privacyPolicy'
// import personApprove from '@/components/login/personApprove'

const project = resolve => require(['@/components/project'], resolve)
const addProject = resolve => require(['@/components/project/addproject'], resolve)
//收付款
const shoufukuan = resolve => require(['@/components/project/shoufukuan'], resolve)
const workcontent = resolve => require(['@/components/project/shoufukuan/workcontent'], resolve)
const transfersfk = resolve => require(['@/components/project/shoufukuan/transfersfk'], resolve)
const newInfo = resolve => require(['@/components/project/shoufukuan/newInfo'], resolve)
const ttp = resolve => require(['@/components/project/shoufukuan/ttp'], resolve)
//收发件
const shoufajian = resolve => require(['@/components/project/shoufajian'], resolve)
const newCreatlianxi = resolve => require(['@/components/project/shoufajian/newCreat'], resolve)
const transferlianxi = resolve => require(['@/components/project/shoufajian/transfer'], resolve)
const newInfolianxi = resolve => require(['@/components/project/shoufajian/newInfo'], resolve)
const ttplianxi = resolve => require(['@/components/project/shoufajian/ttp'], resolve)
//微承诺
const chengnuo = resolve => require(['@/components/project/chengnuo'], resolve)
const newCreatchengnuo = resolve => require(['@/components/project/chengnuo/newCreat'], resolve)
const transferchengnuo = resolve => require(['@/components/project/chengnuo/transfer'], resolve)
const newInfochengnuo = resolve => require(['@/components/project/chengnuo/newInfo'], resolve)
// const ttplianxi = resolve => require(['@/components/project/shoufajian/ttp'], resolve)
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
          path: '/static/newwebstatic/shoufukuan/workcontent.html',
          component: workcontent
        },
        {
          path: '/static/newwebstatic/shoufukuan/transfer.html',
          component: transfersfk
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
          component: newCreatlianxi
        },
        {
          path: '/static/newwebstatic/lianxi/transfer.html',
          component: transferlianxi
        },
        {
          path: '/static/newwebstatic/lianxi/newInfo.html',
          component: newInfolianxi
        },
        {
          path: '/static/newwebstatic/lianxi/ttp.html',
          component: ttplianxi
        }
      ]
    },
    {
      path: '/chengnuo',
      component: chengnuo,
      children: [
        {
          path: '/static/newwebstatic/chengnuo/newCreat.html',
          component: newCreatchengnuo
        },
        {
          path: '/static/newwebstatic/chengnuo/transfer.html',
          component: transferchengnuo 
        },
        {
          path: '/static/newwebstatic/chengnuo/newInfo.html',
          component: newInfochengnuo
        },
        {
          path: '/static/newwebstatic/chengnuo/ttp.html',
          component: ttp
        }
      ]
    }
    
    
    //     {
    //   path: '/static/newwebstatic/shoufukuan/workcontent.html',
    //   component: shoufukuan
    // },
    // {
    //   path: '/static/newwebstatic/shoufukuan/transfer.html',
    //   component: transfersfk
    // },
    // {
    //   path: '/static/newwebstatic/shoufukuan/newInfo.html',
    //   component: newInfo
    // }
  ]
}

export default myProjectconfig
