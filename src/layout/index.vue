<template>
  <div class="container">
    <el-container class="el_container">
        <el-header>
          <div class="text">欢迎使用图书管理系统</div>
          <div class="headPortrait">
            <img src="headPortrait" alt="" />
          </div>
          <div class="sign_out">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#92daf0"
              text-color="#333"
            >
              <el-submenu index="2">
                <template slot="title">张三</template>
                <el-menu-item index="2-1" @click.native="quit"
                  >退出登录</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </div>
        </el-header>
      <el-container>
        <el-aside width="200px">
        <div class="navigation">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                router
                default-active=""
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                 background-color="#b9e3fb"
              >
                <el-menu-item index="/layout" style="padding-left: 45px">
                  <i class="el-icon-menu"></i>
                  <span slot="title">系统首页</span>
                </el-menu-item>
                <el-menu-item index="/lend" style="padding-left: 45px">
                  <i class="el-icon-reading"></i>
                  <span slot="title">图书展示</span>
                </el-menu-item>

                <el-menu-item index="/Return"  style="padding-left:45px">
                <i class="el-icon-menu"></i>
        <span slot="title">归还图书</span>
      </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  quit() {
      this.$router.push("/");
      sessionStorage.removeItem("token"); //获取token值来实现路由导航
      window.location.reload();
    },
    // modifica(){

    // },// 退出登录
  //  quit() {
  //     this.$router.push("/");
  //     // 刷新界面 排除bug
  //     window.location.reload();
  //   },
  // getDetail(row) {
  //     console.log(row);
  //     this.oDetails = row;
  //   },

  },
};
</script>

<style scoped>
.el-header {
  background-color: #92daf0;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #b9e3fb;
  color: #333;
  /* text-align: center; */
  /* line-height: 200px; */
  width: 25px;
}

.el-main {
  background-color: #dceef8;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el_container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.logo {
  background-image: url("../assets/logo_1.png");
  width: 150px;
  height: 200px;
  background-repeat: no-repeat;
  position: relative;
  top: 5px;
  left: 30px;
  margin: 0;
  padding: 0;
}
.headPortrait {
  background-image: url("../assets/head.png");
  background-repeat: no-repeat;
  position: absolute;
  width: 40px;
  height: 40px;
  right: 130px;
  top: 10px;
  border-radius: 50px 50px 50px 50px;
}

.el-container >>> .el-table__header-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 100px;
}
.el-container >>> .el-table__cell {
  padding: 20px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: center;
}

.sign_out {
  width: 130px;
  position: absolute;
  right: 0px;
  padding: 0;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px soli #92daf0;
  color: #303133;
}
.text {
  float: left;
  font-family:  'Times New Roman', Times, serif;
  font-size: 25px;
  user-select: none;
}
</style>
