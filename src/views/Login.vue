<template>
  <div class="container">
    <div class="content"></div>
    <div class="youke">
      <el-button size="mini" type="warning" @click="youke">游客浏览</el-button>
    </div>
    <div class="btn">
      <el-button size="mini" type="success" @click="register">免费注册</el-button>
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
    <el-form :model="loginForm" :rules="rules" ref="ruleForm" class="loginForm">
      <el-form-item prop="userName">
        <el-input prefix-icon="el-icon-user" v-model.trim="loginForm.userName" placeholder="输入昵称/用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model.trim="loginForm.password"
          placeholder="输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" id="code" v-model="loginForm.code" class="code" placeholder="请输入您的验证码" />
        <div class="login-code" @click="refreshCode">
          <!--验证码组件-->
          <sIdentify :identifyCode="identifyCode"></sIdentify>
        </div>
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button v-preventClick type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="$refs.ruleForm.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from "@/components/public/SIdentify.vue";
export default {
  components:{
    SIdentify
  },
  name: "Login",
  data() {
    var checkcode = (rule,value,cb)=>{
      if(value !== this.identifyCode){
        cb(new Error('验证码错误'))
      }else{
        return cb()
      }
    }
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      code: "", //text框输入的验证码
      loginForm: {
        userName: "",
        password: "",
        code:""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "用户名长度为2-15个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "密码长度为6-15个字符", trigger: "blur" },
        ],
        code:[
          {required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4个字符", trigger: "blur" },
          { validator:checkcode, trigger: "blur" },
        ]
      },
    };
  },
  created(){
    this.refreshCode()
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
    youke() {
      if (localStorage.token) {
        this.$confirm("游客登录将清除所有缓存的登录信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            localStorage.clear();
            this.$router.push("/");
          })
          .catch(() => {});
      } else {
        this.$router.push("/");
      }
    },
    register() {
      this.$router.push("/register");
    },
    async login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        try {
          const { data } = await this.$http.post("/login", this.loginForm);
          // console.log(data);
          localStorage.token = data.token;
          localStorage.id = data.user._id;
          localStorage.userAvatar = data.user.avatar;
          this.$router.push("/");
          this.$message.success("登录成功");

        } catch (error) {}
      });
      this.refreshCode()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
.login-code {
	 display: inline-block;
	 transform: translate(0, 10px);
}
 .code {
	 width: 200px;
	 display: inline-block;
}
 .youke {
	 position: absolute;
	 top: -28px;
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
	 height: 370px;
	 width: 450px;
	 position: absolute;
	 background: #ccc;
	 left: 50%;
	 top: 50%;
	 transform: translate(-50%, -50%);
	 border-radius: 5px;
}
 .container .btn {
	 position: absolute;
	 top: -28px;
	 right: 0;
	 height: 100px;
}
 .container .loginForm {
	 position: absolute;
	 bottom: 0;
	 color: black;
	 width: 100%;
	 padding: 0 30px;
}
 .container .icon {
	 user-select: none;
	 position: absolute;
	 width: 130px;
	 height: 130px;
	 transform: translate(-50%, -50%);
	 border-radius: 50%;
	 padding: 5px;
	 background: white;
	 left: 50%;
}
 @media screen and (max-width: 700px) {
	 .container {
		 width: 100% !important;
		 top: 45vh;
	}
	 .content {
		 display: none;
	}
}
 
</style>
