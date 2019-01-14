<template>
  <div class="home-container">
    <!-- 轮播图区域 -->
    <mt-swipe :auto="2000" :speed="300">
      <mt-swipe-item v-for="(item,index) in carousel" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt>
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../assets/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="../../assets/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../assets/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: []
    };
  },
  created() {
    this.getCarousel();
  },
  methods: {
    getCarousel() {
      this.$http.get("api/getlunbo").then(result => {
        if (result.body.status === 0) {
          this.carousel = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  .mint-swipe {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 九宫格样式
  .mui-grid-view {
    background-color: #fff;
    border: 0;
    .mui-table-view-cell {
      border: 0;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
