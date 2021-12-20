<template>
  <div class="home">
    <van-button @click="showaddCart=true">显示</van-button>
    <van-sku
      v-model="showaddCart"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      @add-cart="onAddCartClicked"

      />
 <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服"  />
  <van-goods-action-icon icon="cart-o" text="购物车" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button
    type="danger"
    text="加入购物车"
    @click="addCart"
  />
</van-goods-action>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Good',
  data(){
    return {
      showaddCart:false,
      sku: {
        //初始化demo数据
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '颜色', //属性名称
              k_id: '1',//属性的ID值 唯一 在当前产品里面唯一
              v: [//颜色属性可用值列表
                {
                  id: '30349',//属性ID
                  name: '红色',//属性名
                  //属性图片，默认只有第一行属性有
                  imgUrl:'https://b.yzcdn.cn/vant/sku/shoes-1.png'
                },
                {
                  id: '1215',
                  name: '白色',
                  imgUrl:'https://b.yzcdn.cn/vant/sku/shoes-1.png'
                }
              ],
              k_s: 's1',//属性的k_s值 对应list里面组合键名
            },
            {
              k: '尺寸',
              k_id: '2',
              v: [
                {
                  id: '1193',
                  name: '1'
                },
                {
                  id: '1194',
                  name: '2'
                }
              ],
              k_s: 's2',
              count: 2
            }
          ],
        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
        list: [
          {
            id: 2259,
            price: 120, //价格
            s1: '1215', //对应属性列表里面 k_s 等于s1的属性id值
            s2: '1193',
            stock_num: 20, //库存 
            goods_id: 946755 //产品ID
          },
          {
            id: 2260,
            price: 110,
            s1: '1215',
            s2: '1194',
            stock_num: 2, 
            goods_id: 946755
          },
          {
            id: 2257,
            price: 130,
            s1: '30349',
            s2: '1193',
            stock_num: 40,
            goods_id: 946755
          },
          {
            id: 2258,
            price: 100,
            s1: '30349',
            s2: '1194',
            stock_num: 50,
            goods_id: 946755
          }
        ],
        price:'5.00',
        stock_num: 227, // 商品总库存
        none_sku: false,  // 是否无规格商品 
        hide_stock: false  // 是否隐藏剩余库存
      },
      goods:{},
      goodsId:1
    }
  },
  components: {

  },
  destroyed(){
    // this.$store.commit('showFoot')
  },
  created(){
    // this.$store.commit('hiddenFooter')
    //获取商品数据 62是商品ID
    this.axios.get('/api/product/detail/62').then(d=>{
      let arrs=d.data.data.productAttr;
      let listValue=d.data.data.productValue;
      //sku 数据转换
      let id=1;
      let idobj={};
      let ssk=1;
      this.sku.list=[];
      //获取产品属性里面第一个值默认图片
      this.goods.picture=listValue[Object.keys(listValue)[0]].image;
      //循环产品属性 组装购物车 属性tree
      this.sku.tree=arrs.map((atr,ads)=>{
          let va=atr.attr_value.map((at,index)=>{
            id++;
            idobj[at.attr]=id;
            let attrs= {
              id: id,
              name: at.attr
            }
            if(ads<1){
              attrs.imgUrl=listValue[Object.keys(listValue)[index]].image
            }
            return attrs;
          })
          var ks='s'+ssk;
          ssk++;
          return {
                k: atr.attr_name,
                k_id: atr.attr_name,
                v: va,
                k_s:ks
          }
      });
      //循环产品属性组合,组装sku 列表
      for(let key in listValue){
        let v=listValue[key];
        let keys=key.split(',');
        this.sku.list.push({
            id: v.unique,
            price: v.price, //价格
            s1: idobj[keys[0]],
            s2: idobj[keys[1]],
            stock_num: v.stock, //库存 
            goods_id: v.product_id,
            imgUrl:v.image   
        });
      }
      
    });
  },
  methods:{
    onAddCartClicked(skuData){
         //加入购物车 拿出里面ID 请求 addcart接口
        console.log(skuData)
    },
    addCart(){
      this.showaddCart=true;
    }
  }
}
</script>
<style lang="css">
</style>