// 入口文件
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";
memoryUtils.user = storageUtils.getUser();

// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App />, document.getElementById("root"));
