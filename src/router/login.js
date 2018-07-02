// import login from '@/components/login'
// import loginIndex from '@/components/login/loginIndex'
// import register from '@/components/login/register'
// import backpwd from '@/components/login/backpwd'
// import serviceAgreement from '@/components/login/serviceAgreement'
// import privacyPolicy from '@/components/login/privacyPolicy'
// import personApprove from '@/components/login/personApprove'

const login = resolve => require(['@/components/login'], resolve)
const loginIndex = resolve => require(['@/components/login/loginIndex'], resolve)
const register = resolve => require(['@/components/login/register'], resolve)
const backpwd = resolve => require(['@/components/login/backpwd'], resolve)
const resizepwd = resolve => require(['@/components/login/resizepwd'], resolve)
const serviceAgreement = resolve => require(['@/components/login/serviceAgreement'], resolve)
const privacyPolicy = resolve => require(['@/components/login/privacyPolicy'], resolve)
const personApprove = resolve => require(['@/components/login/personApprove'], resolve)

const loginConfig = {
  path: '/static/webstatic/register/login.html',
  component: login,
  children: [
    {
      path: '',
      component: loginIndex
    },
    {
      path: '/register',
      component: register,
    },
    {
      path: '/serviceAgreement',
      component: serviceAgreement,
    },
    {
      path: '/privacyPolicy',
      component: privacyPolicy,
    },
    {
      path: '/backpwd',
      component: backpwd
    },
    {
      path: '/resizepwd',
      component: resizepwd
    },
    {
      path: '/static/webstatic/register/person_approve.html',
      component: personApprove,
    },
  ]
}

export default loginConfig
