<template>
  <div>
    <!-- 头部轮播图 -->
    <van-swipe class="boutique1" autoplay="4100" @change="onChange">
      <van-swipe-item class="boutique2" v-for="bo in boutique" :key="bo.id">
        <img :src="bo.img" />
      </van-swipe-item>
      <template v-slot:indicator>
        <ul class="boutique3">
          <li
            v-for="i in boutique.length"
            :key="i"
            :class="{ currentItem: i - 1 == index }"
          >
            {{ i }}
          </li>
        </ul>
      </template>
    </van-swipe>
    <!-- 精品推荐标题 -->
    <div class="jptj">
      <van-divider
        :style="{ color: '#282828', borderColor: '#cccccc', padding: '0 16px' }"
      >
        <div class="jptj2">
          <img src="../assets/Bookmark-3.svg"><span>首发新品</span>
        </div>
      </van-divider>
    </div>
    <!-- 商品列表 -->
    <div class="sp2" v-for="ap in apple" :key="ap.id">
      <div>
        <img class="sp3" :src="ap.image"/>
      </div>
      <div class="sp4">
        <h5 class="sp5">{{ ap.store_name }}</h5>
        <h5 class="sp8">
          <i class="fa fa-jpy" aria-hidden="true"></i>{{ ap.price }}
        </h5>
        <span class="sp6"
          ><i class="fa fa-jpy" aria-hidden="true"></i>{{ ap.vip_price }}
          <img src="../assets/vip.png" />
        </span>
        <span class="sp7">已售{{ ap.sales }}{{ ap.unit_name }}</span>
        <van-icon class="sp10" name="cart-circle-o" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Boutique",
  data() {
    return {
      boutique: [],
      apple: [],
    };
  },
  created() {
    this.axios.get("/groom/list/3?page=1&limit=20").then((re) => {
      // console.log("数据", re);
      this.boutique = re.banner;
      this.apple = re.list
    });
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.boutique1 {
  width: 100%;
  height: 145px;
  .boutique2 {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .boutique3 {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
    li {
      text-indent: -9999px;
      margin-right: 5px;
      border-radius: 50%;
      width: 10px;
      height: 2px;
    //   background: rgba(255, 255, 255, 1);
        background-color: #f70a0a;
    //   &.currentItem {
    //   }
    }
  }
}
.jptj {
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  .van-divider {
    margin: 0;
  }
  .jptj2 {
    text-align: center;
    line-height: 60px;
    position: relative;
    img{
        position: absolute;
        margin-top: 20px;
        margin-left: -10px;
    }
    span {
      margin-left: 15px;
      font-size: 16px;
    }
  }
}
.sp2 {
  width: 100vw;
  display: flex;
  .sp3 {
    width: 100px;
    height: 100px;
    padding: 10px;
  }
  .sp4 {
    margin-left: 5px;
    width: 230px;
    height: 130px;
    position: relative;
    border-bottom: 1px solid #eeeeee;
    .sp10 {
      position: absolute;
      font-size: 28px;
      color: red;
      right: -5px;
    }
    h5 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14.88px;
      margin-top: 15px;
    }
    .sp8 {
      font-size: 19px;
      color: #fc4141;
      font-weight: bold;
      margin-top: 35px;
    }
    .sp6 {
      font-size: 13.248px;
      font-weight: bold;
      img {
        width: 25px;
        height: 11px;
        margin-left: 2px;
        border: 0;
        margin-top: 10px;
      }
    }
    .sp7 {
      font-size: 12px;
      font-weight: 400;
      color: #aaa;
      margin-left: 15px;
    }
  }
}
</style>