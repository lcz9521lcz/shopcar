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
              <!-- 购物车小球半场动画 -->
              <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
              </transition>
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
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
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
        <mt-button type="danger" size="large" plain @click="goGoodsComments(id)">商品评论</mt-button>
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
      goodsInfo: {},
      ballFlag: false
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
    },
    //商品评论
    goGoodsComments(id) {
      this.$router.push({ name: "goodsComments", params: { id } });
    },
    // 添加购物车
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      // 拼接出一个要保存到store中car数组的商品信息对象
      let goodsInfo = {
        id: this.id,
        count: this.buyCount,
        price: this.goodsInfo.sell_price,
        selected: true
      };
      // 调用store中的mutations来将商品加入购物车
      this.$store.commit("addToCar", goodsInfo);
    },
    // 小球半场动画
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      // console.log(ballPosition, badgePosition);
      // 动态获取小球横向纵向需要位移的距离
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      // console.log(xDist, yDist);
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
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
  .mui-card {
    overflow: visible;
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
      position: relative;
      .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 9px;
        left: 68px;
        z-index: 99;
      }
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
