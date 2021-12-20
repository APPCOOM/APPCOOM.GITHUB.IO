<template>
  <div class="login">
    <van-tabs>
      <van-tab title="账号登录">
        <van-form @submit="loginByPassword">
          <van-field
            v-model.number="account"
            name="account"
            placeholder="请输入手机号"
            :border="true"
            :rules="[{ required: true, message: '请输入手机号' },
            {pattern:/^1[345678]\d{9}$/,message:'手机格式错误',trigger:'onChange'}
            ]"
          >
          <template #left-icon>
              <i class="fa fa-mobile"></i>
          </template>
          </van-field>
          <!-- van-field rules属性定义验证规则 -->
          <van-field
            v-model="password"
            type="password"
            :border="true"
            name="password"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码',trigger:'onChange' }]"
          >
          <template #left-icon>
              <i class="fa fa-lock"></i>
          </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <van-tab title="快速登录">
        <form class="mobileLogin"></form>
        <van-form @submit="loginBycode">
          <van-field
            v-model="account"
            name="account"
            placeholder="请输入手机号"
            :border="true"
            :rules="[{ required: true, message: '请输入手机号' },
            {pattern:/^1[345678]\d{9}$/,message:'手机格式错误',trigger:'onChange'}
            ]"
          >
          <template #left-icon>
              <i class="fa fa-mobile"></i>
          </template>
          </van-field>
          <!-- van-field rules属性定义验证规则 -->
          <van-field
            v-model="verfycode"
            type="verfycode"
            :border="true"
            name="verfycode"
            placeholder="填写验证码"
            :rules="[{ required: true, message: '填写验证码',trigger:'onChange' }]"
          >
           <template #left-icon>
              <i class="fa fa-lock"></i>
          </template>
          <template #button>
             <van-button size="small" :disabled="isSend" type="primary" @click="sendCode" native-type="button">
               {{!isSend?"发送验证码":counter+"秒之后继续发送"}}
             </van-button>
          </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {mapMutations,mapActions} from "vuex"
export default {
    data () {
        return {
            account:"",
            password:"",
            verfycode:"",
            sendkey:"",
            counter:60,
            isSend:false,//是否可以继续发送 false可以继续发送 true不能继续发送
            timmerID:null,
        };
    },
    created () {
      //第一次进入网页获取页面key 用来发送验证码
      this.axios.get("/verify_code").then(r=>{
        this.sendkey=r.key;
      });
     
    },
    methods: {
      ...mapMutations(["saveToken"]),////映射Mutations函数到当前方法
      ...mapActions(["getuserInfo"]),
      //点击提交表单 参数是一个事件对象，对象里面存储表单数据
      loginByPassword(event){
        // console.log(event);
        this.axios.post("/login",event).then(result=>{
          if(result.status==400){
            this.$dialog.alert({
              title:"登录提示",
              message:result.msg
            });
            
          }else{
            this.saveToken(result.token);//调用vuex的mutations函数
            this.$dialog.alert({
              title:"登录提示",
              message:"登录成功！"
            }).then(()=>{
              this.getuserInfo();
              this.$router.back();
            });
          }
         
        })
      },
      //第一次进入网页的时候需要获取key 用/verify_code
      sendCode(){//发送验证码
      if(!this.account || this.account.length!=11){
        this.$toast("手机号码不能为空且长度为11位");
      }
      this.axios.post("/register/verify",{
        code:"",
        key:this.sendkey,
        phone:this.account,
        type:"login"
      }).then(re=>{
        if(re.status==200){//验证码发送成功
          this.$toast.success(re.msg);
          this.isSend=true;
          this.timmerID=setInterval(()=>{
            if(this.counter==0){
              this.isSend=false;
              clearInterval(this.timmerID)
              return;
            }
            this.counter--;
          },1000);
        }else{
          this.$toast.fail(re.msg);
        }
      })
      },
      loginBycode(event){
        this.axios.post("login/mobile",{
          phone:event.account,
          captcha:event.verfycode,
          spread:null
        }).then(re=>{
          if(re.token){
            this.saveToken(re.token);
            //toast提示的关闭时回调函数 onClose
            this.$toast.success({
              message:"登录成功",
              onClose:()=>{
                this.getuserInfo();
                this.$router.back();
              }
            });
          }else{
            this.$toast.fail(re.msg);
          }
          console.log(re);
        })
      },

    }
};
</script>
<style lang="less" scoped>
.login{
    .fa-mobile{
        font-size: 24px;
        color: #ccc;
    }
    .fa-lock{
        font-size: 18px;
        color: #ccc;
    }
    .van-field{
      &::after{
        border-bottom-color: #bcbfc4;
      }
      .van-cell__value{
        padding-left: 20px;
      }
    }
    .van-button--info{
      background: linear-gradient(90deg,#f35447 0,#ff8e3c);
      border: none;
    }
    .van-button--small{
      padding: 0px 5px;
      border-radius: 20px;
      background-color: #f35446;
      border: none;
      height: 24px;
    }
}
</style>