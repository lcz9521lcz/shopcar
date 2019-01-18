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

// 导入vuex文件
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
