<template>
  <div class="category">
    <!-- 头部搜索 -->
    <van-search
      shape="round"
      @focus="$router.push('/search')"
      placeholder="搜索商品"
    ></van-search>

    <van-tabs class="categorys" scrollspy>
      <van-tab
        v-for="(cate, index) in categorys"
        :title="cate.cate_name"
        :key="index"
      >
        <!-- div是默认插槽 -->
        <div class="top_cate">
          <h2>
            <span>{{ cate.cate_name }}</span>
          </h2>
          <ul class="child_cate">
            <!-- 循环子分类 -->
            <router-link
              tag="li"

              :to="'/products'"
              v-for="(c, i) in cate.children"
              :key="i"
            >
              <img :src="c.pic" />
              <h3>{{ c.cate_name }}</h3>
            </router-link>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categorys: [],
    };
  },
  created() {
    this.axios.get("/category").then((result) => {
      // console.log("商城", result);
      this.categorys = result;
    });
  },
};
</script>
<style lang="less" >
.van-search {
  position: sticky;
  top: 0px;
  left: 0px;
  z-index: 5;
  background: #fff;
}
.categorys {
  padding: 0px;
  .van-tabs__wrap {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 90px;
    margin-top: 54px;
    height: 100vh;
    .van-tabs__nav {
      display: block;
      background: #f7f7f7;
      padding: 0px;
      .van-tab {
        padding: 0px;
        line-height: 40px;
      }
      .van-tab--active {
        color: red;
        border-left: 3px solid red;
        background: #fff;
      }
    }
  }
  .van-tabs__content {
    padding-left: 90px;
  }
  .top_cate {
    text-align: center;
    h2 {
      font-size: 14px;
      line-height: 45px;
      height: 45px;
      font-weight: bold;
      position: relative;
      text-align: center;
      padding: 10px;

      &::before {
        content: "";
        position: absolute;
        width: 70%;
        border-top: 1px solid #999;
        left: 50%;
        top: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        background: #fff;
        // color:#333;
        // font-weight: 700;
        left: 50%;
        top: 50%;
        padding: 0px 15px;
        z-index: 2;
        margin-bottom: 50px;
        transform: translate(-50%, -50%);
      }
    }
    h3 {
      font-weight: normal;
      font-size: 12px;
      margin: 15px;
    }
    .child_cate {
      display: flex;
      flex-wrap: wrap;

      li {
        flex: 33%;

        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>