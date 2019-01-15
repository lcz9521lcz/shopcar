<template>
  <div class="news-info-container">
    <h3 class="title">{{ newsInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间: {{ newsInfo.add_time | dateFormat }}</span>
      <span>点击{{ newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论区域---引用全局组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        } else {
          Toast("获取新闻失败!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.news-info-container {
  padding: 6px;
  .title {
    text-align: center;
    color: red;
    font-size: 16px;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: #2600ff;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
