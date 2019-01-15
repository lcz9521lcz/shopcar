import Vue from 'vue'
import Router from 'vue-router'

import homeContainer from '../pages/home'
import memberContainer from '../pages/member'
import shopcarContainer from '../pages/shopcar'
import searchContainer from '../pages/search'
import newsListContainer from '../pages/newsList'
import newsInfoContainer from '../pages/newsInfo'
import photoListContainer from '../pages/photoList'
import photoInfoContainer from '../pages/photoInfo'
import goodsListContainer from '../pages/goodsList'
import goodsInfoContainer from '../pages/goodsInfo'
import goodsDescContainer from '../pages/goodsDesc'

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
    },
    {
      path: '/home/photoInfo/:id',
      component: photoInfoContainer
    },
    {
      path: '/home/goodsList',
      component: goodsListContainer
    },
    {
      name: 'goodsInfo',
      path: '/home/goodsInfo/:id',
      component: goodsInfoContainer
    },
    {
      name: 'goodsDesc',
      path: '/home/goodsDesc/:id',
      component: goodsDescContainer
    }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类,默认的类叫做router-link-active
})
