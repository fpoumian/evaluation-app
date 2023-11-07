import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Typography } from "antd";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "config/firebase";

const { Link } = Typography;

export function AuthForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [clientReady, setClientReady] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(false);

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

  const handleSignUpBtnClick = async () => {
    try {
      const { email, password } = await form.validateFields();
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e.code);
      console.error(e);
      messageApi.open({
        type: "error",
        content: e.message,
      });
    }
  };

  const handleSignUpLinkClick = () => {
    setIsSignUpForm(true);
  };

  const handleLoginLinkClick = () => {
    setIsSignUpForm(false);
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="vertical">
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
        {isSignUpForm && (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
        <div>
          {!isSignUpForm && (
            <Link onClick={handleSignUpLinkClick}>
              Don't have an account? Signup
            </Link>
          )}
          {isSignUpForm && (
            <Link onClick={handleLoginLinkClick}>
              Already have an account? Login
            </Link>
          )}
        </div>
        <Form.Item shouldUpdate className="mt-3">
          {!isSignUpForm && (
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={handleLogInBtnClick}
              disabled={
                !clientReady ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Log in
            </Button>
          )}
          {isSignUpForm && (
            <Button
              block
              type="primary"
              htmlType="submit"
              onClick={handleSignUpBtnClick}
              disabled={
                !clientReady ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Sign up
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
}
