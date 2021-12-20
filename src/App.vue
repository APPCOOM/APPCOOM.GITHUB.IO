<template>
  <div id="app">
    <!-- 使用vant组件van-开头 -->
    <!-- :fixed="true"导航栏固定在底部，false在顶部，默认在底部-->
    <van-tabbar v-if="!$route.meta.hideNav" z-index="999" :fixed="true" route active-color="red" inactive-color="gray">
      <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="contact">个人中心</van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">
#app{
  padding-bottom: 50px;
}
</style>
