<template>
  <div class="news-list-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/' + item.id">
          <img :src="item.img_url" class="mui-media-object mui-pull-left">
          <div class="mui-media-body">
            <h3 class="mui-ellipsis">{{ item.title }}</h3>
            <p>
              <span>发表时间:{{ item.add_time | dateFormat }}</span>
              <span>点击: {{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          this.newsList = result.body.message;
        } else {
          Toast("数据获取失败!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.news-list-container {
  .mui-table-view {
    .mui-media-body {
      h3 {
        font-size: 14px;
      }
      p {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #226aff;
      }
    }
  }
}
</style>

