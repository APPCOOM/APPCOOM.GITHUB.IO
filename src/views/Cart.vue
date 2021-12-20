<template>
  <div class="cart">
    <!-- 头部文字 -->
    <van-row class="cart1">
      <van-col span="8"><van-icon name="passed" />100%正品保证</van-col>
      <van-col span="8"><van-icon name="passed" />所有商品精挑细选</van-col>
      <van-col span="8"><van-icon name="passed" />售后无忧</van-col>
    </van-row>
    <!-- 购物数量 -->
    <div class="cart2" v-if="quantity">
      <span>购物数量</span>
      <span class="cart3">{{ quantity.count }}</span>
    </div>
    <!-- 购物车空状态 -->
    <for-you></for-you>
  </div>
</template>
<script>
import Foryou from "../components/Foryou.vue";
export default {
  name: "Cart",
  data() {
    return {
      quantity: [],
    };
  },
  created() {
    // console.log(this.$store.state.token);
    // 购物车数据接口
    this.axios
      .get("/cart/list", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        console.log("222", re);
      });
    // 购物数量数据接口
    this.axios
      .get("/cart/count", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        // console.log("222", re);
        this.quantity = re;
      });
  },
  components: {
    "for-you": Foryou,
  },
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .van-row {
    text-align: center;
    height: 38px;
    font-size: 12px;
    color: #8c8c8c;
    background: #f5f5f5;
    .van-col {
      margin-top: 13px;
      .van-icon {
        margin-right: 5px;
      }
    }
  }
  .cart2 {
    width: 100%;
    height: 40px;
    background: #ffffff;
    span {
      font-size: 14px;
      color: #282828;
      line-height: 40px;
      margin-left: 15px;
    }
    .cart3 {
      margin-left: 5px;
      color: #fc4141;
    }
  }
}
</style>