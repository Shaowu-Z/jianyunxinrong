import Vue from 'vue'
import Router from 'vue-router'
import work from './work'
import market from './market'
import myHome from './myHome'
import contacts from './contacts'
import login from './login'
import project from './project'
import roomSetting from './roomSetting'
// import laowu from './laowu'
// const work = resolve => require(['./work'], resolve)
// const market = resolve => require(['./market'], resolve)
// const myHome = resolve => require(['./myHome'], resolve)
// const contacts = resolve => require(['./contacts'], resolve)
// const login = resolve => require(['./login'], resolve)
// const notice = resolve => require(['./notice'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/static/webstatic/register/login.html'
    },
    work,
    market,
    myHome,
    contacts,
    login,
    roomSetting,
    project,
    roomSetting
    // laowu
  ]
})
