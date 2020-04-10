import React, { Component } from "react";
import "./login.less";
import logo from "../../assets/images/logo.png";
import { Form, Icon, Input, Button, message } from "antd";
import { reqLogin } from "../../api/index";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
import { Redirect } from "react-router-dom";
const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        reqLogin(values).then((res) => {
          if (res.status === 0) {
            message.success("登录成功！");
            // 保存用户信息
            memoryUtils.user = res.data;
            storageUtils.setUser(res.data);
            this.props.history.replace("/");
          } else {
            message.error(res.msg);
          }
        });
      } else {
        console.log("校验失败！");
      }
    });
  };
  render() {
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }
    const form = this.props.form;
    const { getFieldDecorator } = form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>基于React的后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数字或下划线组成！",
                  },
                  { required: true, message: "用户名不能为空！" },
                  { min: 4, message: "用户名至少4位！" },
                  { max: 12, message: "用户名最多12位！" },
                ],
                validateFirst: true,
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "密码必须是英文、数字或下划线组成！",
                  },
                  { required: true, message: "密码不能为空！" },
                  { min: 4, message: "密码至少4位！" },
                  { max: 12, message: "密码最多12位！" },
                ],
                validateFirst: true,
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  type="password"
                  placeholder="密  码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登 陆
              </Button>
            </FormItem>
          </Form>
        </section>
      </div>
    );
  }
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login);
export default WrapLogin;
