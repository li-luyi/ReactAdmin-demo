/* 
进行localStorage数据存储管理的工具模块
*/
import store from "store";
const USER_KEY = "user_key";
export default {
  setUser(user) {
    store.set(USER_KEY, user);
  },
  getUser() {
    return store.get(USER_KEY || {});
  },
  removeUser() {
    store.remove(USER_KEY);
  },
};
