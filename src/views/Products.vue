<template>
    <div>
        <h1>产品列表</h1>
        <router-link tag="div" :to="{path:'detail',query:{id:item.id}}" v-for="item in productList" :key="item.id">
            <van-card 
            :num="item.stock"
            tag="标签"
            :price="item.price"
            desc="描述信息"
            :title="item.store_name"
            :thumb="item.image"
            ></van-card>
        </router-link>
    </div>
</template>
<script>
export default {
    data () {
        return {
            productList:[]
        }
    },
    created () {
        let sid=this.$route.query.id;
        this.axios.get("/products",{
            params:{
                sid:sid
            }
        }).then(re=>{
            this.productList=re;
        })
    }
}
</script>