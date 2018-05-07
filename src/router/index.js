import Vue from 'vue'
import Router from 'vue-router'
import work from './work'
import news from './news'
import market from './market'
import myHome from './myHome'
import contacts from './contacts'
import login from './login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/static/webstatic/register/login.html'
    },
    work,
    news,
    market,
    myHome,
    contacts,
    login,
  ]
})
