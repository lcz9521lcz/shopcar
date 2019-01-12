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
        <a href="#">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">Home</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-email">
            <span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">Email</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">Chat</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">location</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">Search</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">Phone</div>
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
}
</style>
