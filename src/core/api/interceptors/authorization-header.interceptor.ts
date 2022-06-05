import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export async function authorizationHeaderInterceptor(
  config: AxiosRequestConfig
) {
  const { store } = await import('../../../app/store');
  const token = store.getState().autenticacao.payload?.access_token;
  if (!config || (config && !config.headers)) {
    return config;
  }
  ((config as AxiosRequestConfig).headers as AxiosRequestHeaders).Authorization = token;

  return config;
}
