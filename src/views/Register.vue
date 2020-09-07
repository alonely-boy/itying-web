<template>
  <div class="container" v-if="isLogin">
    <div class="content"></div>
    <div class="btn">
      <el-button size="mini" type="success" @click="login">立即登录</el-button>
    </div>

    <div class="icon">
      <img
        draggable="false"
        src="@/assets/img/IT.png"
        width="100%"
        height="100%s"
        style="borderRadius:50%"
        alt
      />
    </div>
    <el-form
      :model="registerForm"
      :rules="rules"
      ref="ruleForm"
      class="registerForm"
      label-width="80px"
    >
      <el-form-item prop="userName" label="用户名">
        <el-input
          prefix-icon="el-icon-user"
          v-model.trim="registerForm.userName"
          placeholder="用户名同昵称，支持中文，长度为2-10位"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="设置密码">
        <el-input
          prefix-icon="el-icon-lock"
          v-model.trim="registerForm.password"
          placeholder="密码长度为6-15位"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="password2" label="确认密码">
        <el-input
          prefix-icon="el-icon-lock"
          v-model.trim="registerForm.password2"
          placeholder="确认密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input
          type="text"
          id="code"
          v-model="registerForm.code"
          class="code"
          placeholder="请输入您的验证码"
        />
        <div class="login-code" @click="refreshCode">
          <!--验证码组件-->
          <sIdentify :identifyCode="identifyCode"></sIdentify>
        </div>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button v-preventClick type="primary" @click="register" :disabled="judge">注册</el-button>
        <el-button type="info" @click="$refs.ruleForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from "@/components/public/SIdentify.vue";
export default {
  name: "Register",
  components: {
    SIdentify,
  },
  data() {
    var checkpassword2 = (rule, value, cb) => {
      if (value !== this.registerForm.password) {
        cb(new Error("两次输入的密码不一致"));
      } else {
        return cb();
      }
    };
    var checkcode = (rule, value, cb) => {
      if (value !== this.identifyCode) {
        cb(new Error("验证码错误"));
      } else {
        return cb();
      }
    };
    var checkuserName = async (rule, value, cb) => {
      const { data } = await this.$http.get(
        `/register${this.registerForm.userName}`
      );
      if (data !== "ok") {
        cb(new Error("用户名已被注册了"));
      } else {
        return cb();
      }
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      isLogin: true,
      judge: false,
      registerForm: {
        userName: "",
        password: "",
        password2: "",
        code: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名长度为2-10个字符",
            trigger: "blur",
          },
          {
            validator: checkuserName,
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码长度为6-15个字符", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkpassword2, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4个字符", trigger: "blur" },
          { validator: checkcode, trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.refreshCode();
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
    if (sessionStorage.userInfo) {
      let { userName, password } = JSON.parse(sessionStorage.userInfo);
      this.loginForm.userName = userName;
      this.loginForm.password = password;
    }
  },
  methods: {
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode);
    },
    login() {
      this.$router.push(`/login`);
    },
    register() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        const { data } = await this.$http.post(`/register`, this.registerForm);
        if (data === "ok") {
          this.$message.success("注册成功");
          sessionStorage.userInfo = JSON.stringify(this.registerForm);
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login-code {
  display: inline-block;
  transform: translate(0, 10px);
}
.code {
  // height: 30px;
  width: 200px;
  display: inline-block;
}
.content {
  position: absolute;
  top: -170px;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-image: url(~@/assets/img/艺术欢迎.png);
  background-size: cover;
}
.container {
  .btn {
    position: absolute;
    top: -25px;
    right: 0;
    height: 100px;
  }
  height: 400px;
  width: 550px;
  position: absolute;
  background: #ccc;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  // background-image: url(~@/assets/img/樱花背景.jpg);
  // background-size: cover;
  .registerForm {
    position: absolute;
    bottom: 0;
    color: black;
    width: 100%;
    padding: 0 40px 0 0;
  }
  .icon {
    position: absolute;
    width: 130px;
    height: 130px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    padding: 5px;
    background: white;
    left: 50%;
  }
}
@media screen and(max-width:700px){
  .container{
    width: 100% !important;
    top: 55vh;
    height: 450px;
  }
  .content{
    display: none;
  }
}
</style>
