import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

//导入mui字体图标的css
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入vue-resource请求接口获取数据
import VueResource from 'vue-resource'
//注册---在此之后才可以使用Vue.$http对象
Vue.use(VueResource)

//配置根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

//配置默认的post提交数据类型为传统表单
Vue.http.options.emulateJSON = true

//导入格式化时间包
import moment from 'moment'
//定义全局时间过滤器: dateFormat
Vue.filter('dateFormat', (date, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(pattern)
})

//定义全局组件---评论组件
import comment from './components/common/comment'
//注册定义全局组件,参数1:组件名  参数2:组件对象
Vue.component('comment', comment)

// 图片预览插件---缩略图
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 引入vuex---实现组件之间的通讯
import Vuex from 'vuex'
//注册
Vue.use(Vuex)
// 创建对象---store
const store = new Vuex.Store({
  state: {
    car: JSON.parse(localStorage.getItem('car') || '[]')
  },
  mutations: {
    addToCar(state, goodsInfo) {
      // 添加商品到购物车
      // 如果商品不存在则直接push
      // 如果商品存在则需要对商品的count属性做一些基本的累加操作再存储
      // 假设商品不存在
      let isFound = false
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count += goodsInfo.count
          isFound = true
          return true
        }
      })
      // 循环过后如何判断是否存在该商品
      if (!isFound) { //如果不存在
        state.car.push(goodsInfo)
      }

      // 本地存储---只能存字符串
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 更新购物车信息
    updateCarInfo(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.count = parseInt(goodsInfo.count)
          return true
        }
      })
      // 本地存储变更后数据
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 状态变化
    updateGoodsSelected(state, goodsInfo) {
      state.car.some(item => {
        if (item.id == goodsInfo.id) {
          item.selected = goodsInfo.selected
          return true
        }
      })
      // 本地存储最新数据
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    // 移除商品
    removeGoods(state, id) {
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      // 本地存储最新数据
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    totalCount(state) {
      let totalCount = 0
      state.car.forEach(item => totalCount += item.count)
      return totalCount
    },
    goodsCount(state) {
      let goodsInfo = {}
      state.car.forEach(item => goodsInfo[item.id] = item.count)
      return goodsInfo
    },
    // 商品的数量和总价
    goodsCountAndAmount(state) {
      let countAmount = {
        count: 0,
        amount: 0
      }
      state.car.forEach(item => {
        if (item.selected) {
          countAmount.count += item.count
          countAmount.amount += item.count * item.price
        }
      })
      return countAmount
    },
    // 商品的选中状态
    goodsSelected(state) {
      let goodsSelected = {}
      state.car.forEach(item => {
        goodsSelected[item.id] = item.selected
      })
      return goodsSelected
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
