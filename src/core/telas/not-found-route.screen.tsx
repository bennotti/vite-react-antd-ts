import { Button, Result } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFoundRouteScreen: FC = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Não encontramos o que procura'
      extra={
        <Link to='/'>
          <Button data-testid='back' type='primary'>
            Voltar ao Início
          </Button>
        </Link>
      }
    />
  );
};
