import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "config/firebase";

export function AuthForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [clientReady, setClientReady] = useState(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleLogInBtnClick = async () => {
    try {
      const { email, password } = await form.validateFields();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e.code);
      console.error(e);
      messageApi.open({
        type: "error",
        content: e.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="inline">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate className="mt-3">
          {() => (
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={handleLogInBtnClick}
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
