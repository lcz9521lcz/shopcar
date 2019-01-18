export default {
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
}
