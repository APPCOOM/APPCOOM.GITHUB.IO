<template>
  <div class="fors">
    <!-- 空状态背景图 -->
    <!-- 自定义背景图 -->
    <!-- <van-empty
      class="custom-image"
      image="http://localhost:8080/img/kgwc.c97c4c01.svg"
      description="暂无商品，去添加点什么吧"
    /> -->
    
    <!-- 原始背景图 -->
    <van-empty
      class="custom-image"
      image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      description="暂无商品，去添加点什么吧"
    />
    <!-- 为你推荐 -->
    <div class="you">
      <van-divider
        :style="{ color: '#282828', borderColor: '#999999', padding: '0 35px' }"
      >
        为你推荐
      </van-divider>
    </div>
    <!-- 为你推荐商品列表 -->
    <div class="below">
      <div class="below1" v-for="be in other" :key="be.id">
        <div class="belowl4">
          <div class="below2">
            <img :src="be.image" />
          </div>
          <div class="below3">
            <p>{{ be.store_name }}</p>
            <span>¥{{ be.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      other: [],
    };
  },
  created() {
    // console.log(this.$store.state.token);
    // 推荐列表数据
    this.axios
      .get("/product/hot?page=1&limit=20", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        console.log("666", re);
        this.other = re;
      });
  },
  props: ["data"],
};
</script>
<style lang="less" scoped>
.fors {
  width: 100%;
  height: 100%;
  .custom-image.van-empty {
    background: #ffffff;
    padding: 10px 0px 0px 0px;
    margin-top: 10px;
  }
  .you {
    width: 100%;
    height: 68px;
    background: #ffffff;
    .van-divider {
      margin: 0;
      line-height: 68px;
    }
  }
  .below {
    width: 100%;
    height: 100%;
    background: #ffffff;
    // 下面三句代码是数据排列成一行两列的,放在包裹这个功能的最大那个盒子里面
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .below1 {
      width: 167.5px;
      height: 214px;
      flex: 1;
      margin-left: 10px;
      margin-bottom: 15px;
      .below2 {
        img {
          width: 167.5px;
          height: 167.5px;
          border-radius: 5px;
        }
      }
      .below3 {
        width: 167.5px;
        height: 46.5px;
        font-size: 14px;
        position: relative;
        p {
          color: #282828;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 10px;
        }
        span {
          position: absolute;
          margin-top: 3px;
          color: #fc4141;
        }
      }
    }
  }
}
</style>