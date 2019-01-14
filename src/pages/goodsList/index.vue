<template>
  <div class="goods-list-container">
    <div class="goods-item" v-for="item in list" :key="item.id">
      <img :src="item.img_url" alt>
      <h3 class="title">{{ item.title }}</h3>
      <div class="info">
        <p class="price">
          <span class="now">¥ {{ item.sell_price }}</span>
          <span class="old">¥ {{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1,
      list: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("api/getgoods?pageindex" + this.pageindex).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list-container {
  padding: 8px;
  background-color: rgb(39, 180, 199);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    margin: 4px 0;
    padding: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 0 8px #ccc;
    img {
      width: 100%;
      min-height: 176px;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #ccc;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          font-size: 14px;
          color: red;
          font-weight: 700;
          margin-right: 20px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          color: #999;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
