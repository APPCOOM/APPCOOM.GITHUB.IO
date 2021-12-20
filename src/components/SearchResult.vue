<template>
  <div>
    <loading v-if="result.length == 0"></loading>
    <music-list
      @play="$emit('play', $event)"
      :keywords="keywords"
      :songlist="result"
      v-else
    ></music-list>
    <loading v-if="isloading"></loading>
    <div class="loadingmore" @click="getMore">
      {{ isMore ? "没有更多了" : "已经到底了，没有更多了..." }}
    </div>
  </div>
</template>
<script>
// import MusicList from '@/components/MusicList.vue'
// import MusicList from './MusicList.vue';
export default {
  props: {
    keywords: String,
  },
  data() {
    return {
      result: [],
      page: 1, //记录分页页数
      limit: 20, //记录每一页显示条数
      isloading: false, //记录是否正在加载数据
      isMore: true, //记录是否有更多数据
    };
  },
  created() {
    this.axios
      .get(`/search?keywords=${this.keywords}&type=100`)
      .then((result) => {
        console.log("最佳匹配歌手==>", result);
      });
    //limit表示每页显示多少条offset表示下一页开始取数据位置
    //每一页20条 第一页：limit=20 offset=0 第二页：limit=20 offset=20
    //第三页 limit=20 offset=40
    this.getResult();
  },
  methods: {
    async getResult() {
      let offset = (this.page - 1) * this.limit;
      //    搜索
      await this.axios
        .get(
          `/cloudsearch?keywords=${this.keywords}&limit=${this.limit}&offset=${offset}`
        )
        .then((result) => {
          if (result.songCount == 0) {
            this.isloading = false;
            this.isMore = false;
            return;
          }
          let re = result.songs.map((v) => {
            v.song = {
              privilege: v.privilege,
              artists: v.ar,
              album: v.al,
            };
            return v;
          });
          //把每一次加载出来的结果合并在一起
          this.result = this.result.concat(re);
          this.isloading = true;
        });
    },
    getMore() {
      console.log("777777");
      this.$router.push({ name: "Home" });
      this.isloading = true;
      this.page++;
      this.getResult();
    },
  },
  components: {
    // MusicList
  },
};
</script>
<style lang="less" scoped>
// .loadingmore{

// }
</style>