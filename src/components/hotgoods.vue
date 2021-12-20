<template>
<div class="hotgoods">
 <div class="sp2" v-for="item in data" :key="item.id">
      <div>
        <img class="sp3" :src="item.image" />
      </div>
      <div class="sp4">
        <h5 class="sp5">{{ item.store_name }}</h5>
        <h5 class="ps8">
          促销价：<i class="fa fa-jpy" aria-hidden="true"></i>{{ item.price }}
        </h5>
        <strike class="ps6">
          日常价：<i class="fa fa-jpy" aria-hidden="true"></i>{{ item.ot_price }}
        </strike>
        <span class="ps7">仅剩：{{ item.stock }}{{ item.unit_name }}</span>
      </div>
    </div>
</div>
   
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    props:['data']
}
</script>
<style lang="less" scoped>

</style>