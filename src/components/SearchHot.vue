<template>
  <div class="words">
    <div class="hotword">
      <p>热门搜索</p>
      <span
        v-for="word in hotWords"
        :key="word"
        @click="$emit('changekeyword', word)"
        >{{ word }}</span
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotWords: [],
    };
  },
  created() {
    this.axios.get("/search/keyword").then((result) => {
      this.hotWords = result;
    });
  },
};
</script>
<style lang="less" scoped>
.hotword {
  overflow: hidden;
  margin-left: 15px;
  margin-top: 15px;
  p {
    font-size: 14px;
    color: #999999;
  }
  span {
    float: left;
    line-height: 15px;
    padding: 5px 10px;
    margin: 15px 5px 5px 0px;
    border-radius: 14px;
    border: 1px solid #1a73e8;
    font-size: 13px;
    color: #1a73e8;
  }
}
</style>