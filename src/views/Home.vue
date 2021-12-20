<template>
  <div class="home">
    <!-- @focus相当于点击跳转 -->
    <van-search
      shape="round"
      show-action
      @focus="$router.push('/Search')"
      placeholder="搜索商品"
    >
      <!-- 搜索框外面左边图标 -->

      <template v-slot:left>
        <!-- <img class="zb" src="../assets/hksc1.png" /> -->
        <img class="zb" src="../assets/hksc2.png" />
        <!-- <img class="zb" src="../assets/hksc.png" /> -->
        <!-- <img class="zb" src="../assets/dd.svg" /> -->
      </template>
      <!-- 搜索框外面右边图标 -->
      <template v-slot:action>
        <router-link :to="'/category'">
          <img class="yb" src="..//assets/list.svg" />
        </router-link>
      </template>
    </van-search>
    <!-- 头部轮播图 -->
    <van-swipe autoplay="3000" @change="changeBannber">
      <van-swipe-item v-for="ba in banner" :key="ba.id">
        <router-link :to="ba.url" tag="div" class="item">
          <img :src="ba.pic" />
        </router-link>
      </van-swipe-item>
      <template v-slot:indicator>
        <ul class="indicator">
          <li
            v-for="i in banner.length"
            :key="i"
            :class="{ currentItem: i - 1 == index }"
          >
            {{ i }}
          </li>
        </ul>
      </template>
    </van-swipe>
    <van-grid v-if="result" :border="true">
      <van-grid-item
        v-for="item in result.menus"
        :key="item.id"
        :icon="item.pic"
        :text="item.name"
        :url="item.url"
      >
      </van-grid-item>
    </van-grid>
    <!-- 通知栏 -->
    <van-notice-bar
      v-if="result"
      class="scroll-notice"
      background="#fff"
      :scrollable="false"
    >
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="2000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in result.roll" :key="item.id">
          <div class="scrollitem">
            <span>{{ item.info }}</span>
            <!-- <i class="fa fa-angle-right"></i> -->
            <van-icon name="arrow" />
          </div>
        </van-swipe-item>
      </van-swipe>
      <template #left-icon>
        <img
          width="100"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAcCAYAAACj6tvkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzVEMDQxOUYxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzVEMDQxOUUxRjhDMTFFOUIwQkJCMEMyMkY3MzdBQUQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
        />
      </template>
    </van-notice-bar>
    <!-- 快速选择 -->
    <template>
      <div class="one">
        <span class="two">快速选择</span>
        <div class="three">
          <router-link tag="div" :to="'/category'"
            ><span>更多<van-icon name="arrow" /></span
          ></router-link>
        </div>
      </div>
    </template>
    <!-- 快速选择列表 -->
    <template>
      <router-link tag="div" :to="'/quickselection'">
        <van-grid class="good">
          <div class="goods">
            <van-grid-item
              v-for="word in choice"
              :key="word.id"
              :text="word.cate_name"
            >
              <template #icon>
                <img :src="word.pic" />
              </template>
            </van-grid-item>
          </div>
        </van-grid>
      </router-link>
      <hr />
    </template>
    <!-- 精品推荐 -->
    <div class="one">
      <span class="two">精品推荐</span>
      <div class="three">
        <router-link tag="div" to="/boutique">
          <span>更多<van-icon name="arrow" /></span>
        </router-link>
      </div>
    </div>
    <!-- 精品推荐轮播图 -->
    <div class="rood">
      <router-link tag="div" to="/boutique">
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
      </router-link>
    </div>
    <!-- 轮播图下面商品 -->

    <div class="sp2" v-for="item in apple" :key="item.id">
      <div>
        <img class="sp3" :src="item.image" />
      </div>
      <div class="sp4">
        <h5 class="sp5">{{ item.store_name }}</h5>
        <h5 class="sp8">
          <i class="fa fa-jpy" aria-hidden="true"></i>{{ item.price }}
        </h5>
        <span class="sp6"
          ><i class="fa fa-jpy" aria-hidden="true"></i>{{ item.vip_price }}
          <img src="../assets/vip.png" />
        </span>
        <span class="sp7">已售{{ item.sales }}{{ item.unit_name }}</span>
        <van-icon class="sp10" name="cart-circle-o" />
      </div>
    </div>
    <!-- 热门榜单 -->
    <div class="box">
      <div class="rmbd">
        <div class="rmbd1">
          <span class="rmbd2">热门榜单</span>
          <span class="rmbd4">根据销量、搜索、好评等综合得出</span>
          <div class="rmbd3">
            <router-link tag="div" to="/toplist">
              <span>更多<van-icon name="arrow" /></span>
            </router-link>
          </div>
        </div>
        <!-- 三个热销榜单 -->
        <div class="rxbd">
          <div class="rxbd1" v-for="rm in toplist" :key="rm.id">
            <img :src="rm.image" />
            <p>{{ rm.store_name }}</p>
            <span>
              <i class="fa fa-jpy" aria-hidden="true"></i>{{ rm.price }}</span
            >
          </div>
        </div>

        <!-- 首发新品列表 -->
      </div>
    </div>
    <div class="box1">
      <!-- 首发新品 -->
      <div class="one">
        <span class="two">首发新品</span>
        <span class="new">NEW~</span>
        <div class="three">
          <router-link tag="div" to="/firstnewproduct">
            <span>更多<van-icon name="arrow" /></span>
          </router-link>
        </div>
      </div>
      <!-- 首发新品列表 -->
      <template>
        <van-grid class="Starting">
          <div class="Startings">
            <van-grid-item
              v-for="(word, index) in newproducts"
              :key="index"
              :text="word.store_name"
            >
              <template #icon>
                <img :src="word.image" />
                <h4>¥{{ word.price }}</h4>
              </template>
            </van-grid-item>
          </div>
        </van-grid>
        <hr />
      </template>
    </div>
    <!-- 促销单品 -->
    <template>
      <div class="one">
        <span class="two">促销单品</span>
        <div class="three">
          <router-link tag="div" :to="'/promotionalitems'"
            ><span>更多<van-icon name="arrow" /></span
          ></router-link>
        </div>
      </div>
    </template>
    <!-- 促销单品列表 -->
    <hot-goods :data="promotion"></hot-goods>
    <!-- <div>
      <img src="../assets/kgwc.svg" alt="">
    </div> -->
  </div>
