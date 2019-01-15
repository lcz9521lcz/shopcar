<template>
  <div class="goods-desc-container">
    <h3 class="title">{{ list.title }}</h3>

    <hr>

    <div class="content" v-html="list.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      list: {}
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="less">
.goods-desc-container {
  padding: 5px;
  .title {
    text-align: center;
    font-size: 16px;
    margin: 13px 0;
    color: skyblue;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>

