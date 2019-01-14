<template>
  <div class="photo-info-container">
    <h3 class="title">{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间: {{photoInfo.add_time | dateFormat }}</span>
      <span>点击: {{photoInfo.click}}次</span>
    </p>

    <hr>

    <!-- 缩略图 -->
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="index"
      >
    </div>

    <!-- 内容 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs(); //获取缩略图数据
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoInfo = result.body.message[0];
        }
      });
    },
    // 获取缩略图数据
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // 循环每个图片数据，补全图片的宽和高
        result.body.message.forEach(item => {
          item.w = 600;
          item.h = 400;
        });
        // 把完整的数据保存到 list 中
        this.list = result.body.message;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.photo-info-container {
  padding: 6px;
  h3 {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: springgreen;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .content {
    font-size: 12px;
    line-height: 33px;
  }
  // 缩略图
  .thumbs {
    img {
      margin: 12px;
      box-shadow: 0 0 6px #999;
    }
  }
}
</style>
