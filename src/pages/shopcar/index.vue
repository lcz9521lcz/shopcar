<template>
  <div class="shopcar-container">
    <!-- 商品列表项区域 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner cinner">
            <mt-switch
              v-model="$store.getters.goodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.goodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" alt>
            <div class="info">
              <h3 class="title">{{ item.title }}</h3>
              <div class="content">
                <span class="price">¥ {{ item.sell_price }}</span>
                <div class="num-box">
                  <input type="button" value="-" @click="dec(item.id, i)">
                  <input
                    type="text"
                    v-model="$store.getters.goodsCount[item.id]"
                    ref="goodsCountInp"
                    @change="changeCount(item.id, i)"
                  >
                  <input type="button" value="+" @click="inc(item.id, i)">
                </div>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner tinner">
          <div class="total">
            <h3 class="title">总计&nbsp;&nbsp;(不含运费)</h3>
            <p class="content">
              已勾选商品
              <span>{{ $store.getters.goodsCountAndAmount.count }}</span> 件,&nbsp;&nbsp;总价&nbsp;¥
              <span>{{ $store.getters.goodsCountAndAmount.amount }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    this.getShopcarList();
  },
  methods: {
    getShopcarList() {
      // 先获取到store中所有商品的id,然后拼接出一个用逗号分隔的字符串
      let idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      // 如果购物车中没有商品则直接return返回,不需要请求数据接口否则会报错
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          this.goodsList = result.body.message;
        });
    },
    // 自减
    dec(id, i) {
      // 通过索引锁定当前输入框
      let goodsCountInp = this.$refs.goodsCountInp[i];
      if (goodsCountInp.value <= 1) return;
      goodsCountInp.value--;
      this.changeCount(id, i);
    },
    // 自增
    inc(id, i) {
      let goodsCountInp = this.$refs.goodsCountInp[i];
      goodsCountInp.value++;
      this.changeCount(id, i);
    },
    // 监听购买数量变化
    changeCount(id, i) {
      let goodsCountInp = this.$refs.goodsCountInp[i];
      this.$store.commit("updateCarInfo", { id, count: goodsCountInp.value });
    },
    // 监听状态改变
    selectedChanged(id, selected) {
      this.$store.commit("updateGoodsSelected", { id, selected });
    },
    // 移除商品
    remove(id, i) {
      this.goodsList.splice(i, 1);
      this.$store.commit("removeGoods", id);
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar-container {
  .goods-list {
    .cinner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 60px;
      }
      .info {
        .title {
          font-size: 15px;
          color: salmon;
        }
        .content {
          display: flex;
          align-items: center;
          // justify-content: space-between;
          .num-box {
            width: 120px;
            height: 35px;
            margin: 0 8px;
            input[type="text"] {
              width: 50px;
              height: 100%;
              margin-bottom: 0;
              padding: 0;
              text-align: center;
            }
            input[type="button"] {
              width: 30px;
              height: 100%;
              padding: 0;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .tinner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      .title {
        font-size: 15px;
        color: salmon;
        margin-bottom: 13px;
      }
    }
  }
}
</style>
