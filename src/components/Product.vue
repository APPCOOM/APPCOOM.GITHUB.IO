<template>
  <div>
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
  </div>
</template>
<script>
export default {
    name:'Product',
  data() {
    return {
      value: "",
    };
  },
  methods: {
    a(value) {
      if ((value === "")) {
        return;
      }
      this.axios({
        url: "http://47.115.51.185/api/products",
        method: "get",
        params: {
          keywords: value,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>