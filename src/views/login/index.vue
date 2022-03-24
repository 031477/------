<template>
  <div class="cantainer">
    <div id="back"></div>

    <div class="about">
      <div class="login">
        <h2>登 录</h2>
      </div>
      <div style="margin: 20px" id="text">
        <el-form
          :label-position="labelPosition"
          label-width="60px"
          ref="loginFormRef"
        >
          <el-form-item label="用户名:">
            <el-input
              placeholder="请输入用户名"
              v-model="formLabelAlign.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密   码 :">
            <el-input
              placeholder="请输入密码"
              type="password"
              show-password
              v-model="formLabelAlign.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn1">
        <el-button
          type="success"
          size="small"
          round
          style="min-width: 100px"
          @click="toLogin(formLabelAlign)"
          >登 录</el-button
        >
      </div>
      <div class="rem">
        <a href="#" style="color: #696969" @click="toreg()">点击注册</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
        // type: '',
      },
      dialogFormVisible: false,
      form: {
        name: "",
        password: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "60px",
    };
  },
  methods: {
    toreg() {
      this.$router.push("/regist");
    },
    toLogin(aa) {
      this.$axios.post("http://127.0.0.1:7001/api/login", aa).then((res) => {
        console.log(res, "显示");
        sessionStorage.setItem("token", res.data.res._id);
        this.$router.push("/layout");
      });
    },
  },
};
</script>
<style scoped>
.cantainer {
  height: 100%;
  background-size: 100% 100%;
}
.about {
  width: 300px;
  height: 300px;
  background: rgba(236, 242, 255, 0.3);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  border-radius: 15px;
  z-index: 1;
  box-shadow: 0 12px 16px 0 rgb(0, 0, 0, 0.24);
  /* transform:translate(-50%,-50%); */
}
.login {
  text-align: center;
  margin-top: 30px;
  height: 50px;
}
#text {
  text-align: left;
}
.about >>> .el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 40px;
  outline: 0;
  padding: 0 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.about >>> .el-form-item__label {
  text-align: center;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
#back {
  background-color: #74ebd5;
  background-image: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  margin: 0;
  padding: 0;
}
.btn1 {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 200px;
  position: relative;
  right: -80px;
}
.btn2 {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 200px;
  position: relative;
  left: 60px;
  top: -32px;
  color: rgb(157, 169, 194);
}
.rem {
  position: relative;
  left: 30px;
  top: -25px;
  font-size: smaller;
  width: 100px;
}
.rgt {
  position: relative;
  left: 30px;
  top: 20px;
  font-size: smaller;
}
.dialog-footer {
  position: relative;
  top: -30px;
}
</style>
