import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// import "amfe-flexible/index"
import 'amfe-flexible'
import 'amfe-flexible/index.js'
import './assets/css/font-awesome.css'
import 'reset-css'
import Vant from 'vant'//引入所有的vant组件
// import {Tabbar,TabbarItem,Search,Icon,Swipe,SwipeItem,Grid,GridItem,NoticeBar,
//   Tab,Tabs,Form,Field,Button,Dialog,Toast,Card,GoodsAction,GoodsActionIcon,GoodsActionButton,Sku
// } from 'vant';//按需引人所需的组件
import 'vant/lib/index.css'//引入vant组件所需要的CSS文件
Vue.config.productionTip = false
Vue.use(Vant);//全局注册所有组件
// Vue.use(Tabbar);//全局注册按需引入的组件
//Vue.use(TabbarItem);//全局注册按需引入的组件
// Vue.use(Tabbar).use(TabbarItem).use(Search).use(Icon);
// Vue.use(Swipe).use(SwipeItem);
// Vue.use(Grid).use(GridItem).use(NoticeBar);
// Vue.use(Tab).use(Tabs);
// Vue.use(Form).use(Field).use(Button);
// Vue.use(Dialog).use(Toast).use(Card);
// Vue.use(GoodsAction);
// Vue.use(GoodsActionButton);
// Vue.use(GoodsActionIcon).use(Sku);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
