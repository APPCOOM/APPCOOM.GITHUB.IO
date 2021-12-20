<template>
  <div class="ddxx">
    <!-- 头部红色区域 -->
    <div class="information">
      <div class="information1" v-if="order">
        <p>订单信息</p>
        <span class="information2">
          <span>累计订单：{{ order.order_count }}</span>
          <span class="information3">总消费：{{ order.sum_price }}</span>
        </span>
      </div>
      <div class="information4">
        <img src="../assets/11111.png" />
      </div>
    </div>
    <!-- 5个功能 -->
    <div class="go">
      <div>
        待付款
        <p>{{ order.unpaid_count }}</p>
      </div>
      <div>
        待发货
        <p>{{ order.unshipped_count }}</p>
      </div>
      <div>
        待收货
        <p>{{ order.received_count }}</p>
      </div>
      <div>
        待评价
        <p>{{ order.evaluated_count }}</p>
      </div>
      <div>
        已完成
        <p>{{ order.complete_count }}</p>
      </div>
    </div>
    <!-- 订单详情 -->
    <div class="details">
      <!-- 订单详情头部 -->
      <div class="payment" v-for="pr in product" :key="pr.id">
        <span class="payment1">{{ pr._add_time }}</span>
        <span class="payment2">{{ pr._status._title }}</span>
      </div>
      <!-- 商品 -->
      <div class="commodity">
        <div v-if="commodity" class="commodity1">
          <!-- 图片 -->
          <div class="commodity5">
            <img :src="commodity[0].cartInfo[0].productInfo.image" />
          </div>
          <!-- 描述 -->
          <div class="commodity2">
            <span>{{ commodity[0].cartInfo[0].productInfo.store_name }}</span>
          </div>
          <div class="commodit3">
            <!-- 单价 -->
            <p>¥{{ commodity[0].cartInfo[0].productInfo.price }}</p>
            <!-- 数量 -->
            <span>x{{ commodity[0].cartInfo[0].cart_num }}</span>
          </div>
        </div>
        <div class="commodity4">
          <!-- 一共多少件 -->
          <span class="commodity6"
            >共{{ commodity[0].cartInfo[0].productInfo.temp_id }}
            {{
              commodity[0].cartInfo[0].productInfo.unit_name
            }}商品，总金额</span
          >
          <!-- 总价 -->
          <span class="commodity7">¥{{ commodity[0].total_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: [],
      product: [],
      commodity: [],
    };
  },
  // 拿到订单信息头部的数据 token
  created() {
    // console.log(this.$store.state.token);
    this.axios
      .get("/order/data", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        // console.log("444", re);
        this.order = re;
      });
    // 拿到订单信息详情的数据 token
    this.axios
      .get("/order/list?page=1&limit=20&type=0", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        // 头部数据
        console.log("555", re);
        this.product = re;
        // this.commodity = re[0].cartInfo[0].productInfo;
        this.commodity.push(re[0]);
        console.log("666", this.commodity);
        // 商品数据接口
        // this.commodity= re.cartInfo;
      });
  },
};
</script>
<style lang="less" scoped>
.ddxx {
  // position: relative;
  .information {
    width: 100%;
    height: 130px;
    background: #e93323;
    position: relative;
    .information1 {
      position: absolute;
      margin-top: 28px;
      margin-left: 15px;
      width: 210px;
      height: 51px;
      p {
        font-size: 17px;
        color: #ffffff;
        font-weight: 700;
      }
      .information2 {
        width: 100%;
        span {
          width: 100%;
          color: hsla(0, 0%, 100%, 0.8);
          font-size: 0.26rem;
          font-family: guildfordprobook\5;
        }
        .information3 {
          margin-left: 6px;
        }
      }
    }
    .information4 {
      img {
        position: absolute;
        width: 61px;
        height: 54.5px;
        right: 15px;
        top: 20px;
      }
    }
  }
  .go {
    // 下面这两句是边缘阴影，毛边
    justify-content: space-around;
    -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
    position: absolute;
    margin-top: -35px;
    width: 345px;
    height: 70px;
    background: #ffffff;
    display: flex;
    left: 50%;
    margin-left: -172.5px;
    border-radius: 3px;
    div {
      flex: 1;
      font-size: 13px;
      color: #282828;
      text-align: center;
      margin-top: 15px;
      p {
        margin-top: 8px;
      }
    }
  }
  .details {
    // 下面这两句是边缘阴影，毛边
    justify-content: space-around;
    -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
    margin-top: 45px;
    position: absolute;
    width: 345px;
    height: 215px;
    left: 50%;
    margin-left: -172.5px;
    .payment {
      width: 100%;
      height: 42px;
      border: 1px solid #eeeeee;
      position: relative;
      .payment1 {
        font-size: 14px;
        color: #282828;
        line-height: 42px;
        margin-left: 15px;
      }
      .payment2 {
        position: absolute;
        font-size: 14px;
        color: #fc4141;
        line-height: 42px;
        right: 15px;
      }
    }

    .commodity {
      position: relative;
      width: 100%;
      height: 60px;
      .commodity1 {
        margin: 11px 0px 0px;
        padding: 0px 15px;
        display: flex;
        width: 100%;
        height: 60px;
        .commodity5 {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .commodity2 {
          span {
            font-size: 14px;
            width: 153px;
            height: 29px;
            color: #282828;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-left: 10px;
          }
        }
        .commodit3 {
          position: absolute;
          font-size: 14px;
          color: #797777;
          right: 14px;
        }
      }
      .commodity4 {
        position: absolute;
        right: 15px;
        .commodity6 {
          font-size: 0.26rem;
          color: #282828;
          text-align: right;
          margin: 0.27rem 0 0 0.3rem;
          padding: 0 0.3rem 0.3rem 0;
          border-bottom: 0.01rem solid #eee;
        }
        .commodity7 {
          margin-left: -5px;
          color: #fc4141 !important;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>