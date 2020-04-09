/* 
  应用中的请求接口函数的模块
*/
import ajax from "./ajax";

export const reqLogin = (data) => ajax("/login", data, "POST");
