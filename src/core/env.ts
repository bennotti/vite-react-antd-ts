import { defineEnv } from './utils/define-env';

const isMock = import.meta.env.MODE === 'webmock' || import.meta.env.MODE === 'appmock';
const isDevelopment = isMock
  || import.meta.env.MODE === 'appdevelopment'
  || import.meta.env.MODE === 'webdevelopment'
  || import.meta.env.MODE === 'development';
const isWeb = import.meta.env.MODE === 'webmock' || import.meta.env.MODE === 'webdevelopment' || import.meta.env.MODE === 'web_PRD';
const isDesktop = import.meta.env.MODE === 'appdevelopment'
  || import.meta.env.MODE === 'development'
  || import.meta.env.MODE === 'appmock'
  || import.meta.env.MODE === 'app_PRD';

export const env = {
  MODE: import.meta.env.MODE,
  IS_WEB: isWeb,
  IS_DESKTOP: isDesktop,
  IS_MOCK: isMock,
  IS_DEVELOPMENT: isDevelopment,
  BASE_API_URL: defineEnv('VITE_GATEWAY_API_URL', true)
};
