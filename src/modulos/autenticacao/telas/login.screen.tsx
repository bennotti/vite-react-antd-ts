import { FC, useState } from 'react';
import { Layout, Form, Input, Button, Row, Col, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AnyObject } from '../../../core/types';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { tryLogin } from '../thunks/autenticacao.thunk';
import { PayloadAction } from '@reduxjs/toolkit';

const { Content, Footer } = Layout;

export const LoginScreen: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch : AppDispatch = useDispatch();
  const onFinish = async (values: AnyObject) => {
    setShowAlert(false);
    console.log('Success:', values);
    
    const response: PayloadAction<{
      accessToken: string;
      payload: AnyObject
    }> = await dispatch(tryLogin({
      usuario: values.username,
      senha: values.password,
    })) as PayloadAction<{
      accessToken: string;
      payload: AnyObject
    }>;
    setShowAlert(response.type === tryLogin.rejected.type);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const renderAlert = (): JSX.Element | undefined => {
    return showAlert ? (<Alert
      message="Atenção!"
      description="Login inválido."
      type="warning"
      showIcon
      closable
    />) : undefined;
  }
  const [form] = Form.useForm();
  return (
    <Layout>
      <Row>
        <Col span={12} offset={6}>
          <Content style={{ padding: '0 50px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Content style={{ padding: '0 24px' }}>
                {renderAlert()}
                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={'optional'}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    required
                    tooltip="This is a required field"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    required
                    tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="input placeholder" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                  </Form.Item>
                </Form>
              </Content>
            </Layout>
          </Content>
        </Col>
      </Row>
      <Footer style={{ textAlign: 'center' }}>POC - Vite + ReactJs + Antd + Typescript</Footer>
    </Layout>
  );
};
