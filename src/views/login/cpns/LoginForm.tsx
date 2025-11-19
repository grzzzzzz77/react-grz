import React from "react";
import { Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import { useNavigate } from "react-router-dom";

import stytles from "./index.module.less";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    if (values.username === "admin" && values.password === "123456") {
      //登录成功
      message.success("登录成功");
      navigate("/");
    } else {
      message.error("用户名或密码错误");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入您的用户名" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入您的密码" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label={null}>
        <Button
          className={stytles.submit}
          type="primary"
          size="large"
          htmlType="submit"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
