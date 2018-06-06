// import login from '@/components/login'
// import loginIndex from '@/components/login/loginIndex'
// import register from '@/components/login/register'
// import backpwd from '@/components/login/backpwd'
// import serviceAgreement from '@/components/login/serviceAgreement'
// import privacyPolicy from '@/components/login/privacyPolicy'
// import personApprove from '@/components/login/personApprove'

const project = resolve => require(['@/components/project'], resolve)
const addProject = resolve => require(['@/components/project/add_project'], resolve)
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
    
  ]
}

export default myProjectconfig
