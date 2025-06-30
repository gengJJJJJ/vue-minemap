import Vue from "vue";
import VueX from "vuex";

Vue.use(VueX);

export default new VueX.Store({
  state: {
    menuList: JSON.parse(localStorage.getItem("menuList")) || [],
    userName: localStorage.getItem("userName") || "",
  },
  mutations: {
    //用于改变菜单数组的值，顺便持久化存储
    GETMENULIST(state, menuList) {
      state.menuList = menuList;
      //转成JSON对象
      localStorage.setItem("menuList", JSON.stringify(menuList));
    },
    NAMEUPDATE(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
  },
  actions: {
    async getMenuList({ commit }) {
      const menuList = [];
      //调用mutations的方法
      commit("GETMENULIST", menuList);
    },
  },
});
