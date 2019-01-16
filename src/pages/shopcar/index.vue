<template>
  <div class="shopcar-container">
    <!-- 商品列表项区域 -->
    <div class="goods-list">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner cinner">
            <mt-switch></mt-switch>
            <img src="../../assets/menu1.png" alt>
            <div class="info">
              <h3 class="title">标题</h3>
              <div class="content">
                <span class="price">¥ 3000</span>
                <div class="num-box">
                  <input type="button" value="-">
                  <input type="text">
                  <input type="button" value="+">
                </div>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner tinner">
          <div class="total">
            <h3 class="title">总计&nbsp;&nbsp;(不含运费)</h3>
            <p class="content">
              已勾选商品
              <span>10</span> 件,&nbsp;&nbsp;总价&nbsp;¥
              <span>200</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.shopcar-container {
  .goods-list {
    .cinner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 60px;
      }
      .info {
        .title {
          font-size: 15px;
          color: salmon;
        }
        .content {
          display: flex;
          align-items: center;
          // justify-content: space-between;
          .num-box {
            width: 120px;
            height: 35px;
            margin: 0 8px;
            input[type="text"] {
              width: 50px;
              height: 100%;
              margin-bottom: 0;
              padding: 0;
            }
            input[type="button"] {
              width: 30px;
              height: 100%;
              padding: 0;
            }
          }
        }
      }
    }
  }
  .tinner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total {
      .title {
        font-size: 15px;
        color: salmon;
        margin-bottom: 13px;
      }
    }
  }
}
</style>
