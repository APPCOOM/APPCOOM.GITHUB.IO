<template>
  <div>
    <!-- 精品推荐轮播图 -->
    <div class="rood">
      <van-swipe autoplay="3000" @change="changeBannber">
        <van-swipe-item v-for="jp in recommend" :key="jp.id" class="item1">
          <img :src="jp.img" />
        </van-swipe-item>
        <template v-slot:indicator>
          <ul class="indicator1">
            <li
              v-for="i in recommend.length"
              :key="i"
              :class="{ currentItem: i - 1 == index }"
            >
              {{ i }}
            </li>
          </ul>
        </template>
      </van-swipe>
    </div>
    <!-- 轮播图下面商品 -->

    <div class="sp2" v-for="ap in apple" :key="ap.id">
      <div>
        <img class="sp3" :src="ap.image" />
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
  data() {
    return {
      recommend: [],
    };
  },
  created() {
    this.axios.get("/index").then((re) => {
      // console.log("数据", re);
      this.recommend = re.info.bastBanner;
    });
  },
  methods: {
    changeBannber(index) {
      this.index = index;
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
.rood {
  height: 160px;
  width:100%;
  .item1 {
    img {
      width: 100%;
      // height: 150px;
      height: 100%;
      display: block;
      // margin: 0px 12px 0px 12px;
      
    }
  }
  .indicator1 {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
    li {
      text-indent: -9999px;
      margin-right: 5px;
      width: 10px;
      height: 2px;
      background: rgba(255, 255, 255, 1);
      &.currentItem {
        // background: rgba(212, 11, 11, 0.5);
        background-color: #fc4141;
      }
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