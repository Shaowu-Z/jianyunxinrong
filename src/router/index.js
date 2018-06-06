import Vue from 'vue'
import Router from 'vue-router'
import work from './work'
import market from './market'
import myHome from './myHome'
import contacts from './contacts'
import login from './login'
<<<<<<< HEAD
import project from './project'
=======
import roomSetting from './roomSetting'
>>>>>>> 50fe096b5e4bc0dddc68c69acea67d1644f5719c
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
<<<<<<< HEAD
    project,
=======
    roomSetting
>>>>>>> 50fe096b5e4bc0dddc68c69acea67d1644f5719c
  ]
})
