<template>
  <div class="photo-list-container">
    <!-- 顶部滑动条区域 -->
    <div class="mui-slider">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            v-for="(item,index) in cates"
            :key="item.id"
            :class="{'mui-control-item':true,'mui-active': index == 0}"
            @click="getPhotoListByCateId(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <li v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" alt>
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-content">{{ item.zhaiyao }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      cates: [], //所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这时候的DOM元素是最新的
    //初始化scroll控件：
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    //获取所有的分类信息
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    // 根据分类Id，获取图片列表
    getPhotoListByCateId(cateId) {
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.photo-list-container {
  .photo-list {
    list-style: none;
    margin: 0;
    padding: 8px;
    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;
        .info-title {
          font-size: 14px;
        }
        .info-content {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
