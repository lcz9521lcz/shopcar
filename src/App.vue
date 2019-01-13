<template>
  <div class="app-container">
    <!-- 顶部 -->
    <mt-header fixed title="九重天"></mt-header>

    <!-- 底部导航 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

    <!-- 内容渲染区域 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .mint-header {
    z-index: 99;
  }
  .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
    .mui-icon {
      top: 3px;
      width: 24px;
      height: 24px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .mui-tab-label {
      font-size: 11px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

// 组件切换之间的动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>

