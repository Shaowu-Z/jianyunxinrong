import login from '@/components/login'
import loginIndex from '@/components/login/loginIndex'
import register from '@/components/login/register'
import backpwd from '@/components/login/backpwd'
import serviceAgreement from '@/components/login/serviceAgreement'
import privacyPolicy from '@/components/login/privacyPolicy'
import personApprove from '@/components/login/personApprove'

const loginConfig = {
  path: '/login',
  component: login,
  children: [
    {
      path: '',
      component: loginIndex
    },
    {
      path: 'register',
      component: register,
    },
    {
      path: 'serviceAgreement',
      component: serviceAgreement,
    },
    {
      path: 'privacyPolicy',
      component: privacyPolicy,
    },
    {
      path: 'backpwd',
      component: backpwd
    },
    {
      path: 'personApprove',
      component: personApprove,
    },
  ]
}

export default loginConfig