</template>
<script>
import hotgoods from "../components/hotgoods.vue";
export default {
  name: "Home",
  data() {
    return {
      index: 0,
      banner: [],
      result: null,
      choice: [],
      recommend: [],
      apple: [],
      toplist: [],
      newproducts: [],
      promotion: [],
    };
  },
  created() {
    this.axios.get("/index").then((re) => {
      // console.log(re);
      this.banner = re.banner;
      this.result = re;
      this.choice = re.info.fastList;
      this.recommend = re.info.bastBanner;
      this.apple = re.info.bastList;
      this.toplist = re.likeInfo;
      this.newproducts = re.info.firstList;
      this.promotion = re.benefit;
    });
  },
  methods: {
    changeBannber(index) {
      this.index = index;
    },
  },
  components: {
    "hot-goods": hotgoods,
  },
};
</script>
<style lang="less">
.box {
  height: 210px;
}
.box1 {
  height: 235px;
}
.zb {
  width: 40px;
  height: 35px;
  margin-left: -6px;
  margin-right: 6px;
}
.yb {
  width: 28px;
  height: 28px;
  margin-bottom: -9px;
}
.item {
  img {
    width: 100%;
    height: 200px;
    display: block;
  }
}
.indicator {
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
      background: rgba(255, 255, 255, 0.5);
    }
  }
}
.notice-swipe {
  line-height: 40px;
  height: 40px;
}

