import { FC, useState } from 'react';
import { Layout, Form, Input, Button, Row, Col, Alert, Avatar, Space } from 'antd';
import { AntDesignOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { AnyObject } from '../../../core/types';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { tryLogin } from '../thunks/autenticacao.thunk';
import { PayloadAction } from '@reduxjs/toolkit';

const { Content, Footer } = Layout;

export const LoginScreen: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch : AppDispatch = useDispatch();
  const onFinish = async (values: AnyObject) => {
    setShowAlert(false);
    setLoading(true);
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
    setLoading(false);
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
    <Layout className='fullScreenLayout'>
      <Row>
        <Col span={8} offset={8}>
          <Content style={{ padding: '50px 0px' }}>
            <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
              <Content style={{ padding: '0 24px' }}>
                <Row>
                  <Col span={24} style={{ textAlign:'center' }}>
                    <Avatar
                      size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                      icon={<AntDesignOutlined />}
                    />
                  </Col>
                  <Col span={24} style={{ textAlign:'center' }}>
                    PoC
                  </Col>
                </Row>
                {renderAlert()}
                <Form
                  form={form}
                  layout='vertical'
                  requiredMark={'optional'}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
                >
                  <Form.Item
                    label='Usuário'
                    name='username'
                    required
                    tooltip='Tente o usuário "teste"'
                    rules={[{ required: true, message: 'O Usuário deve ser informado!' }]}
                  >
                    <Input placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item
                    label='Senha'
                    name='password'
                    required
                    tooltip={{ title: 'Tente a senha "teste123"', icon: <InfoCircleOutlined /> }}
                    rules={[{ required: true, message: 'A senha deve ser informada!' }]}
                  >
                    <Input.Password placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item>
                    <Button loading={loading} type='primary' htmlType='submit'>Entrar</Button>
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
