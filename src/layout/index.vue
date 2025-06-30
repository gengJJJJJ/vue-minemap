<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="12">
            <h5>模板系统</h5>
            <el-menu
              router
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <asideMenu
                v-for="(menu, index) in menuList"
                :menu="menu"
                :key="index"
              />
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <Breadcrumb />
          </div>
          <div class="right">
            <el-dropdown @command="doCommand">
              <span class="el-dropdown-link">{{ userName }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asideMenu from "@/components/asideMenu.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { logout } from "@/apis/user";

export default {
  components: {
    Breadcrumb,
    asideMenu,
  },
  data() {
    return {};
  },
  methods: {
    async doCommand(e) {
      if (e === "logout") {
        let res = await logout();
        if (res.data.code === 20000) {
          await this.$router.replace("/login");
          localStorage.clear();
          //跳转后刷新下页面，清除掉路由信息
          window.location.reload();
        }
      }
    },
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    menuList() {
      return this.$store.state.menuList;
    },
  },
  mounted() {},
};
</script>

<style>
.el-menu-item:focus,
.el-menu-item:hover,
.el-submenu__title:hover {
  outline: 0;
  color: black;
  background-color: white;
}
.el-menu-item,
.el-submenu__title {
  color: white;
}
.el-submenu__title:focus {
  background-color: black;
}
.el-menu-item.is-active {
  color: #0f0f0f;
}
.el-menu-vertical-demo {
  background-color: #0c0c0c;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #0c0c0c;
  color: #f7f6f6;
  text-align: center;
  height: 100vh;
  overflow-x: scroll;
}
.el-col {
  border-radius: 4px;
}
.el-col-12 {
  width: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.el-container {
  height: 100%;
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
.right {
  float: right;
  margin-right: 70px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
