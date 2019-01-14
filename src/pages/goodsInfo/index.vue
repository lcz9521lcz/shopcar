<template>
  <div class="goods-info-container">
    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="3000" :speed="300">
            <mt-swipe-item>1</mt-swipe-item>
            <mt-swipe-item>2</mt-swipe-item>
            <mt-swipe-item>3</mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 商品名称 -->
    <div class="mui-card">
      <div class="mui-card-header">商品名称</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>¥800</del>&nbsp;&nbsp;
            销售价:
            <span>¥600</span>
          </p>
          <!-- 商品购买数量 -->
          <div class="buy-count">
            <div>购买数量:</div>
            <div class="num-box">
              <input type="button" value="-">
              <input type="text" v-model="buyCount">
              <input type="button" value="+">
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
          <p>商品货号: lhlhlkh</p>
          <p>库存情况: 200件</p>
          <p>上架时间: 6465464</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyCount: 1
    };
  }
};
</script>

<style lang="less" scoped>
.goods-info-container {
  overflow: hidden;
  background-color: yellowgreen;
  .mint-swipe {
    height: 200px;
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
