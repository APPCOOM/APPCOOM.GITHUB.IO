<template>
  <div class="search animate__animated animate__fadeInRight">
    <div class="search-box">
      <i class="fa fa-search" aria-hidden="true"></i>
      <input
        placeholder="搜索商品"
        v-model="keywords"
        @keyup.enter="search"
        ref="searchboxws"
      />
      <i class="fa fa-times-circle" v-show="showdel" @click="clearWord"></i>
      <span @click="a(keywords)">搜索</span>
    </div>

    <hr />
    <!-- 搜索里面的动态组件切换,往组件component里面注入数据keyword是，属性数据会被所有在这里渲染的组件接收 -->
    <component
      :is="showComponent"
      :keywords="keywords"
      @changekeyword="changekeyword"
      @play="$emit('play', $event)"
    ></component>
    <!-- <Product></Product> -->
    <div class="sp2" v-for="(item, index) in store" :key="index">
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
    <!-- <div class="str" v-if="store">
      <img :src="store.image">
    </div> -->
  </div>
</template>
<script>
import SearchHot from "@/components/SearchHot.vue";
import SearchSug from "@/components/SearchSug.vue";
import SearchResult from "@/components/SearchResult.vue";
// import Product from "@/components/Product.vue";

export default {
  name: "Search",
  data() {
    return {
      showComponent: SearchHot,
      keywords: "",
      showdel: false,
      value: "",
      store: [],
    };
  },
  created() {},
  mounted() {
    this.$refs.searchboxws.focus(); //让搜索获取焦点
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //进入路由完成.渲染染成后执行next的回调函数
      // console.log('next---------')
      //$nextTick将回调函数延迟到下次DOM更新循坏之后执行。
      vm.$nextTick(() => {
        vm.$refs.searchboxws.focus(); //让搜索获取焦点
      });
    });
  },
  methods: {
    a(value) {
      if (value === "") {
        return;
      }
      this.axios({
        url: "http://47.115.51.185/api/products",
        method: "get",
        params: {
          keywords: value,
          limit: 100,
        },
      })
        .then((res) => {
          this.store = [];
          // console.log(res);
          for (let i = 0; i < res.length; i++) {
            if (res[i].store_name.indexOf(value) !== -1) {
              // console.log(res[i]);
              this.store.push(res[i]);
            }
          }
          console.log(this.store);
          if (this.store.length === 0) {
            return this.$toast("该产品不存在");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearWord() {
      this.keywords = "";
      this.showdel = false;
      this.showComponent = SearchHot;
    },
    search() {
      // this.showComponent = SearchResult;
      console.log(11111);
    },
    changekeyword(event) {
      //点击搜索提示，改变搜索关键字，并显示搜索结果组件
      this.showdel = true;
      this.keywords = event;
      this.showComponent = SearchResult;
    },
    inputting() {
      //事件监听输入框，如果输入的关键字为空就显示热搜SearchHot，否则就显示搜索提示SearchSug
      if (this.keywords == "") {
        this.showComponent = SearchHot;
      } else {
        this.showdel = true;
        this.showComponent = SearchSug;
      }
    },
  },
  components: {
    SearchHot,
    SearchSug,
    SearchResult,
    // Product,
  },
  // watch: {
  //     keywords(newValue){
  //         if(newValue==""||newValue.length==0){
  //             this.showComponent=SearchHot;
  //         }else{
  //             this.showComponent=SearchSug;
  //         }
  //     }
  // }
};
</script>
<style lang="less" scoped>
.search-box {
  width: 250px;
  margin: 15px 10px;
  background-color: #f7f7f7;
  border-radius: 19px;
  padding: 5px 30px;
  position: relative;
  // border-bottom: 1px solid #ebecec;
  i {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #c9c9c9;
    font-size: 16px;
    &.fa-search {
      left: 12px;
    }
    &.fa-times-circle {
      right: 12px;
    }
  }
  input {
    width: 100%;
    height: 25px;
    font-size: 14px;
    // color: #c9c9c9;
    background-color: transparent;
    border: none;
    outline: none;
    color: #333;
  }
  span {
    position: fixed;
    right: 13px;
    top: 26.5px;
    font-size: 15px;
    color: #282828;
  }
}
.search {
  hr {
    height: 0px;
    border: none;
    border-bottom: 1px solid #ebecec;
  }
}
</style>