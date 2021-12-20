<template>
  <div class="about">
    <!-- 头部 -->
    <div class="head" v-if="member">
      <div class="head1">
        <img class="tx" :src="member.avatar" />
        <span class="head2">{{ member.nickname }}</span
        ><span class="head3">{{ member.vip_name }}</span>
        <span class="head4">ID:{{ member.uid }}</span>
      </div>
      <!-- 设置 -->
      <img class="sz" src="../assets/setup.svg" />
    </div>
    <!-- 下面的功能 -->
    <!-- 外面的盒子 -->
    <div class="heads">
      <!-- 里面的盒子 -->
      <div class="heads1">
        <!-- 我的金额 -->
        <div class="heads2">
          <div>
            我的金额
            <p>{{ loginuser.now_money }}</p>
          </div>
          <div>
            当前佣金
            <p>{{ loginuser.broken_commission }}</p>
          </div>
          <div>
            优惠券
            <p>{{ loginuser.spread_count }}</p>
          </div>
        </div>
        <!-- 我的订单 -->
        <div class="dd">
          <div class="one">
            <span class="two">我的订单</span>
            <div class="three">
              <router-link tag="div" to="/allorders">
                <span>全部订单<van-icon name="arrow" /></span>
              </router-link>
            </div>
          </div>
          <!-- 订单的5个功能 -->
          <div class="gn1">
            <div class="gn2">
              <div class="gn3" v-if="logo">
                <van-badge :content="logo.unpaid_count">
                  <img src="../assets/1.png" />
                </van-badge>
              </div>
              <p>待收款</p>
            </div>
            <div class="gn2" >
              <div class="gn3">
                <van-badge :content="logo.unshipped_count">
                  <img src="../assets/2.png" />
                </van-badge>
              </div>
              <p>待发货</p>
            </div>
            <div class="gn2">
              <div class="gn3">
                  <img src="../assets/3.png" />
              </div>
              <p>待收货</p>
            </div>
            <div class="gn2">
              <div class="gn3">
                  <img src="../assets/4.png" />
              </div>
              <p>待评价</p>
            </div>
            <div class="gn2">
              <div class="gn3">
                <van-badge :content="logo.refund_count">
                  <img src="../assets/5.png" />
                </van-badge>
              </div>
              <p>售后/退款</p>
            </div>
          </div>
        </div>
        <!-- 我的服务 -->
        <div class="service">
          <!-- 头部 -->
          <div class="me"><span>我的服务</span></div>
          <!-- 服务 -->
          <van-grid :border="false" :column-num="4">
            <van-grid-item
              v-for="fw in myservice.routine_my_menus"
              :key="fw.id"
            >
              <van-image :src="fw.pic" />
              <span>{{ fw.name }}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
    <button @click="logout">退出登录</button>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      tred: "",
      member: [],
      myservice: [],
      logo:[],
    };
  },
  methods: {
    ...mapMutations(["loginout"]),
    logout() {
      this.loginout();
      Dialog({
        title: "退出登录",
        message: "退出成功！",
      }).then(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    ...mapGetters(["loginuser"]),
  },
  // 拿到个人账户的数据 token
  created() {
    // console.log(this.$store.state.token);

    this.axios
      .get("/user", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        // console.log("333", re);
        this.member = re;
        this.logo = re.orderStatusNum;
      });

    this.axios
      .get("/menu/user", {
        headers: {
          "Authori-zation": "Bearer " + this.$store.state.token,
        },
      })
      .then((re) => {
        // console.log("444", re);
        this.myservice = re;
      });
  },
};
</script>
<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  position: relative;
  button {
    position: absolute;
    bottom: -470px;
    // 下面两个是居中
    // left: 50%;
    // margin-left: -1.5rem;
    width: 100%;
    height: 38px;
    font-size: 19px;
    background: #ffffff;
    border: none;
    color: #3f3f3f;
    // 下面这两句是边缘阴影，毛边
    justify-content: space-around;
    -webkit-box-shadow: 0 0 0.23rem -0.1rem #aaa;
  }
  .head {
    width: 100%;
    height: 95px;
    background-color: #e93323 !important;
    position: relative;
    .sz {
      position: absolute;
      right: 10px;
      top: 25px;
    }
    .head1 {
      position: absolute;
      width: 295px;
      height: 60px;
      margin-top: 17px;
      margin-left: 15px;
      .tx {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid white;
        line-height: 60px;
      }
      .head2 {
        position: absolute;
        font-size: 16px;
        color: #ffffff;
        margin-top: 10px;
        overflow: hidden;
        margin-left: 15px;
      }
      .head3 {
        position: absolute;
        padding: 0 0.1rem;
        height: 0.38rem;
        background-color: rgba(0, 0, 0, 0.2);
        font-size: 0.2rem;
        border-radius: 0.3rem;
        color: #ffffff;
        margin-left: 50px;
        margin-top: 10px;
      }
      .head4 {
        position: absolute;
        color: hsla(0, 0%, 100%, 0.6);
        font-size: 0.26rem;
        margin-top: 30px;
        margin-left: 16px;
      }
    }
  }
  .heads {
    width: 100%;
    height: 50px;
    background: #e93323;
    border-radius: 0 0 85% 85%;
    margin-top: -1px;
    .heads1 {
      position: absolute;
      width: 355px;
      height: 420px;
      left: 50%;
      margin-left: -177.5px;
      border-radius: 5px;
      // 下面这两句是边缘阴影，毛边
      justify-content: space-around;
      -webkit-box-shadow: 0 0 0.18rem -0.1rem #aaa;
      .heads2 {
        width: 100%;
        height: 70px;
        border-radius: 3px;
        background-color: #ffffff;
        // 下面这两句是边缘阴影，毛边
        justify-content: space-around;
        -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
        display: flex;
        div {
          width: 118.33px;
          flex: 1;
          text-align: center;
          color: #aaaaaa;
          font-size: 13px;
          margin-top: 15px;
        }
        p {
          color: #282828;
          font-size: 18px;
          margin-top: 10px;
        }
      }
      .dd {
        width: 100%;
        height: 130px;
        // 下面这两句是边缘阴影，毛边
        justify-content: space-around;
        -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
        .one {
          margin-top: 10px;
          background: #ffffff;
          width: 100%;
          display: flex;
          height: 44px;
          border-bottom: 1px dashed #eeeeee;
          .two {
            color: #666;
            font-size: 15px;
            position: relative;
            line-height: 44px;
            margin-left: 16px;
          }
          .three {
            display: flex;
            font-size: 13px;
            color: #666;
            font-weight: 400;
            position: absolute;
            line-height: 44px;
            right: 16px;
          }
        }
        .gn1 {
          width: 100%;
          height: 80px;
          display: flex;
          .gn2 {
            width: 71px;
            height: 80px;
            text-align: center;
            .gn3 {
              margin: 0 auto;
              margin-top: 20px;
              top: 20px;
              width: 24.5px;
              height: 21px;
              img {
                width: 24.5px;
                height: 21px;
              }
            }
            p {
              margin-top: 10px;
              color: #454545;
              font-size: 13px;
            }
          }
        }
      }
      .service {
        margin-top: 10px;
        width: 100%;
        height: 140px;
        // 下面这两句是边缘阴影，毛边
        justify-content: space-around;
        -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
        .me {
          width: 100%;
          height: 45px;
          border-bottom: 1px dashed #eeeeee;
          span {
            line-height: 45px;
            margin-left: 15px;
            color: #282828;
            font-size: 15px;
          }
        }
        .van-grid {
          width: 100%;
          height: 100%;
          .van-grid-item {
            margin-top: 15px;
            width: 88.75px;
            height: 51px;
            .van-image {
              width: 26px;
              height: 26px;
            }
            span {
              margin-top: 10px;
              color: #333333;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>