<<<<<<< HEAD
const project = resolve => require(['@/components/project'], resolve)
const information = resolve => require(['@/components/project/information'], resolve)
const informationIndex = resolve => require(['@/components/project/information/informationIndex'], resolve)
const xiangmu_edit = resolve => require(['@/components/project/information/xiangmu_edit'], resolve)
const xiangmu_add = resolve => require(['@/components/project/information/xiangmu_add'], resolve)

const projectConfig = {
  path: '/static/webstatic',
  component: project,
  children: [
    {
      path: '/static/webstatic/chatroom/xiangmu_info.html',
      component: information,
      children:[
        {
          path: '',
          component: informationIndex
        },
        {
            path: '/static/webstatic/chatroom/xiangmu_edit.html',
            component: xiangmu_edit
        },
        {
          path: '/static/webstatic/chatroom/xiangmu_add.html',
          component: xiangmu_add
        },
      ],
    },
  ]
}

export default projectConfig
 
=======
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
>>>>>>> 10cb3164ed602cce6dc55c36b5c88fc872754c2d
