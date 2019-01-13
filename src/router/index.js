import Vue from 'vue'
import Router from 'vue-router'

import homeContainer from '../pages/home'
import memberContainer from '../pages/member'
import shopcarContainer from '../pages/shopcar'
import searchContainer from '../pages/search'
import newsListContainer from '../pages/newsList'
import newsInfoContainer from '../pages/newsInfo'
import photoListContainer from '../pages/photoList'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homeContainer
    },
    {
      path: '/member',
      component: memberContainer
    },
    {
      path: '/shopcar',
      component: shopcarContainer
    },
    {
      path: '/search',
      component: searchContainer
    },
    {
      path: '/home/newsList',
      component: newsListContainer
    },
    {
      path: '/home/newsInfo/:id',
      component: newsInfoContainer
    },
    {
      path: '/home/photoList',
      component: photoListContainer
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类,默认的类叫做router-link-active
})
