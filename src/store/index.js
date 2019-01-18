import Vue from 'vue'
// 引入vuex---实现组件之间的通讯
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'

//注册
Vue.use(Vuex)

const state = {
  car: JSON.parse(localStorage.getItem('car') || '[]')
}

// 挂载之后暴露此对象
export default new Vuex.Store({
  state,
  mutations,
  getters
})
