<template>
  <div class="login">
    <div class="login-box center">
      <h1>欢迎登录</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        password: "",
        username: "",
      },
      rules: {
        password: [{ validator: this.validatePass, trigger: "blur" }],
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
      },
    };
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码需大于等于6位!"));
      } else {
        callback();
      }
    },
    loginForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          localStorage.setItem("token", "xxxxxx");
          await this.$store.dispatch("getMenuList");
          this.$router.push("/home");
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background-size: cover;
  background-position: center center;
}
.login-box {
  width: 650px;
  height: 320px;
  background: #fff;
  text-align: center;
  padding: 40px 40px 12px 12px;
}

.el-button {
  width: 600px;
}

.el-input {
  width: 600px;
  margin-bottom: 16px;
}

::v-deep .el-input__inner {
  background: #e5e5e5;
}
.el-form-item__label {
  font-size: 20px;
  color: black;
}
</style>
