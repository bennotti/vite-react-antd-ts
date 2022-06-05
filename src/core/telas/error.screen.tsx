import { Button, Result } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const ErrorScreen: FC = () => {
  return (
    <Result
      status='500'
      title='Ops...'
      subTitle='Aconteceu um error.'
      extra={
        <Link to='/'>
          <Button type='primary'>Voltar ao Início</Button>
        </Link>
      }
    />
  );
};
