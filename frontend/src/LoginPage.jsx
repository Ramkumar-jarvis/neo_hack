import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
const LoginPage = () => {
  const navigate = useNavigate();
  // Set initial values for the form fields
  const initialValues = {
    email: '',
    password: '',
    role: 'admin', // Default role is admin
  };
  // const handleLogin = (values) => {
  //   // console.log("🚀 ~ file: LoginPage.jsx:14 ~ handleLogin ~ values:", values)
  //   // // Implement your login logic here
  //   // const { email, password } = values;

  //   // // Redirect based on user role
  //   // // if (role === 'admin') {
  //   // navigate('/admin');
  //   // // } else if (role === 'trainer') {
  //   // //     navigate('/trainer');
  //   // // } else if (role === 'trainee') {
  //   // //     navigate('/trainee');
  //   // // }
  // };

  
const handleLogin = async (values) => {
  try {
    const { email, password } = values;
      const response = await axios.post('http://localhost:8181/api/v1/auth/login', {
        email,
        password
      });
      const token = response.data.token;
      // Store the token in local storage or in-memory storage
      localStorage.setItem('jwtToken', token);
      navigate('/admin');
  } catch (error) {
      console.error("Authentication error:", error);
  }
}

  return (
    <div>
      <h2>Login</h2>
      <Form onFinish={handleLogin} initialValues={initialValues}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input prefix={<LockOutlined />}
            type="password"
            placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
