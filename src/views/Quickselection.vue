<template>
  <div class="quickselection">
    <van-search
      shape="round"
      show-action
      @focus="$router.push('/Search')"
      placeholder="搜索商品"
      background="#E93323"
    >
      <!-- 搜索框外面右边图标 -->
      <template v-slot:action>
        <router-link :to="'/category'">
          <img class="yb" src="..//assets/qrcode.svg" />
        </router-link>
      </template>
    </van-search>
    <!-- 头部菜单 -->
    <div class="menu">
      <ul class="menu1">
        <router-link tag="div" :to="'/category'">
          <li class="menu2">时尚运动</li>
        </router-link>
        <li>
          价格<span
            ><i class="fa fa-caret-up" aria-hidden="true"></i
            ><i class="fa fa-caret-down" aria-hidden="true"></i
          ></span>
        </li>
        <!-- <img src="../assets/jt.png"> 上下箭头-->
        <li>
          销量<span
            ><i class="fa fa-caret-up" aria-hidden="true"></i
            ><i class="fa fa-caret-down" aria-hidden="true"></i
          ></span>
        </li>
        <li>新品</li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="ss1">
      <div class="ss2" v-for="qu in quick" :key="qu.id">
        <div>
          <img class="ss3" :src="qu.image" />
        </div>
        <div class="ss4">
          <h5 class="ss5">{{ qu.store_name }}</h5>
          <h5 class="ss6">
            <i class="fa fa-jpy" aria-hidden="true"></i>{{ qu.price }}
          </h5>
          <span class="ss7"
            ><i class="fa fa-jpy" aria-hidden="true"></i>{{ qu.vip_price }}
            <img src="../assets/vip.png" />
          </span>
          <span class="ss8">已售{{ qu.sales }}{{ qu.unit_name }}件</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quick: [],
    };
  },
  created() {
    this.axios
      .get(
        "http://47.115.51.185/api/products?page=1&limit=8&keyword=&sid=49&news=0&priceOrder=&salesOrder="
      )
      .then((re) => {
        // console.log("数据", re);
        this.quick = re;
      });
  },
};
</script>
<style lang="less" scoped>
.quickselection {
  background-color: #f5f5f5;
}
.menu {
  width: 100%;
  height: 45px;
  background-color: #ffffff;
  // 下面这两句是边缘阴影，毛边
  justify-content: space-around;
  -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
  .menu1 {
    width: 100%;
    height: 45px;
    display: flex;
    .menu2 {
      width: 106.34px;
    }
    li {
      flex: 1;
      float: left;
      font-size: 14px;
      text-align: center;
      line-height: 45px;
      font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial,
        sans-serif, Droid Sans Fallback;
      color: #454545;
      span {
        margin-top: -44px;
        margin-left: 58px;
        display: flex;
        width: 6.86px;
        height: 12px;
        color: #9f9f9f;
        .fa-caret-up {
          font-size: 0.3rem;
          margin-top: 12px;
          margin-left: 5px;
        }
        .fa-caret-down {
          font-size: 0.3rem;
          margin-top: 18px;
          margin-left: -0.6em;
        }
      }
    }
  }
}
.ss1 {
  width: 375px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .ss2 {
    width: 172.5px;
    height: 259px;
    margin: 0 auto;
    margin-top: 10px;
    position: relative;
    img {
      width: 172.5px;
      height: 172.5px;
      border-radius: 5px;
    }
    .ss4 {
      margin-top: -4px;
      position: absolute;
      width: 172.5px;
      height: 86.5px;
      border-radius: 0px 0px 10px 8px;
      background-color: #ffffff;
      // 下面这两句是边缘阴影，毛边
      // justify-content: space-around;
      // -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
      position: absolute;
      .ss5 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        color: #222222;
        margin-top: 15px;
        margin-left: 10px;
      }
      .ss6 {
        font-size: 17px;
        color: #fc4141;
        font-weight: 600;
        margin-top: 5px;
        margin-left: 13px;
      }
      .ss7 {
        font-size: 12px;
        color: #282828;
        font-weight: bold;
        margin-left: 13px;
        img {
          width: 23px;
          height: 10.5px;
          margin: 0px 0px 0px 0px;
        }
      }
      .ss8 {
        position: absolute;
        font-size: 12px;
        font-weight: 400;
        color: #aaa;
        right: 8px;
        bottom: 14px;
      }
    }
  }
}
</style>