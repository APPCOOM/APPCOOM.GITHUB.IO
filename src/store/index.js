import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import _axios from '@/plugins/axios.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    userInfo:null
  },
  getters:{
    logintoken(state){
      //判断如果vuex的state里面数据为空那就去cookie取一次
      if(state.token==null || state.token.length<1){
        state.token=Cookies.get("token");
        if(!state.token){
          state.token=localStorage.getItem("token");
        }
      }
      return state.token;
    },
    loginuser(state){
      if(!state.userInfo || !state.userInfo.id){
        console.log("1111",state);
        state.userInfo=JSON.parse(localStorage.getItem("user_info"));
      }
      return state.userInfo;
    }
  },
  mutations: {
    saveToken(state,payload){
      state.token=payload;
      //把token存储在cookie
      Cookies.set("token",payload,{expires:1});
      localStorage.setItem("token",payload);
    },
    loginout(state){
      state.token=null;
      Cookies.remove("token");
      localStorage.removeItem("token")
    },
    saveuserInfo(state,payload){
      state.userInfo=payload;
      localStorage.setItem("user_info",JSON.stringify(payload));
    }
  },
  actions: {
    getuserInfo(context){
      _axios.get("/userinfo",{
        headers:{
          "Authori-zation":"Bearer "+context.state.token
        }
      }).then(result=>{
        context.commit("saveuserInfo",result);
      })
    }
  },
  //Model数据模型层  module模块
  modules: {
  }
})
