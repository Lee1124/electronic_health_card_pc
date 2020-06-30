<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">{{$store.state.settings.title}}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">记住我</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading||loading2"
          size="medium"
          type="primary"
          style="width:100%;"
          class="loginBtn"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading&&!loading2">登 录</span>
          <span v-if="loading">登 录 中...</span>
          <span v-if="loading2">正在跳转,请稍等...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showLoginFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <!-- <span>⋅</span> -->
      <!-- <a href="http://www.beian.miit.gov.cn" target="_blank">{{ $store.state.settings.caseNumber }}</a> -->
    </div>
  </div>
</template>

<script>
import { notify } from "@/utils/index";
import { encrypt } from "@/utils/rsaEncrypt";
import Config from "@/settings";
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import "@/utils/gt"; //登录滑块验证模块
export default {
  name: "Login",
  data() {
    return {
      cookiePass: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      },
      getCodeImgSuccess: true, //获取滑块验证的状态成功或失败
      loading: false,
      loading2: false,
      redirect: undefined,
      handleArr1: [],
      handleArr2: []
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(data => {
        initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !data.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: "bind" // 产品形式，包括：float，popup
          },
          captchaObj => {
            captchaObj
              .onReady(() => {
                this.getCodeImgSuccess = true;
                this.handleArr1.forEach(item => {
                  item.fn.call(this, captchaObj);
                });
                this.handleArr2 = [captchaObj];
              })
              .onSuccess(() => {
                var result = captchaObj.getValidate();
                //验证成功后就进行登录
                this.loginReq(result);
              })
              .onError(() => {
                //your code
                this.loading = false;
              });
          }
        );
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? "" : password;
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ""
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.showCodeImg();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showCodeImg() {
      //如果网络出问题没初始化到图形验证码则重新初始化
      if (!this.getCodeImgSuccess) this.getCode();
      this.handleArr2.forEach(item => {
        this.showImgCodeReq(item);
      });
      if (this.handleArr2.length === 0)
        this.handleArr1 = [{ fn: this.showImgCodeReq }];
    },
    showImgCodeReq(captchaObj) {
      captchaObj.verify(); //显示验证码
    },
    loginReq(data) {
      this.loading = true;
      const user = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        rememberMe: this.loginForm.rememberMe
      };
      // console.log(user.password !== this.cookiePass,user.password,this.cookiePass)
      if (
        user.password !== this.cookiePass &&
        this.$store.state.settings.encryption
      ) {
        user.password = encrypt(user.password);
      }
      if (user.rememberMe) {
        Cookies.set("username", user.username, {
          expires: Config.passCookieExpires
        });
        Cookies.set("password", user.password, {
          expires: Config.passCookieExpires
        });
        Cookies.set("rememberMe", user.rememberMe, {
          expires: Config.passCookieExpires
        });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      this.$store
        .dispatch("login", user)
        .then(res => {
          if (res.status != 0) {
            notify(res.msg, "error", "失败");
            this.loading = false;
          } else {
            this.loading = false;
            this.loading2 = true;
            this.$router.push({ path: this.redirect || "/" });
          }
        })
        .catch(() => {
          this.loading = false;
          this.getCode();
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url("../assets/images/bg.jpg");
  // background-size: cover;
  background: #1d76bb;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: rgba($color: #fff, $alpha: .98);
  width: 350px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  float: right;
  height: 38px;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
