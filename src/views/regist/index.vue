<template>
  <div class="cantainer">
    <div id="back">
      <!-- <div id="titel">
    <h2>欢 迎 登 陆 图 书 管 理 系 统</h2>
</div> -->
    </div>

    <div class="about">
      <div class="login">
        <h2>注 册</h2>
      </div>
      <div style="margin: 20px" id="text">
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          ref="ruleForm"
          status-icon
          :rules="rules"
          :model="ruleForm"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model.number="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密   码 :" prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              show-password
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
    <el-input placeholder="请输入密码" type="password" show-password v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
        </el-form>
      </div>
      <div class="btn1">
        <el-button
          type="success"
          size="small"
          round
          style="min-width: 100px"
          @click="submitForm1(ruleForm)"
          >提 交</el-button
        >
      </div>
      <div class="btn2">
        <el-button
          type="info"
          size="small"
          round
          style="min-width: 100px"
          @click="resetForm('ruleForm')"
          >重 置</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      ruleForm: {
        username: "",
        password: "",
        checkPass:""
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm1(a) {
      this.$axios.post("http://127.0.0.1:7001/api/user", a).then((res) => {
        //执行动作
        console.log(res);
        if (res.data.data.code == 200) {
          this.$message.success({ message: "注册完成", center: true });
          // this.showDialog = false;
          console.log(res.data.data);
        } else {
          this.$message.error({ message: "注册失败", center: true });
        }
        // this.dialogFormVisible = false;
        this.$router.push("/");
      });
    },
    // ======================================================
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('提交成功！');
    //       this.$router.push("/login");
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.cantainer {
  height: 100%;
  background-size: 100% 100%;
}
/* #titel{
    text-align: center;
    position: absolute;
    left: 30%;
    top: 20%;
} */
.about {
  width: 300px;
  height: 325px;
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
/* .btn{
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 200px;
} */
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
  left: -80px;
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
.el-form-item {
  margin-bottom: 10px;
}
</style>
