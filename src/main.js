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


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
