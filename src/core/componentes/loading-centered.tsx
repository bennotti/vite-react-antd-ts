import { Col, Layout, Result, Row, Spin } from 'antd';

import { SmileOutlined } from '@ant-design/icons';

export const LoadingCentered: React.FC = () => {
  return (
    <div className={'centered'}>
        <Layout className='fullScreenLayout'>
        <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
            <Col span={24}>
            <Spin tip="carregando...">
                <Result
                icon={<SmileOutlined />}
                title="Great, we have done all the operations!"
                />
            </Spin>
            </Col>
            </Row>
        </Layout>
    </div>
  )
}

export default LoadingCentered
