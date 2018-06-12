// import login from '@/components/login'
// import loginIndex from '@/components/login/loginIndex'
// import register from '@/components/login/register'
// import backpwd from '@/components/login/backpwd'
// import serviceAgreement from '@/components/login/serviceAgreement'
// import privacyPolicy from '@/components/login/privacyPolicy'
// import personApprove from '@/components/login/personApprove'

const project = resolve => require(['@/components/project'], resolve)
const addProject = resolve => require(['@/components/project/add_project'], resolve)
const shoufukuan = resolve => require(['@/components/project/shoufukuan'], resolve)
const work_content = resolve => require(['@/components/project/shoufukuan/work_content'], resolve)
const transfer_sfk = resolve => require(['@/components/project/shoufukuan/transfer_sfk'], resolve)
const newInfo = resolve => require(['@/components/project/shoufukuan/newInfo'], resolve)
const ttp = resolve => require(['@/components/project/shoufukuan/ttp'], resolve)
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
