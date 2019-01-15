<template>
  <div class="goods-info-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="3000" :speed="300">
            <mt-swipe-item v-for="(item,i) in list" :key="i">
              <img :src="item.src" alt>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品名称 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>¥{{ goodsInfo.market_price }}</del>&nbsp;&nbsp;
            销售价:
            <span>¥{{ goodsInfo.sell_price }}</span>
          </p>
          <!-- 商品购买数量 -->
          <div class="buy-count">
            <div>购买数量:</div>
            <div class="num-box">
              <input type="button" value="-" @click="buyCount--" :disabled="buyCount <= 1">
              <input type="text" v-model="buyCount">
              <input
                type="button"
                value="+"
                @click="buyCount++"
                :disabled="buyCount >= goodsInfo.stock_quantity"
              >
            </div>
          </div>
          <!-- 按钮 -->
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{ goodsInfo.goods_no }}</p>
          <p>库存情况: {{ goodsInfo.stock_quantity }}件</p>
          <p>上架时间: {{ goodsInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyCount: 1,
      id: this.$route.params.id,
      list: [],
      goodsInfo: {}
    };
  },
  created() {
    this.getCarousel();
    this.getGoodsInfo();
  },
  methods: {
    //获取商品的图文介绍数据---轮播图
    getCarousel() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    },
    //获取商品详情
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        this.goodsInfo = result.body.message[0];
      });
    },
    //获取图文介绍
    getDesc(id) {
      //点击使用编程式导航跳转到图文介绍页面
      this.$router.push({ name: "goodsDesc", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.goods-info-container {
  overflow: hidden; //盒子塌陷
  background-color: yellowgreen;
  .mint-swipe {
    height: 200px;
    text-align: center;
    img {
      height: 100%;
    }
  }
  .price {
    span {
      color: red;
      font-size: 16px;
      font-weight: 700;
    }
  }
  .buy-count {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .num-box {
      display: inline-block;
      width: 220px;
      height: 35px;
      margin-left: 22px;
      input[type="text"] {
        width: 55px;
        height: 33px;
        text-align: center;
        padding: 0;
        margin-bottom: 0;
      }
      input[type="button"] {
        width: 44px;
        height: 33px;
        background-color: rgb(209, 204, 204);
      }
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
}
</style>
