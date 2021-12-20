<template>
  <div>
    <input type="text" v-model="value" />
    <button @click="a(value)">提交</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    a(value) {
      if ((value = "")) {
        return;
      }
      this.axios({
        url: "http://music.eleuu.com/search",
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