.scroll-notice {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 0px 10px #eee;
  .van-notice-bar__content.van-ellipsis {
    width: 100%;
  }
  .scrollitem {
    padding-left: 20px;
    color: #333;
    display: flex;
    align-items: center;
    span {
      flex: 1;
    }
    i {
      width: 10px;
    }
  }
}
.one {
  width: 100%;
  display: flex;
  height: 45.5px;
  .two {
    color: #282828;
    font-size: 15px;
    font-weight: bold;
    position: relative;
    line-height: 45.5px;
    margin-left: 16px;
  }
  .three {
    display: flex;
    font-size: 15px;
    color: #333;
    font-weight: 400;
    position: absolute;
    line-height: 45.5px;
    right: 16px;
  }
}
.good {
  width: 96%;
  height: 180px;
}
.goods {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding-top: 30px;

  .van-grid-item__content {
    width: 80px;
    height: 100px;
    margin-left: 20px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .van-grid-item__text {
    color: #222222;
    font-weight: 550;
    font-size: 14.5px;
    padding: 10px 0px;
    width: 90px;
    text-align: center;
    border-bottom: 2px solid #32e182;
  }
}
hr {
  height: 1px;
  margin: 3px 15px 5px 15px;
  background-color: #e5e2e2;
  border: none;
}
.rood {
  height: 180px;
  .item1 {
    img {
      width: 94%;
      height: 150px;
      display: block;
      margin: 0px 12px 0px 12px;
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
    .ps8 {
      font-size: 12px;
      color: #ffffff;
      margin-top: 35px;
      background-image: linear-gradient(90deg, #ff6248 0, #ff3e1e);
      border-radius: 0.24rem 0.03rem 0.24rem 0.03rem;
      width: 106px;
      height: 23px;
      line-height: 23px;
      padding: 0 0.18rem;
      background-color: red;
      // font-size: 0.2rem;
      color: #fff;
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
    .ps6 {
      font-size: 12px;
      color: #999999;
      margin-top: 10px;
    }
    .sp7 {
      font-size: 12px;
      font-weight: 400;
      color: #aaa;
      margin-left: 15px;
    }
    .ps7 {
      position: absolute;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      right: 0;
      bottom: 20px;
      text-align: left;
    }
  }
}
.rmbd {
  width: 100%;
  height: 108px;
  background-image: url("../assets/tbh.png");
  background-size: 100%;
  .rmbd1 {
    width: 100%;
    display: flex;
    height: 45.5px;
    .rmbd2 {
      color: #ffffff;
      font-size: 16px;
      font-weight: bold;
      position: relative;
      line-height: 45.5px;
      margin-left: 16px;
    }
    .rmbd3 {
      display: flex;
      font-size: 13px;
      color: #ffffff;
      font-weight: 400;
      position: absolute;
      line-height: 45.5px;
      right: 16px;
    }
    .rmbd4 {
      font-size: 11px;
      color: #ffffff;
      margin-left: 15px;
      margin-top: 18px;
    }
  }
}
.rxbd {
  width: 345px;
  height: 165px;
  background-color: white;
  border-radius: 0.3rem;
  display: flex;
  margin: 0 auto;
  // 下面这两句是边缘阴影，毛边
  justify-content: space-around;
  -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
  .rxbd1 {
    // margin: 5px;
    flex: 1;
    width: 100px;
    height: 150px;
    padding-top: 10px;
    img {
      display: block;
      margin: 0 auto;
      width: 90px;
      height: 90px;
      border-radius: 10px;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      color: #282828;
      margin-top: 10px;
    }
    span {
      font-size: 14px;
      color: #fc4141;
      font-weight: 700;
      margin-left: 5px;
    }
  }
}
.new {
  margin-left: 6px;
  margin-top: 14.1px;
  font-weight: bolder;
  font-size: 12px;
  color: #fc4141;
}
.Starting {
  width: 96%;
  height: 180px;
}

.Startings {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;

  img {
    width: 120px;
    height: 120px;
  }
  h4 {
    position: absolute;
    bottom: -42px;
    left: 30px;
    font-weight: 600;
    font-size: 13px;
    color: #fc4141;
  }
  .van-grid-item__text {
    color: #333333;
    font-size: 14px;
    padding: 5px 0px;
    width: 108px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .van-grid-item__content {
    margin-top: -15px;
  }
}
hr {
  height: 1px;
  margin: 3px 15px 5px 15px;
  background-color: #eeeeee;
  border: none;
}
</style>
