<template>
  <div class="comment-container">
    <h3>发表评论</h3>

    <hr>

    <!-- 文本域 -->
    <textarea placeholder="请输入要BB的内容(最多吐槽99字)" maxlength="99" v-model="msg"></textarea>

    <!-- 按钮 -->
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <!-- 评论内容 -->
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户: {{ item.user_name }}&nbsp;&nbsp;
          发表时间: {{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-content">{{ item.content }}</div>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      msg: "", //评论内容
      pageindex: 1, //默认展示第一页数据
      comments: [] //存储获取到的评论数据
    };
  },
  props: ["id"], //父组件传值id
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 点击获取更多评论需要用到数组拼接
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论数据失败!");
          }
        });
    },
    getMore() {
      //点击加载更多
      this.pageindex++;
      this.getComments();
    },
    postComment() {
      //校验输入内容是否为空
      if (!this.msg.trim()) {
        return Toast("请输入内容!");
      }
      this.$http
        .post("api/postcomment/" + this.id, {
          conten: this.msg.trim()
        })
        .then(result => {
          if (result.body.status === 0) {
            //拼接出一个评论对象
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.comment-container {
  h3 {
    font-size: 18px;
    color: turquoise;
    text-align: center;
  }
  textarea {
    font-size: 14px;
    height: 88px;
    margin: 0;
  }
  .cmt-list {
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 33px;
        background-color: #ccc;
      }
      .cmt-content {
        line-height: 33px;
        text-indent: 2em; //文本缩进;
      }
    }
  }
}
</style>
