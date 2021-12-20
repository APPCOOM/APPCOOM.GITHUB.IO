<template>
    <div class="sugest">
       <h3 @click="$emit('changekeyword',keywords)">搜索"{{keywords}}"</h3>
       <ul>
           <li v-for="s in sugArray" :key="s.id" @click="$emit('changekeyword',s.keyword)">
            <i class="fa fa-search" aria-hidden="true"></i>
            <span>{{s.keyword}}</span>
            </li>
       </ul>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    props:{
        keywords:String
    },
    data () {
        return {
            sugArray:[],
            isSearch:false,
        }
    },
    methods: {
        getSearch:_.debounce(function(value){//调用lodash防抖函数debounce并发起ajax请求
            
            this.isSearch=true;
            //if(!this.isEnd) return;//如果请求没有结束不进去当前请求
            //this.isEnd=false;//改为请求没有结束
            // 搜索建议
            this.axios.get(`/search/suggest?keywords=${value}&type=mobile`)
            .then(result=>{
                // console.log("搜索建议");
                this.isSearch=false;
                if(result.allMatch);
                this.sugArray=result.allMatch;
            });
        },100)
    },
    created () {//组件开始创建的时候执行一次搜索
        this.getSearch(this.keywords);
    },
    watch:{
        keywords(newValue){
            this.getSearch(newValue);
        }
    }
}
</script>
<style lang="less" scoped>
.sugest{
    padding: 10px 10px;
    h3{
        font-size: 14px;
        color: #507daf;
    }
    ul{
        li{
            
            line-height: 45px;
            font-size: 15px;
            color: #333;
            border-bottom: 1px solid #ebecec;
            i{
                color: #ebecec;
            }
            span{
                padding-left: 10px;
            }
            
        }
    }
}
</style>