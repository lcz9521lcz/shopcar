export default {
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
